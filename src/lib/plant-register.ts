import { createServerFn } from "@tanstack/react-start";

type Interest = {
  works: string;
  place: string;
  contact: string;
  email: string;
  phone: string;
  trade: "Already export" | "Preparing to export";
  capability: string;
  note: string;
};

const TRADES = ["Already export", "Preparing to export"] as const;

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

function clean(input: unknown): Interest {
  if (!input || typeof input !== "object") throw new Error("Send the works details.");
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
  };
  if (!interest.works || !interest.place || !interest.contact || !interest.capability) {
    throw new Error("Send the works details.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(interest.email)) {
    throw new Error("Use a valid email.");
  }
  if (!trade) throw new Error("Send the works details.");
  return interest;
}

type Pool = {
  query: (sql: string, values?: unknown[]) => Promise<unknown>;
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
    );
    tableReady = true;
  }
  return pool;
}

export const registerPlant = createServerFn({ method: "POST" })
  .validator(clean)
  .handler(async ({ data }) => {
    const hour = 60 * 60 * 1000;
    if (!allow("plants", 30, hour) || !allow(data.email, 4, hour)) {
      return { ok: false as const, error: "Too many registrations just now. Try again shortly." };
    }
    const db = await getPool();
    if (!db) return { ok: false as const, error: "The register is not connected yet." };
    try {
      await db.query(
        `INSERT INTO plant_interest
          (works, place, contact_name, email, phone, trade, capability, note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.works,
          data.place,
          data.contact,
          data.email,
          data.phone,
          data.trade,
          data.capability,
          data.note,
        ],
      );
    } catch {
      return { ok: false as const, error: "The register could not save this just now." };
    }
    return { ok: true as const };
  });
