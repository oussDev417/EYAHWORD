import { FormattingPreset } from "../../presets/types";
import { FormatProgress, FormatResult } from "../../engine/formatting";
export interface UseWordFormattingReturn {
    isFormatting: boolean;
    progress: FormatProgress | null;
    result: FormatResult | null;
    error: string | null;
    format: (preset: FormattingPreset) => Promise<void>;
}
export declare function useWordFormatting(): UseWordFormattingReturn;
//# sourceMappingURL=useWordFormatting.d.ts.map