import { createServerFn } from "@tanstack/react-start";
import { randomInt } from "node:crypto";

type Interest = {
  works: string;
  place: string;
  contact: string;
  email: string;
  phone: string;
  trade: "Already export" | "Preparing to export";
  capability: string;
  note: string;
  platforms: string;
  files: StoredFile[];
  fax: string;
};

type StoredFile = { name: string; data: string };

const TRADES = ["Already export", "Preparing to export"] as const;
const MAX_FILES = 3;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const PLANT_ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makePlantId() {
  let code = "";
  for (let index = 0; index < 5; index += 1) {
    code += PLANT_ID_ALPHABET[randomInt(PLANT_ID_ALPHABET.length)];
  }
  return code;
}

const buckets = new Map<string, number[]>();

function allow(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 400) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }
  return true;
}

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanFiles(raw: unknown): StoredFile[] {
  if (raw == null) return [];
  if (!Array.isArray(raw)) throw new Error("Send PDF files only.");
  if (raw.length > MAX_FILES) throw new Error("Send up to 3 PDF files.");
  return raw.map((item) => {
    if (!item || typeof item !== "object") throw new Error("Send PDF files only.");
    const name = clip((item as { name?: unknown }).name, 180);
    const data = typeof (item as { data?: unknown }).data === "string" ? (item as { data: string }).data : "";
    if (!name.toLowerCase().endsWith(".pdf") || !data) throw new Error("Send PDF files only.");
    const bytes = Buffer.from(data, "base64");
    if (!bytes.length || bytes.length > MAX_FILE_BYTES || bytes.subarray(0, 5).toString("utf8") !== "%PDF-") {
      throw new Error("Each file must be a PDF under 8 MB.");
    }
    return { name: name.replace(/[^\w.\- ()]+/g, "").slice(0, 180) || "document.pdf", data };
  });
}

function clean(input: unknown): Interest {
  if (!input || typeof input !== "object") throw new Error("Send the works details.");
  const fax = clip((input as { fax?: unknown }).fax, 200);
  if (fax) {
    return {
      works: "-",
      place: "-",
      contact: "-",
      email: "held@example.com",
      phone: "",
      trade: "Already export",
      capability: "-",
      note: "",
      platforms: "",
      files: [],
      fax,
    };
  }
  const raw = input as Partial<Interest>;
  const trade = TRADES.includes(raw.trade as Interest["trade"])
    ? (raw.trade as Interest["trade"])
    : null;
  const interest: Interest = {
    works: clip(raw.works, 160),
    place: clip(raw.place, 160),
    contact: clip(raw.contact, 160),
    email: clip(raw.email, 190).toLowerCase(),
    phone: clip(raw.phone, 40),
    trade: trade ?? "Already export",
    capability: clip(raw.capability, 2000),
    note: clip(raw.note, 2000),
    platforms: clip(raw.platforms, 500),
    files: cleanFiles((raw as { files?: unknown }).files),
    fax: "",
  };
  if (!interest.works || !interest.place || !interest.contact || !interest.capability) {
    throw new Error("Send the works details.");
  }
  if (!interest.platforms) throw new Error("Say whether the works is listed on another platform.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(interest.email)) {
    throw new Error("Use a valid email.");
  }
  if (!trade) throw new Error("Send the works details.");
  return interest;
}

type Sql = {
  query: (sql: string, values?: unknown[]) => Promise<[unknown, unknown]>;
};

type Pool = Sql & {
  getConnection: () => Promise<Sql & { beginTransaction: () => Promise<void>; commit: () => Promise<void>; rollback: () => Promise<void>; release: () => void }>;
};

let pool: Pool | null = null;
let tableReady = false;

