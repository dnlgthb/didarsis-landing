import { Check } from "lucide-react";

const features = [
  "Digitaliza pruebas en Word o PDF en minutos.",
  "Corrección automática con IA, incluso preguntas abiertas y de matemáticas.",
  "Sin cuentas para estudiantes. Acceso por código.",
  "Ajustada a la escala 1.0–7.0 y al currículum chileno.",
];

export function Aproba() {
  return (
    <section id="aproba" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-8 md:p-12 border-t-4 border-brand-aproba shadow-sm">
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
      </div>
    </section>
  );
}
