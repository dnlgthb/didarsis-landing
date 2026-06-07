import Image from "next/image";
import { FeedbackCard } from "./FeedbackCard";

const apps = [
  {
    name: "Numera+",
    description: "Práctica de operaciones matemáticas con combate gamificado.",
    gradient: "linear-gradient(135deg, #7F00FF, #FF295C)",
    href: "/numera/",
  },
  {
    name: "Despeja",
    description:
      "Resolución paso a paso de ecuaciones, como se enseña en la escuela.",
    gradient: "linear-gradient(135deg, #1F0040, #6E0B2A)",
    href: "/despeja/",
  },
  {
    name: "Verba!",
    description:
      "Práctica de lenguaje y comunicación: ortografía, vocabulario y comprensión lectora con combate gamificado.",
    gradient: "linear-gradient(135deg, #C1440E, #6B1F2A)",
    href: "/verba/",
  },
];

function NumeraMockup() {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute bottom-0 inset-x-0 flex items-end justify-center -space-x-5">
        <Image
          src="/apps/tiger-victory.png"
          alt="Tigre karateca de Numera celebrando"
          width={1024}
          height={1024}
          className="w-28 -mb-2 -rotate-3 drop-shadow-md"
        />
        <Image
          src="/apps/mage-victory.png"
          alt="Maga de Numera celebrando"
          width={1024}
          height={1536}
          className="w-24 z-30 drop-shadow-md"
        />
        <Image
          src="/apps/warrior-victory.png"
          alt="Guerrero de Numera celebrando"
          width={1024}
          height={1536}
          className="w-24 -mb-1 rotate-3 drop-shadow-md"
        />
      </div>
      <Image
        src="/apps/numera-logo.png"
        alt="Numera"
        width={950}
        height={528}
        className="absolute top-2 left-1/2 -translate-x-1/2 w-44 z-20 drop-shadow-xl"
      />
    </div>
  );
}

function DespejaMockup() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Símbolos flotantes de color */}
      <span
        aria-hidden
        className="absolute top-3 left-5 font-mono text-2xl text-yellow-300/90 -rotate-12 drop-shadow"
        style={{ fontWeight: 700 }}
      >
        x
      </span>
      <span
        aria-hidden
        className="absolute top-8 right-6 font-mono text-xl text-cyan-300/90 rotate-12 drop-shadow"
        style={{ fontWeight: 700 }}
      >
        +
      </span>
      <span
        aria-hidden
        className="absolute bottom-6 left-8 font-mono text-xl text-green-300/90 rotate-6 drop-shadow"
        style={{ fontWeight: 700 }}
      >
        =
      </span>
      <span
        aria-hidden
        className="absolute bottom-10 right-8 font-mono text-2xl text-orange-300/90 -rotate-6 drop-shadow"
        style={{ fontWeight: 700 }}
      >
        ÷
      </span>

      <Image
        src="/apps/despeja-logo.png"
        alt="Despeja"
        width={1127}
        height={475}
        className="w-64 drop-shadow-xl"
      />
      <div className="-mt-4 z-10 rounded-full bg-white/15 border border-white/25 px-5 py-2 font-mono text-sm text-white backdrop-blur-sm shadow-lg">
        2x + 6 = 14 <span className="text-yellow-300">→</span>{" "}
        <span className="text-yellow-300" style={{ fontWeight: 700 }}>
          x = 4
        </span>{" "}
        <span className="text-green-300">✓</span>
      </div>
    </div>
  );
}

function VerbaMockup() {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Letras flotantes estilo clásico */}
      <span
        aria-hidden
        className="absolute top-4 left-5 font-serif text-2xl text-amber-200/90 -rotate-12 drop-shadow"
        style={{ fontWeight: 700 }}
      >
        A
      </span>
      <span
        aria-hidden
        className="absolute top-9 right-6 font-serif text-xl text-amber-200/80 rotate-12 drop-shadow"
        style={{ fontWeight: 700 }}
      >
        « »
      </span>
      <div className="absolute bottom-0 inset-x-0 flex items-end justify-center -space-x-5">
        <Image
          src="/apps/tiger-victory.png"
          alt="Tigre karateca de VERBA celebrando"
          width={1024}
          height={1024}
          className="w-28 -mb-2 -rotate-3 drop-shadow-md"
        />
        <Image
          src="/apps/mage-victory.png"
          alt="Maga de Verba celebrando"
          width={1024}
          height={1536}
          className="w-24 z-30 drop-shadow-md"
        />
        <Image
          src="/apps/warrior-victory.png"
          alt="Guerrero de VERBA celebrando"
          width={1024}
          height={1536}
          className="w-24 -mb-1 rotate-3 drop-shadow-md"
        />
      </div>
      <Image
        src="/apps/verba-logo.png"
        alt="Verba!"
        width={1254}
        height={1254}
        className="absolute top-1 left-1/2 -translate-x-1/2 w-36 z-20 drop-shadow-xl"
      />
    </div>
  );
}

function AppMockup({ name }: { name: string }) {
  if (name === "Numera+") return <NumeraMockup />;
  if (name === "Despeja") return <DespejaMockup />;
  if (name === "Verba!") return <VerbaMockup />;
  return null;
}

export function Apps() {
  return (
    <section id="apps" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-3xl md:text-4xl text-ink-primary text-center"
          style={{ fontWeight: 500 }}
        >
          Apps para el aula
        </h2>
        <p className="mt-4 text-center text-lg text-ink-secondary max-w-2xl mx-auto">
          El docente comparte un código y ve el progreso de la sesión sin
          necesidad de cuenta.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {apps.map((app) => (
            <div
              key={app.name}
              className="rounded-2xl overflow-hidden border border-black/5 flex flex-col"
            >
              <div
                className="h-48"
                style={
                  app.gradient
                    ? { background: app.gradient }
                    : {
                        border: "2px dashed #BF15AE40",
                        background: "#FBF8F4",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                      }
                }
              >
                <AppMockup name={app.name} />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-xl text-ink-primary"
                  style={{ fontWeight: 500 }}
                >
                  {app.name}
                </h3>
                <p className="mt-2 text-ink-secondary text-sm flex-1">
                  {app.description}
                </p>
                {app.href ? (
                  <div className="mt-4">
                    <a
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-brand-cta px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
                      style={{ fontWeight: 500 }}
                    >
                      Probar
                    </a>
                  </div>
                ) : app.gradient ? (
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      disabled
                      className="rounded-lg bg-black/5 px-4 py-2 text-sm text-ink-secondary cursor-not-allowed"
                    >
                      Probar
                    </button>
                    <span
                      className="text-xs text-brand-magenta rounded-full bg-brand-magenta/10 px-3 py-1"
                      style={{ fontWeight: 500 }}
                    >
                      Próximamente
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          <FeedbackCard />
        </div>

        <div className="mt-12 rounded-2xl border border-brand-primary/10 bg-brand-primary/5 p-8 text-center">
          <h3
            className="text-xl text-ink-primary"
            style={{ fontWeight: 500 }}
          >
            Monitoreo en tiempo real
          </h3>
          <p className="mt-2 text-ink-secondary max-w-lg mx-auto">
            Crea una sesión, comparte el código con tus estudiantes y sigue su
            avance en vivo desde el panel de monitoreo.
          </p>
          <a
            href="/aula"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-brand-primary px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
            style={{ fontWeight: 500 }}
          >
            Crear sesión de aula
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-ink-secondary">
          Gratuitas. Sin instalación. Sin registro de estudiantes.
        </p>
      </div>
    </section>
  );
}
