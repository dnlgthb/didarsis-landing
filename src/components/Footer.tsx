import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contacto" className="bg-ink-primary text-white/80 px-6 py-16">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
              <circle cx={6} cy={22} r={3} fill="#7F00FF" />
              <circle cx={16} cy={15} r={3} fill="#BF15AE" />
              <circle cx={26} cy={8} r={3} fill="#FF295C" />
            </svg>
            <span
              className="text-lg text-white"
              style={{ fontWeight: 500, letterSpacing: "-1.2px" }}
            >
              didarsis
            </span>
          </div>
          <p className="mt-3 text-sm text-white/60">
            Educación que mueve.
          </p>
        </div>

        <div>
          <h3 className="text-sm text-white" style={{ fontWeight: 500 }}>
            Productos
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://aproba.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Aproba
              </a>
            </li>
            <li>
              <a
                href="/numera/"
                className="hover:text-white transition-colors"
              >
                Numera
              </a>
            </li>
            <li>
              <a
                href="/despeja/"
                className="hover:text-white transition-colors"
              >
                Despeja
              </a>
            </li>
            <li>
              <a
                href="/aula"
                className="hover:text-white transition-colors"
              >
                Aula Virtual
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm text-white" style={{ fontWeight: 500 }}>
            Contacto
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="mailto:contacto@didarsis.com"
                className="hover:text-white transition-colors"
              >
                contacto@didarsis.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        © 2026 Didarsis SpA · Chile
      </div>
    </footer>
  );
}
