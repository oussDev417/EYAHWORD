import { TablePreset } from "./tableTypes";
import { ValidationError } from "./validation";

export function validateTablePreset(preset: Partial<TablePreset>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!preset.name || preset.name.trim().length === 0) {
    errors.push({ field: "name", message: "Le nom est requis." });
  }
  if (preset.name && preset.name.length > 50) {
    errors.push({ field: "name", message: "Le nom ne doit pas dépasser 50 caractères." });
  }

  const cellChecks: Array<[string, TablePreset["cells"] | undefined]> = [
    ["header", preset.header],
    ["cells", preset.cells],
  ];
  for (const [key, cell] of cellChecks) {
    if (!cell) continue;
    if (!cell.fontName || cell.fontName.trim().length === 0) {
      errors.push({ field: `${key}.fontName`, message: `La police (${key}) est requise.` });
    }
    if (cell.fontSize < 6 || cell.fontSize > 72) {
      errors.push({ field: `${key}.fontSize`, message: `La taille (${key}) doit être entre 6 et 72pt.` });
    }
  }

  if (preset.borders) {
    for (const key of ["outside", "inside"] as const) {
      const b = preset.borders[key];
      if (b && (b.width < 0 || b.width > 6)) {
        errors.push({ field: `borders.${key}.width`, message: `L'épaisseur (${key}) doit être entre 0 et 6pt.` });
      }
    }
  }

  return errors;
}
