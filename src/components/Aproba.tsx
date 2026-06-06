import {
  Check,
  Upload,
  ClipboardList,
  Send,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const features = [
  "Digitaliza tus pruebas en PDF.",
  "Genera hojas de respuestas digitales automáticamente.",
  "Sin cuentas para estudiantes. Acceso por código.",
  "Corrección automática con IA, incluso preguntas abiertas y de matemáticas.",
];

const workflow = [
  { icon: Upload, label: "Cargar Evaluación" },
  { icon: ClipboardList, label: "Cargar Pauta" },
  { icon: Send, label: "Aplicar" },
  { icon: Sparkles, label: "Corregir" },
];

const results = [
  { q: "P1", pct: 92 },
  { q: "P2", pct: 78 },
  { q: "P3", pct: 85 },
  { q: "P4", pct: 45 },
  { q: "P5", pct: 70 },
  { q: "P6", pct: 88 },
];

function Workflow() {
  return (
    <div className="mb-8 flex items-start justify-center gap-1.5">
      {workflow.map(({ icon: Icon, label }, i) => (
        <div key={label} className="flex items-start">
          <div className="flex w-[72px] flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/15 shadow-lg">
              <Icon size={20} className="text-[#D98BFF]" />
            </div>
            <span
              className="text-[11px] leading-tight text-white/85"
              style={{ fontWeight: 500 }}
            >
              {label}
            </span>
          </div>
          {i < workflow.length - 1 && (
            <ChevronRight size={16} className="mt-4 shrink-0 text-[#D98BFF]/50" />
          )}
        </div>
      ))}
    </div>
  );
}

function ResultsChart() {
  return (
    <div className="rounded-xl bg-white shadow-2xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-black/5">
        <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
        <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-gray-400">aproba.ai</span>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-800" style={{ fontWeight: 500 }}>
            Desempeño del curso
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full bg-brand-aproba/10 text-brand-aproba"
            style={{ fontWeight: 500 }}
          >
            Promedio: 5.8
          </span>
        </div>

        <div className="text-[11px] text-gray-500">
          % de logro por pregunta · 8°A
        </div>

        <div className="flex items-end justify-between gap-2 h-24 pt-1">
          {results.map(({ q, pct }) => (
            <div
              key={q}
              className="flex flex-1 flex-col items-center justify-end gap-1 h-full"
            >
              <span className="text-[9px] text-gray-400">{pct}%</span>
              <div
                className={
                  "w-full rounded-t " +
                  (pct < 50 ? "bg-[#FF295C]/80" : "bg-brand-aproba/80")
                }
                style={{ height: `${pct}%` }}
              />
              <span className="text-[9px] text-gray-500">{q}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 rounded bg-amber-50 border border-amber-100 px-2 py-1.5 text-[10px] text-amber-700">
          <Sparkles size={11} className="shrink-0" />
          P4: solo 45% de logro — reforzar fracciones.
        </div>
      </div>
    </div>
  );
}

export function Aproba() {
  return (
    <section id="aproba" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-ink-primary p-8 md:p-12 shadow-xl">
          {/* Brillos decorativos */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-aproba/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand-magenta/25 blur-3xl"
          />

          <div className="relative grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <p
                className="text-4xl md:text-5xl text-[#D98BFF]"
                style={{ fontWeight: 600 }}
              >
                Aproba
              </p>

              <p className="mt-4 text-lg text-white/70">
                Plataforma de evaluación digital para docentes.
              </p>

              <ul className="mt-8 space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className="mt-0.5 shrink-0 text-[#D98BFF]"
                    />
                    <span className="text-white/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://aproba.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-cta px-6 py-3 text-white text-sm transition-opacity hover:opacity-90"
                style={{ fontWeight: 500 }}
              >
                Ir a Aproba →
              </a>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <Workflow />
                <ResultsChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
