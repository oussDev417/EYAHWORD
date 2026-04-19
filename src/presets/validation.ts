import { FormattingPreset } from "./types";

export interface ValidationError {
  field: string;
  message: string;
}

export function validatePreset(preset: Partial<FormattingPreset>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!preset.name || preset.name.trim().length === 0) {
    errors.push({ field: "name", message: "Le nom est requis." });
  }
  if (preset.name && preset.name.length > 50) {
    errors.push({ field: "name", message: "Le nom ne doit pas dépasser 50 caractères." });
  }

  if (preset.body) {
    if (!preset.body.name || preset.body.name.trim().length === 0) {
      errors.push({ field: "body.name", message: "La police est requise." });
    }
    if (preset.body.size < 6 || preset.body.size > 72) {
      errors.push({ field: "body.size", message: "La taille doit être entre 6 et 72pt." });
    }
  }

  if (preset.paragraph) {
    if (preset.paragraph.lineSpacing < 0.5 || preset.paragraph.lineSpacing > 5) {
      errors.push({ field: "paragraph.lineSpacing", message: "L'interligne doit être entre 0.5 et 5." });
    }
  }

  if (preset.page) {
    const { topMargin, bottomMargin, leftMargin, rightMargin } = preset.page;
    for (const [key, val] of Object.entries({ topMargin, bottomMargin, leftMargin, rightMargin })) {
      if (val < 0 || val > 200) {
        errors.push({ field: `page.${key}`, message: `Marge ${key} invalide.` });
      }
    }
  }

  return errors;
}

export function isValidPreset(preset: Partial<FormattingPreset>): preset is FormattingPreset {
  return validatePreset(preset).length === 0 && !!preset.id && !!preset.body && !!preset.paragraph && !!preset.headings && !!preset.page;
}
