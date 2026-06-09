// Modo de nombre de una sesión de aula.
//  - "free":   el estudiante escribe su nombre libremente (comportamiento original).
//  - "roster": el estudiante elige de una lista fija que sube el profesor.
export type NameMode = "free" | "roster";

export function isValidNameMode(x: unknown): x is NameMode {
  return x === "free" || x === "roster";
}

const MAX_NAME_LENGTH = 60;
const MAX_ROSTER_SIZE = 300;

// Clave de comparación: ignora mayúsculas, espacios redundantes y tildes,
// para que "Juan  Pérez", "juan perez" y "Juan Pérez" sean el mismo nombre.
export function normalizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

// Convierte el texto pegado por el profe (una columna de Excel = un nombre
// por línea) en una lista limpia: sin vacíos, sin duplicados, recortada.
// Conserva la primera grafía vista de cada nombre.
export function parseRoster(raw: unknown): string[] {
  if (typeof raw !== "string") return [];

  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of raw.split(/\r?\n/)) {
    const name = line.trim().replace(/\s+/g, " ").slice(0, MAX_NAME_LENGTH);
    if (name.length < 2) continue;

    const key = normalizeName(name);
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(name);
    if (result.length >= MAX_ROSTER_SIZE) break;
  }

  return result;
}

// ¿El nombre elegido está en la lista? (comparación tolerante)
export function rosterIncludes(roster: string[], name: string): boolean {
  const key = normalizeName(name);
  return roster.some((n) => normalizeName(n) === key);
}
