const apps = [
  {
    name: "Numera",
    description: "Práctica de operaciones matemáticas con combate gamificado.",
    gradient: "linear-gradient(135deg, #7F00FF, #FF295C)",
    href: "https://numera-plus.vercel.app/",
  },
  {
    name: "Despeje",
    description:
      "Resolución paso a paso de ecuaciones, como se enseña en la escuela.",
    gradient: "linear-gradient(135deg, #BF15AE, #E9053A)",
    href: "https://despeja-app.vercel.app/",
  },
  {
    name: "Más en camino",
    description: "Nuevas apps de práctica en desarrollo.",
    gradient: null,
    href: null,
  },
];

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
                className="h-32"
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
              />
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
        </div>

        <p className="mt-8 text-center text-sm text-ink-secondary">
          Gratuitas. Sin instalación. Sin registro de estudiantes.
        </p>
      </div>
    </section>
  );
}
