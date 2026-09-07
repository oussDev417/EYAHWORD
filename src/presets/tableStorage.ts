import { TablePreset } from "./tableTypes";
import { STORAGE_KEYS } from "../utils/constants";

export function loadCustomTablePresets(): TablePreset[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_TABLE_PRESETS);
    if (!data) return [];
    return JSON.parse(data) as TablePreset[];
  } catch {
    return [];
  }
}

export function saveCustomTablePresets(presets: TablePreset[]): void {
  localStorage.setItem(STORAGE_KEYS.CUSTOM_TABLE_PRESETS, JSON.stringify(presets));
}

export function addCustomTablePreset(preset: TablePreset): TablePreset[] {
  const presets = loadCustomTablePresets();
  presets.push(preset);
  saveCustomTablePresets(presets);
  return presets;
}

export function updateCustomTablePreset(updated: TablePreset): TablePreset[] {
  const presets = loadCustomTablePresets();
  const index = presets.findIndex((p) => p.id === updated.id);
  if (index === -1) throw new Error(`Table preset "${updated.id}" non trouvé.`);
  presets[index] = updated;
  saveCustomTablePresets(presets);
  return presets;
}

export function deleteCustomTablePreset(id: string): TablePreset[] {
  const presets = loadCustomTablePresets().filter((p) => p.id !== id);
  saveCustomTablePresets(presets);
  return presets;
}

export function duplicateCustomTablePreset(id: string): TablePreset[] {
  const presets = loadCustomTablePresets();
  const source = presets.find((p) => p.id === id);
  if (!source) throw new Error(`Table preset "${id}" non trouvé.`);
  const duplicate: TablePreset = {
    ...JSON.parse(JSON.stringify(source)),
    id: `custom_table_${Date.now()}`,
    name: `${source.name} (copie)`,
    isBuiltIn: false,
  };
  presets.push(duplicate);
  saveCustomTablePresets(presets);
  return presets;
}
