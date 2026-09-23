import { createServerFn } from "@tanstack/react-start";

type Turn = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the Sourza desk on the public Sourza website. You speak only for that introduction. Be precise, calm, and short. No hype, no slogans.

Public facts you may use:
- Sourza is an AI-native procurement layer for specified industrial requirements.
- It reads a written specification into a structured brief, matches verified Indian plants by what they can actually run (not a public catalogue), lines quotes up on the same terms, and remembers what fitted or failed.
- The first corridor is specified industrial components, beginning with machined parts, between verified Indian plants and procurement desks and traders in the UAE and the wider GCC.
- Buyers already know the part and want a second source they can trust. Plants keep the customer relationship on the commercial side.
- Sourza is an intermediary. It does not take title to the goods. The manufacturer remains exporter of record. Sourza is not a freight carrier and not a public shop of SKUs.
- Indian plant owners can register interest on the Plants page. This chat does not submit that form for them.
- A conversation with the founding desk is how introductions happen. This chat does not book meetings, accept drawings, or send messages onward.

If asked about fees, minimum order size, escrow, payment partners, plant records, scoring, methods, customers, revenue, funding, or headcount: say those are discussed only with the founding desk. Do not invent them. Do not claim a note was sent. If you are unsure, say so. Stay under 80 words.`;

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
