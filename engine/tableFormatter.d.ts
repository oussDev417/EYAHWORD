import { TablePreset } from "../presets/tableTypes";
export interface TableFormatResult {
    success: boolean;
    tablesFormatted: number;
    error?: string;
}
export declare function applyTablePreset(preset: TablePreset): Promise<TableFormatResult>;
//# sourceMappingURL=tableFormatter.d.ts.map