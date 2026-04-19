import { FormattingPreset } from "../../presets/types";
export interface UsePresetsReturn {
    builtInPresets: FormattingPreset[];
    customPresets: FormattingPreset[];
    allPresets: FormattingPreset[];
    addPreset: (preset: FormattingPreset) => void;
    updatePreset: (preset: FormattingPreset) => void;
    removePreset: (id: string) => void;
    duplicatePreset: (id: string) => void;
}
export declare function usePresets(): UsePresetsReturn;
//# sourceMappingURL=usePresets.d.ts.map