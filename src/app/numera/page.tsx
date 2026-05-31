import { Logo } from "@/components/Logo";
import { ArrowLeft } from "lucide-react";

export default function NumeraPage() {
  return (
    <div className="flex flex-col h-dvh">
      <header className="shrink-0 border-b border-black/5 bg-white/80 backdrop-blur-md px-4 py-2 flex items-center gap-4">
        <a href="/" className="text-ink-secondary hover:text-brand-primary transition-colors">
          <ArrowLeft size={20} />
        </a>
        <Logo />
        <span className="text-sm text-ink-secondary" style={{ fontWeight: 500 }}>
          Numera
        </span>
      </header>
      <iframe
        src="https://numera-plus.vercel.app/"
        className="flex-1 w-full border-0"
        allow="fullscreen"
      />
    </div>
  );
}
