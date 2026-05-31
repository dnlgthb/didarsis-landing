import { Check } from "lucide-react";

const features = [
  "Digitaliza pruebas en Word o PDF en minutos.",
  "Corrección automática con IA, incluso preguntas abiertas y de matemáticas.",
  "Sin cuentas para estudiantes. Acceso por código.",
  "Ajustada a la escala 1.0–7.0 y al currículum chileno.",
];

function MockupScreen() {
  return (
    <div className="rounded-xl bg-white shadow-xl border border-black/10 overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-black/5">
        <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
        <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-gray-400">aproba.ai</span>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-800" style={{ fontWeight: 500 }}>
            Prueba de Matemáticas
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full bg-brand-aproba/10 text-brand-aproba"
            style={{ fontWeight: 500 }}
          >
            Nota: 6.2
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="text-[11px] text-gray-600">1. ¿Cuánto es 3 × 4?</div>
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-400">
              10
            </span>
            <span
              className="px-2 py-0.5 rounded text-[10px] bg-brand-aproba/10 text-brand-aproba"
              style={{ fontWeight: 500 }}
            >
              12 ✓
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-400">
              14
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[11px] text-gray-600">
            2. Resuelve: x + 5 = 12
          </div>
          <div className="rounded bg-green-50 border border-green-100 px-2 py-1 text-[10px] text-green-700">
            ✓ Correcto — x = 7
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[11px] text-gray-600">
            3. Explica el teorema de Pitágoras.
          </div>
          <div className="rounded bg-blue-50 border border-blue-100 px-2 py-1 text-[10px] text-blue-600">
            IA revisando respuesta…
          </div>
        </div>

        <div className="pt-1">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Progreso</span>
            <span>3 / 4</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100">
            <div
              className="h-1.5 rounded-full bg-brand-aproba"
              style={{ width: "75%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Aproba() {
  return (
    <section id="aproba" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-8 md:p-12 border-t-4 border-brand-aproba shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <p
                className="text-2xl md:text-3xl text-brand-aproba"
                style={{ fontWeight: 500 }}
              >
                Aproba
              </p>

              <p className="mt-4 text-lg text-ink-secondary">
                Plataforma de evaluación digital para docentes.
              </p>

              <ul className="mt-8 space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className="mt-0.5 shrink-0 text-brand-aproba"
                    />
                    <span className="text-ink-primary">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://aproba.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center text-brand-aproba hover:opacity-80 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                Ir a Aproba →
              </a>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <MockupScreen />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
