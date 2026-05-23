export function Sobre() {
  return (
    <section id="sobre" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2
          className="text-3xl md:text-4xl text-ink-primary"
          style={{ fontWeight: 500 }}
        >
          Sobre Didarsis
        </h2>

        <div className="mt-8 space-y-4 text-ink-secondary text-lg">
          <p>
            Didarsis SpA es una empresa chilena de tecnología educativa.
          </p>
          <p>
            Construimos plataformas y herramientas para docentes y estudiantes.
          </p>
          <p>
            El nombre une didáctica y catarsis: enseñanza que también
            transforma.
          </p>
        </div>
      </div>
    </section>
  );
}
