import { createServerFn } from "@tanstack/react-start";

const ROLES = ["Buyer", "Plant", "Partner"] as const;

type Introduction = {
  name: string;
  organisation: string;
  role: (typeof ROLES)[number];
  email: string;
  note: string;
  fax: string;
};

const buckets = new Map<string, number[]>();

function allow(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function clean(input: unknown): Introduction {
  if (!input || typeof input !== "object") throw new Error("Send the introduction.");
  const fax = clip((input as { fax?: unknown }).fax, 200);
  if (fax) {
    return {
      name: "-",
      organisation: "-",
      role: "Buyer",
      email: "held@example.com",
      note: "",
      fax,
    };
  }
  const raw = input as Partial<Introduction>;
  const role = ROLES.includes(raw.role as Introduction["role"])
    ? (raw.role as Introduction["role"])
    : null;
  const introduction: Introduction = {
    name: clip(raw.name, 160),
    organisation: clip(raw.organisation, 160),
    role: role ?? "Buyer",
    email: clip(raw.email, 190).toLowerCase(),
    note: clip(raw.note, 2000),
    fax: "",
  };
  if (!introduction.name || !introduction.organisation || !role) {
    throw new Error("Send the introduction.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(introduction.email)) {
    throw new Error("Use a valid email.");
  }
  return introduction;
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
      `CREATE TABLE IF NOT EXISTS introduction (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(160) NOT NULL,
        organisation VARCHAR(160) NOT NULL,
        role VARCHAR(40) NOT NULL,
        email VARCHAR(190) NOT NULL,
        note TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
    );
    tableReady = true;
  }
  return pool;
}

export const registerIntroduction = createServerFn({ method: "POST" })
  .validator(clean)
  .handler(async ({ data }) => {
    if (data.fax) return { ok: true as const };
    const hour = 60 * 60 * 1000;
    if (!allow("introductions", 30, hour) || !allow(data.email, 4, hour)) {
      return { ok: false as const, error: "Too many introductions just now. Try again shortly." };
    }
    const db = await getPool();
    if (!db) return { ok: false as const, error: "The desk is not connected yet." };
    try {
      await db.query(
        `INSERT INTO introduction (name, organisation, role, email, note)
         VALUES (?, ?, ?, ?, ?)`,
        [data.name, data.organisation, data.role, data.email, data.note],
      );
    } catch {
      return { ok: false as const, error: "The desk could not save this just now." };
    }
    return { ok: true as const };
  });
