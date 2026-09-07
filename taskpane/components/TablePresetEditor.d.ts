import React from "react";
import { TablePreset } from "../../presets/tableTypes";
interface TablePresetEditorProps {
    preset?: TablePreset;
    onSave: (preset: TablePreset) => void;
    onCancel: () => void;
}
export declare const TablePresetEditor: React.FC<TablePresetEditorProps>;
export {};
//# sourceMappingURL=TablePresetEditor.d.ts.map