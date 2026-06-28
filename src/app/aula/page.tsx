"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";
import { APP_LABELS, isValidApp, OP_LABELS, APP_OPERATIONS } from "@/lib/aulaApps";
import { parseRoster } from "@/lib/roster";

const APPS = [
  { value: "", label: "Todas las apps" },
  { value: "numera", label: "Numera+" },
  { value: "despeja", label: "Despeja" },
  { value: "verba", label: "Verba!" },
];

export default function AulaPage() {
  const [teacherName, setTeacherName] = useState("");
  const [app, setApp] = useState("");
  const [operationTypes, setOperationTypes] = useState<string[]>([]);
  const [nameMode, setNameMode] = useState<"free" | "roster">("free");
  const [roster, setRoster] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    code: string;
    monitorToken: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/aula/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherName,
          operationTypes,
          app: app || null,
          nameMode,
          roster: nameMode === "roster" ? roster : "",
          durationMinutes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error creando sesión");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  function toggleOperation(op: string) {
    setOperationTypes((prev) =>
      prev.includes(op) ? prev.filter((o) => o !== op) : [...prev, op],
    );
  }

  function handleAppChange(value: string) {
    setApp(value);
    // Las operaciones dependen del app; al cambiarlo, limpiar selección previa.
    setOperationTypes([]);
  }

  // Operaciones seleccionables del app elegido (vacío para Despeja o "Todas").
  const appOps = isValidApp(app) ? APP_OPERATIONS[app] : [];

  const durationLabel = `${durationMinutes} minutos`;
  const rosterCount = parseRoster(roster).length;
  const rosterInvalid = nameMode === "roster" && rosterCount === 0;

  return (
    <div className="min-h-screen bg-bg-warm">
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <span className="text-sm text-ink-secondary font-medium">
            Aula Virtual
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-6 py-12">
        {!result ? (
          <>
            <h1 className="text-2xl font-medium text-ink-primary mb-2">
              Crear sesión de clase
            </h1>
            <p className="text-ink-secondary mb-8">
              Genera un código para que tus estudiantes se conecten desde las
              apps de Didarsis y puedas monitorear su progreso en tiempo real.
            </p>

            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label
                  htmlFor="teacherName"
                  className="block text-sm font-medium text-ink-primary mb-1.5"
                >
                  Tu nombre
                </label>
                <input
                  id="teacherName"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="Ej: Prof. García"
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-ink-primary placeholder:text-ink-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="app"
                  className="block text-sm font-medium text-ink-primary mb-1.5"
                >
                  App (opcional)
                </label>
                <select
                  id="app"
                  value={app}
                  onChange={(e) => handleAppChange(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                >
                  {APPS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-ink-secondary/60">
                  Si eliges una app, el código solo funcionará en esa app.
                </p>
              </div>

              {appOps.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-ink-primary mb-1.5">
                    Operación a practicar (opcional)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {appOps.map((op) => {
                      const selected = operationTypes.includes(op);
                      return (
                        <button
                          key={op}
                          type="button"
                          onClick={() => toggleOperation(op)}
                          aria-pressed={selected}
                          className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                            selected
                              ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                              : "border-black/10 bg-white text-ink-secondary hover:bg-black/[0.02]"
                          }`}
                        >
                          {OP_LABELS[op] || op}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-xs text-ink-secondary/60">
                    {operationTypes.length === 0
                      ? "Sin selección: uso libre, cualquier operación suma puntos."
                      : "En clase, solo las operaciones elegidas otorgan puntos."}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-ink-primary mb-1.5">
                  Nombres de estudiantes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNameMode("free")}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      nameMode === "free"
                        ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                        : "border-black/10 bg-white text-ink-secondary hover:bg-black/[0.02]"
                    }`}
                  >
                    Libre
                  </button>
                  <button
                    type="button"
                    onClick={() => setNameMode("roster")}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      nameMode === "roster"
                        ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                        : "border-black/10 bg-white text-ink-secondary hover:bg-black/[0.02]"
                    }`}
                  >
                    Lista de la clase
                  </button>
                </div>

                {nameMode === "free" ? (
                  <p className="mt-1.5 text-xs text-ink-secondary/60">
                    Cada estudiante escribe su nombre libremente.
                  </p>
                ) : (
                  <div className="mt-3">
                    <textarea
                      value={roster}
                      onChange={(e) => setRoster(e.target.value)}
                      rows={6}
                      placeholder={"Pega aquí la columna del Excel\no escribe un nombre por línea:\n\nAna Soto\nBenjamín Díaz\nCamila Rojas"}
                      className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-ink-primary placeholder:text-ink-secondary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors resize-y"
                    />
                    <p className="mt-1.5 text-xs text-ink-secondary/60">
                      Un nombre por línea. {rosterCount} nombre
                      {rosterCount === 1 ? "" : "s"} en la lista. Los estudiantes
                      elegirán su nombre de un desplegable y cada nombre se puede
                      usar una sola vez.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-ink-primary mb-1.5"
                >
                  Duración de la sesión (minutos)
                </label>
                <input
                  id="duration"
                  type="number"
                  min={15}
                  max={480}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-brand-cta">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || rosterInvalid}
                className="w-full rounded-lg bg-brand-primary px-6 py-3 text-white font-medium hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Creando..." : "Crear Sesión"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div>
              <p className="text-sm text-ink-secondary mb-2">
                Dicta este código a tus estudiantes:
              </p>
              <div className="inline-block rounded-2xl bg-white px-10 py-6 shadow-lg border border-black/5">
                <p className="text-5xl font-medium tracking-[0.3em] text-brand-primary">
                  {result.code}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-ink-secondary">
                Los estudiantes deben abrir{" "}
                <strong className="text-ink-primary">
                  {isValidApp(app) ? APP_LABELS[app] : "la app correspondiente"}
                </strong>{" "}
                y hacer clic en{" "}
                <strong className="text-ink-primary">&ldquo;Unirse a Clase&rdquo;</strong>.
              </p>
              <p className="text-xs text-ink-secondary/60">
                La sesión expira en {durationLabel}.
              </p>
            </div>

            <a
              href={`/aula/${result.monitorToken}`}
              className="inline-block rounded-lg bg-brand-primary px-8 py-3 text-white font-medium hover:bg-brand-primary/90 transition-colors"
            >
              Abrir Panel de Monitoreo
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
