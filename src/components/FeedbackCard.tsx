"use client";

import { useState } from "react";

export function FeedbackCard() {
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (comment.trim().length < 4) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, website }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-black/5 flex flex-col">
      <div
        className="h-48 flex items-center justify-center"
        style={{
          border: "2px dashed #BF15AE40",
          background: "#FBF8F4",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <span aria-hidden className="text-5xl">
          💡
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl text-ink-primary" style={{ fontWeight: 500 }}>
          ¿Qué contenido gamificado te gustaría?
        </h3>
        {status === "sent" ? (
          <p className="mt-2 text-ink-secondary text-sm flex-1">
            ¡Gracias! Tu idea nos ayuda a decidir qué crear a continuación.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 flex flex-col flex-1">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={2000}
              placeholder="Cuéntanos tu idea…"
              className="w-full flex-1 min-h-20 rounded-lg border border-black/10 p-3 text-sm text-ink-primary resize-none focus:outline-none focus:border-brand-magenta/40"
            />
            {status === "error" && (
              <p className="mt-2 text-xs text-brand-cta">
                No se pudo enviar. Inténtalo de nuevo.
              </p>
            )}
            <div className="mt-4">
              <button
                type="submit"
                disabled={status === "sending" || comment.trim().length < 4}
                className="inline-flex items-center justify-center rounded-lg bg-brand-cta px-4 py-2 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontWeight: 500 }}
              >
                {status === "sending" ? "Enviando…" : "Enviar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
