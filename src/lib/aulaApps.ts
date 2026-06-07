export type AulaApp = "numera" | "despeja" | "verba";

export const APP_LABELS: Record<AulaApp, string> = {
  numera: "Numera+",
  despeja: "Despeja",
  verba: "Verba!",
};

// Cada app envía valores de operationType únicos en sus eventos,
// lo que permite deducir la app en el servidor sin que se identifique.
export const OP_TO_APP: Record<string, AulaApp> = {
  suma: "numera",
  resta: "numera",
  multi: "numera",
  div: "numera",
  algebra: "despeja",
  ortografia: "verba",
  vocabulario: "verba",
  cohesion: "verba",
  comprension: "verba",
};

export const OP_LABELS: Record<string, string> = {
  suma: "Suma",
  resta: "Resta",
  multi: "Multiplicación",
  div: "División",
  algebra: "Ecuaciones",
  ortografia: "Ortografía",
  vocabulario: "Vocabulario",
  cohesion: "Cohesión",
  comprension: "Comprensión",
};

export function isValidApp(x: unknown): x is AulaApp {
  return x === "numera" || x === "despeja" || x === "verba";
}

export function appFromOperation(op: string | undefined): AulaApp | null {
  return (op && OP_TO_APP[op]) || null;
}
