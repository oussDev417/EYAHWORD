import React from "react";
import { FormattingPreset } from "../../presets/types";
interface PresetEditorProps {
    preset?: FormattingPreset;
    onSave: (preset: FormattingPreset) => void;
    onCancel: () => void;
}
export declare const PresetEditor: React.FC<PresetEditorProps>;
export {};
//# sourceMappingURL=PresetEditor.d.ts.map