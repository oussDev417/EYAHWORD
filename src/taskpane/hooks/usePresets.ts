import { useState, useCallback, useEffect } from "react";
import { FormattingPreset } from "../../presets/types";
import { builtInPresets } from "../../presets/defaults";
import {
  loadCustomPresets,
  addCustomPreset,
  updateCustomPreset,
  deleteCustomPreset,
  duplicateCustomPreset,
} from "../../presets/storage";

export interface UsePresetsReturn {
  builtInPresets: FormattingPreset[];
  customPresets: FormattingPreset[];
  allPresets: FormattingPreset[];
  addPreset: (preset: FormattingPreset) => void;
  updatePreset: (preset: FormattingPreset) => void;
  removePreset: (id: string) => void;
  duplicatePreset: (id: string) => void;
}

export function usePresets(): UsePresetsReturn {
  const [customPresets, setCustomPresets] = useState<FormattingPreset[]>([]);

  useEffect(() => {
    setCustomPresets(loadCustomPresets());
  }, []);

  const addPreset = useCallback((preset: FormattingPreset) => {
    const updated = addCustomPreset(preset);
    setCustomPresets(updated);
  }, []);

  const updatePreset = useCallback((preset: FormattingPreset) => {
    const updated = updateCustomPreset(preset);
    setCustomPresets(updated);
  }, []);

  const removePreset = useCallback((id: string) => {
    const updated = deleteCustomPreset(id);
    setCustomPresets(updated);
  }, []);

  const duplicatePresetFn = useCallback((id: string) => {
    const updated = duplicateCustomPreset(id);
    setCustomPresets(updated);
  }, []);

  return {
    builtInPresets,
    customPresets,
    allPresets: [...builtInPresets, ...customPresets],
    addPreset,
    updatePreset,
    removePreset,
    duplicatePreset: duplicatePresetFn,
  };
}
