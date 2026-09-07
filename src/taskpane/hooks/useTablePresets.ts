import { useState, useCallback, useEffect } from "react";
import { TablePreset } from "../../presets/tableTypes";
import { builtInTablePresets } from "../../presets/tableDefaults";
import {
  loadCustomTablePresets,
  addCustomTablePreset,
  updateCustomTablePreset,
  deleteCustomTablePreset,
  duplicateCustomTablePreset,
} from "../../presets/tableStorage";

export interface UseTablePresetsReturn {
  builtInPresets: TablePreset[];
  customPresets: TablePreset[];
  allPresets: TablePreset[];
  addPreset: (preset: TablePreset) => void;
  updatePreset: (preset: TablePreset) => void;
  removePreset: (id: string) => void;
  duplicatePreset: (id: string) => void;
}

export function useTablePresets(): UseTablePresetsReturn {
  const [customPresets, setCustomPresets] = useState<TablePreset[]>([]);

  useEffect(() => {
    setCustomPresets(loadCustomTablePresets());
  }, []);

  const addPreset = useCallback((preset: TablePreset) => {
    setCustomPresets(addCustomTablePreset(preset));
  }, []);

  const updatePreset = useCallback((preset: TablePreset) => {
    setCustomPresets(updateCustomTablePreset(preset));
  }, []);

  const removePreset = useCallback((id: string) => {
    setCustomPresets(deleteCustomTablePreset(id));
  }, []);

  const duplicatePresetFn = useCallback((id: string) => {
    setCustomPresets(duplicateCustomTablePreset(id));
  }, []);

  return {
    builtInPresets: builtInTablePresets,
    customPresets,
    allPresets: [...builtInTablePresets, ...customPresets],
    addPreset,
    updatePreset,
    removePreset,
    duplicatePreset: duplicatePresetFn,
  };
}
