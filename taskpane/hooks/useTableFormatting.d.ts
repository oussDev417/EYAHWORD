import { TablePreset } from "../../presets/tableTypes";
import { TableFormatResult } from "../../engine/tableFormatter";
export interface UseTableFormattingReturn {
    isFormatting: boolean;
    result: TableFormatResult | null;
    error: string | null;
    format: (preset: TablePreset) => Promise<void>;
}
export declare function useTableFormatting(): UseTableFormattingReturn;
//# sourceMappingURL=useTableFormatting.d.ts.map