async function getPool() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  if (!host || !user || !password || !database) return null;
  if (!pool) {
    const mysql = await import("mysql2/promise");
    pool = mysql.createPool({
      host,
      port: Number(process.env.DB_PORT || 3306),
      user,
      password,
      database,
      connectionLimit: 4,
      waitForConnections: true,
    });
  }
  if (!tableReady) {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS plant_interest (
        id INT AUTO_INCREMENT PRIMARY KEY,
        works VARCHAR(160) NOT NULL,
        place VARCHAR(160) NOT NULL,
        contact_name VARCHAR(160) NOT NULL,
        email VARCHAR(190) NOT NULL,
        phone VARCHAR(40) NOT NULL DEFAULT '',
        trade VARCHAR(40) NOT NULL,
        capability TEXT NOT NULL,
        note TEXT NOT NULL,
        platforms VARCHAR(500) NOT NULL DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
    );
    try {
      await pool.query(
        "ALTER TABLE plant_interest ADD COLUMN IF NOT EXISTS platforms VARCHAR(500) NOT NULL DEFAULT ''",
      );
    } catch (error) {
      const errno = (error as { errno?: number }).errno;
      if (errno !== 1060) {
        try {
          await pool.query(
            "ALTER TABLE plant_interest ADD COLUMN platforms VARCHAR(500) NOT NULL DEFAULT ''",
          );
        } catch (again) {
          if ((again as { errno?: number }).errno !== 1060) throw again;
        }
      }
    }
    await pool.query(
      `CREATE TABLE IF NOT EXISTS plant_interest_file (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plant_id VARCHAR(5) NOT NULL,
        filename VARCHAR(180) NOT NULL,
        size_bytes INT NOT NULL,
        content LONGBLOB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (plant_id)
      )`,
    );
    await pool.query("ALTER TABLE plant_interest_file MODIFY plant_id VARCHAR(5) NOT NULL");
    try {
      await pool.query(
        "ALTER TABLE plant_interest ADD COLUMN IF NOT EXISTS plant_id VARCHAR(5) NULL",
      );
    } catch (error) {
      const errno = (error as { errno?: number }).errno;
      if (errno !== 1060) {
        try {
          await pool.query("ALTER TABLE plant_interest ADD COLUMN plant_id VARCHAR(5) NULL");
        } catch (again) {
          if ((again as { errno?: number }).errno !== 1060) throw again;
        }
      }
    }
    try {
      await pool.query("CREATE UNIQUE INDEX plant_interest_code ON plant_interest (plant_id)");
    } catch (error) {
      if ((error as { errno?: number }).errno !== 1061) throw error;
    }
    tableReady = true;
  }
  return pool;
}

export const registerPlant = createServerFn({ method: "POST" })
  .validator(clean)
  .handler(async ({ data }) => {
    if (data.fax) return { ok: true as const, plantId: "" };
    const hour = 60 * 60 * 1000;
    if (!allow("plants", 30, hour) || !allow(data.email, 4, hour)) {
      return { ok: false as const, error: "Too many registrations just now. Try again shortly." };
    }
    const db = await getPool();
    if (!db) return { ok: false as const, error: "The register is not connected yet." };
    const conn = await db.getConnection();
    try {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const plantId = makePlantId();
        try {
          await conn.beginTransaction();
          await conn.query(
            `INSERT INTO plant_interest
              (plant_id, works, place, contact_name, email, phone, trade, capability, note, platforms)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              plantId,
              data.works,
              data.place,
              data.contact,
              data.email,
              data.phone,
              data.trade,
              data.capability,
              data.note,
              data.platforms,
            ],
          );
          for (const file of data.files) {
            const bytes = Buffer.from(file.data, "base64");
            await conn.query(
              `INSERT INTO plant_interest_file (plant_id, filename, size_bytes, content) VALUES (?, ?, ?, ?)`,
              [plantId, file.name, bytes.length, bytes],
            );
          }
          await conn.commit();
          return { ok: true as const, plantId };
        } catch (error) {
          await conn.rollback();
          if ((error as { errno?: number }).errno === 1062 && attempt < 4) continue;
          return { ok: false as const, error: "The register could not save this just now." };
        }
      }
      return { ok: false as const, error: "The register could not save this just now." };
    } finally {
      conn.release();
    }
  });
