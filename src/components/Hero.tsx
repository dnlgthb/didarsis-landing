export function Hero() {
  return (
    <section className="bg-bg-warm px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-ink-primary" style={{ fontWeight: 500 }}>
          Educación que{" "}
          <span className="text-brand-primary">mueve.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-ink-secondary">
          Tecnología educativa para docentes y estudiantes.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#aproba"
            className="inline-flex items-center justify-center rounded-lg bg-brand-cta px-6 py-3 text-white text-sm transition-opacity hover:opacity-90"
            style={{ fontWeight: 500 }}
          >
            Conocer Aproba
          </a>
          <a
            href="#apps"
            className="inline-flex items-center justify-center rounded-lg border border-ink-primary/20 px-6 py-3 text-ink-primary text-sm transition-colors hover:border-brand-primary hover:text-brand-primary"
            style={{ fontWeight: 500 }}
          >
            Ver apps
          </a>
        </div>
      </div>
    </section>
  );
}
