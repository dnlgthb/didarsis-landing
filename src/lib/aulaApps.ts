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

// Operaciones/habilidades que el profesor puede fijar como objetivo, por app.
// Solo las apps con más de una modalidad ofrecen selección; Despeja tiene una
// sola (ecuaciones), por eso va vacía y no se muestra selector.
export const APP_OPERATIONS: Record<AulaApp, string[]> = {
  numera: ["suma", "resta", "multi", "div"],
  verba: ["ortografia", "vocabulario", "cohesion", "comprension"],
  despeja: [],
};

const ALL_OPERATIONS = new Set(Object.values(APP_OPERATIONS).flat());

export function isValidApp(x: unknown): x is AulaApp {
  return x === "numera" || x === "despeja" || x === "verba";
}

export function isValidOperation(x: unknown): x is string {
  return typeof x === "string" && ALL_OPERATIONS.has(x);
}

// Normaliza la entrada del cliente a un array de operaciones válidas y únicas.
export function parseOperationTypes(x: unknown): string[] {
  if (!Array.isArray(x)) return [];
  return [...new Set(x.filter(isValidOperation))];
}

export function appFromOperation(op: string | undefined): AulaApp | null {
  return (op && OP_TO_APP[op]) || null;
}
