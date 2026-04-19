import { FormattingPreset } from "./types";
import { STORAGE_KEYS } from "../utils/constants";

export function loadCustomPresets(): FormattingPreset[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_PRESETS);
    if (!data) return [];
    return JSON.parse(data) as FormattingPreset[];
  } catch {
    return [];
  }
}

export function saveCustomPresets(presets: FormattingPreset[]): void {
  localStorage.setItem(STORAGE_KEYS.CUSTOM_PRESETS, JSON.stringify(presets));
}

export function addCustomPreset(preset: FormattingPreset): FormattingPreset[] {
  const presets = loadCustomPresets();
  presets.push(preset);
  saveCustomPresets(presets);
  return presets;
}

export function updateCustomPreset(updated: FormattingPreset): FormattingPreset[] {
  const presets = loadCustomPresets();
  const index = presets.findIndex((p) => p.id === updated.id);
  if (index === -1) throw new Error(`Preset "${updated.id}" non trouvé.`);
  presets[index] = updated;
  saveCustomPresets(presets);
  return presets;
}

export function deleteCustomPreset(id: string): FormattingPreset[] {
  const presets = loadCustomPresets().filter((p) => p.id !== id);
  saveCustomPresets(presets);
  return presets;
}

export function duplicateCustomPreset(id: string): FormattingPreset[] {
  const presets = loadCustomPresets();
  const source = presets.find((p) => p.id === id);
  if (!source) throw new Error(`Preset "${id}" non trouvé.`);

  const duplicate: FormattingPreset = {
    ...JSON.parse(JSON.stringify(source)),
    id: `custom_${Date.now()}`,
    name: `${source.name} (copie)`,
    isBuiltIn: false,
  };

  presets.push(duplicate);
  saveCustomPresets(presets);
  return presets;
}
