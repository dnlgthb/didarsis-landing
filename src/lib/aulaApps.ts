export type AulaApp = "numera" | "despeja" | "verba";

export const APP_LABELS: Record<AulaApp, string> = {
  numera: "Numera+",
  despeja: "Despeja",
  verba: "Verba!",
};

// URL base de cada app para generar deep-links de ingreso (QR del aula).
// Apunta al dominio didarsis.com (más confiable al escanear); cada página
// embebe la app en un iframe y reenvía el ?code= adentro (ver AppFrame).
export const APP_JOIN_URLS: Record<AulaApp, string> = {
  numera: "https://didarsis.com/numera",
  despeja: "https://didarsis.com/despeja",
  verba: "https://didarsis.com/verba",
};

// Deep-link que abre la app con el código ya cargado, listo para elegir nombre.
export function joinUrl(app: AulaApp, code: string): string {
  return `${APP_JOIN_URLS[app]}?code=${encodeURIComponent(code)}`;
}

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

// Símbolo compacto de las operaciones de Numera para el panel del profesor.
// Las habilidades sin símbolo (Verba, Despeja) caen de vuelta a su etiqueta.
export const OP_SYMBOLS: Record<string, string> = {
  suma: "+",
  resta: "−",
  multi: "×",
  div: "÷",
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
