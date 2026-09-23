import { useEffect, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { askSourzaDesk } from "@/lib/sourza-desk";

type Turn = { role: "user" | "assistant"; content: string };

const PROMPTS = ["Who is this for?", "What does the software do?", "Why India and the Gulf?"];

export function DeskChat() {
  const [sessionId, setSessionId] = useState("");
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);

  useEffect(() => {
    const bytes = crypto.getRandomValues(new Uint8Array(8));
    setSessionId([...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join(""));
    const onOpen = () => setOpen(true);
    const onScroll = () => setDocked(window.scrollY > 360);
    onScroll();
    window.addEventListener("sourza-desk-open", onOpen);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("sourza-desk-open", onOpen);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy || !sessionId) return;
    const history: Turn[] = [...turns, { role: "user" as const, content: question }].slice(-6);
    setTurns(history);
    setDraft("");
    setError("");
    setBusy(true);
    try {
      const result = await askSourzaDesk({ data: { sessionId, messages: history } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setTurns((current) =>
        [...current, { role: "assistant" as const, content: result.text }].slice(-8),
      );
    } catch {
      setError("The desk could not answer just now.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {open ? (
        <section
          className="flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-lg"
          aria-label="Sourza desk"
        >
          <header className="flex items-center justify-between border-b border-line bg-ink px-4 py-3 text-cream">
            <div>
              <p className="font-display text-base font-medium">Sourza desk</p>
              <p className="text-xs text-cream/80">Ask us</p>
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full"
              aria-label="Close desk"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </header>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            <p className="rounded-2xl bg-paper px-3 py-3 text-sm leading-relaxed text-muted">
              Ask what Sourza does, who it is for, or why we start with India and the Gulf.
            </p>
            {turns.map((turn, index) => (
              <p
                key={`${turn.role}-${index}`}
                className={
                  turn.role === "user"
                    ? "ml-8 rounded-2xl bg-ink px-3 py-3 text-sm leading-relaxed text-cream"
                    : "mr-6 rounded-2xl border border-line bg-paper px-3 py-3 text-sm leading-relaxed"
                }
              >
                {turn.content}
              </p>
            ))}
            {busy ? <p className="text-sm text-muted">One moment.</p> : null}
            {error ? <p className="text-sm text-gold-deep">{error}</p> : null}
            {turns.length === 0 ? (
              <div className="mt-auto flex flex-col gap-2">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={busy}
                    onClick={() => send(prompt)}
                    className="rounded-full border border-line bg-paper px-3 py-2 text-left text-sm hover:border-ink disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <label className="sr-only" htmlFor="desk-question">
              Question
            </label>
            <input
              id="desk-question"
              value={draft}
              maxLength={400}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask the desk"
              className="min-h-11 flex-1 rounded-full border border-line bg-paper px-4 text-sm outline-none focus:border-ink"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-cream disabled:opacity-50"
              aria-label="Send question"
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>
      ) : null}
      {docked && !open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm text-cream shadow-lg"
        >
          <MessageCircle className="size-4" />
          Ask Sourza
        </button>
      ) : null}
    </div>
  );
}
