import React from "react";
import { TablePreset } from "../../presets/tableTypes";
interface TablePresetCardProps {
    preset: TablePreset;
    onApply: (preset: TablePreset) => void;
    onEdit?: (preset: TablePreset) => void;
    onDuplicate?: (id: string) => void;
    onDelete?: (id: string) => void;
    isApplying: boolean;
}
export declare const TablePresetCard: React.FC<TablePresetCardProps>;
export {};
//# sourceMappingURL=TablePresetCard.d.ts.map