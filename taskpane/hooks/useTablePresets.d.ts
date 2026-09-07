import { TablePreset } from "../../presets/tableTypes";
export interface UseTablePresetsReturn {
    builtInPresets: TablePreset[];
    customPresets: TablePreset[];
    allPresets: TablePreset[];
    addPreset: (preset: TablePreset) => void;
    updatePreset: (preset: TablePreset) => void;
    removePreset: (id: string) => void;
    duplicatePreset: (id: string) => void;
}
export declare function useTablePresets(): UseTablePresetsReturn;
//# sourceMappingURL=useTablePresets.d.ts.map