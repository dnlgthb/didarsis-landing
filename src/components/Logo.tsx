export function Logo({ variant = "full" }: { variant?: "full" | "mark" }) {
  const symbol = (
    <svg viewBox="0 0 32 32" className="shrink-0" aria-hidden="true">
      <circle cx={6} cy={22} r={3} fill="#7F00FF" />
      <circle cx={16} cy={15} r={3} fill="#BF15AE" />
      <circle cx={26} cy={8} r={3} fill="#FF295C" />
    </svg>
  );

  if (variant === "mark") {
    return (
      <div
        className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-brand-primary"
        style={{ background: "#FBF8F4", width: 48, height: 48, padding: 8 }}
      >
        {symbol}
      </div>
    );
  }

  return (
    <a href="#" className="inline-flex items-center gap-2">
      <div className="w-8 h-8">{symbol}</div>
      <span
        className="text-xl text-brand-primary"
        style={{ fontWeight: 500, letterSpacing: "-1.2px" }}
      >
        didarsis
      </span>
    </a>
  );
}
