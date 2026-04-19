import { FormattingPreset } from "../presets/types";
import { PageSetupResult } from "./pageSetupFormatter";
export interface FormatProgress {
    current: number;
    total: number;
    phase: string;
}
export interface FormatResult {
    success: boolean;
    paragraphsFormatted: number;
    pageSetupResult: PageSetupResult;
    error?: string;
}
export declare function applyPreset(preset: FormattingPreset, onProgress?: (progress: FormatProgress) => void): Promise<FormatResult>;
//# sourceMappingURL=formatting.d.ts.map