import Link from "next/link";
import { KeyRound, Users, LineChart } from "lucide-react";

const steps = [
  {
    icon: KeyRound,
    title: "1. Crea la sesión",
    description:
      "Escribe tu nombre, elige una app (o todas) y obtén un código en segundos. No necesitas crear cuenta.",
  },
  {
    icon: Users,
    title: "2. Tus estudiantes se unen",
    description:
      "Abren la app, tocan “Unirse a Clase” y escriben el código. Sin registro ni datos personales.",
  },
  {
    icon: LineChart,
    title: "3. Monitorea en vivo",
    description:
      "Sigue el avance de cada estudiante en tiempo real desde el panel de monitoreo, durante toda la clase.",
  },
];

export function Aula() {
  return (
    <section id="aula" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-brand-primary/10 bg-brand-primary/5 p-8 md:p-12">
          <div className="text-center">
            <p
              className="text-sm uppercase tracking-wide text-brand-primary"
              style={{ fontWeight: 500 }}
            >
              Modo Aula
            </p>
            <h2
              className="mt-3 text-3xl md:text-4xl text-ink-primary"
              style={{ fontWeight: 500 }}
            >
              Convierte cualquier app en una clase guiada
            </h2>
            <p className="mt-4 text-lg text-ink-secondary max-w-2xl mx-auto">
              El modo aula conecta a tus estudiantes con las apps de Didarsis
              mediante un código y te deja ver su progreso en tiempo real. Sin
              instalación y sin cuentas para estudiantes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-black/5 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Icon size={20} className="text-brand-primary" />
                </div>
                <h3
                  className="mt-4 text-lg text-ink-primary"
                  style={{ fontWeight: 500 }}
                >
                  {title}
                </h3>
                <p className="mt-2 text-sm text-ink-secondary">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/aula"
              className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
              style={{ fontWeight: 500 }}
            >
              Crear sesión de aula
            </Link>
            <p className="text-sm text-ink-secondary">
              Gratis para docentes. Tú creas el código; tus estudiantes solo lo
              ingresan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
