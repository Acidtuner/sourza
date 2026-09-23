import { createServerFn } from "@tanstack/react-start";

type Turn = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are someone on the Sourza founding desk, answering on the public website. Talk like a person. Short sentences. No slogans, no "leverage", no "AI-native", no stacked abstractions. If a plain word will do, use it.

Facts you may use:
- Sourza helps a buyer who already knows the part find Indian plants that can make it, then puts the quotes side by side.
- The software reads a messy spec into a brief, matches factories by what they can actually run, and keeps what fitted or failed last time.
- We start with machined parts, between verified Indian plants and buyers in the UAE and the wider Gulf.
- The plant stays the exporter. Sourza does not own the goods, does not run a public catalogue, and does not ship the freight.
- Factory owners can register on the Plants page. Buyers, plants, and partners can leave a note on the introduction form. Both are stored for the founding team. This chat does not submit either form, book a meeting, or pass a message on.

If asked about fees, minimum order size, escrow, payment partners, how plants are scored, customers, revenue, funding, or headcount: say that is a conversation with the founding team, not something you can answer here. Do not invent it. If you are unsure, say so. Stay under 80 words.`;

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

function cleanTurns(input: unknown): { sessionId: string; messages: Turn[] } {
  if (!input || typeof input !== "object") throw new Error("Send a question.");
  const raw = input as { sessionId?: unknown; messages?: unknown };
  const sessionId = typeof raw.sessionId === "string" ? raw.sessionId.trim() : "";
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(sessionId)) throw new Error("Send a question.");
  if (!Array.isArray(raw.messages) || raw.messages.length === 0 || raw.messages.length > 8) {
    throw new Error("Keep this conversation short.");
  }
  const messages: Turn[] = [];
  for (const item of raw.messages) {
    if (!item || typeof item !== "object") throw new Error("Send a question.");
    const role = (item as Turn).role;
    const content = (item as Turn).content;
    if (role !== "user" && role !== "assistant") throw new Error("Send a question.");
    if (typeof content !== "string") throw new Error("Send a question.");
    const text = content.trim().slice(0, 400);
    if (!text) continue;
    messages.push({ role, content: text });
  }
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") throw new Error("Send a question.");
  return { sessionId, messages: messages.slice(-6) };
}

export const askSourzaDesk = createServerFn({ method: "POST" })
  .validator(cleanTurns)
  .handler(async ({ data }) => {
    const windowMs = 10 * 60 * 1000;
    if (!allow("global", 24, windowMs) || !allow(data.sessionId, 8, windowMs)) {
      return { ok: false as const, error: "The desk is pausing for a moment. Try again shortly." };
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "The desk is unavailable right now." };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 220,
        messages: [{ role: "system", content: SYSTEM }, ...data.messages],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: "The desk could not answer just now." };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "The desk could not answer just now." };
    return { ok: true as const, text };
  });
