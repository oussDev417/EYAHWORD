import { FormattingPreset } from "./types";
export interface ValidationError {
    field: string;
    message: string;
}
export declare function validatePreset(preset: Partial<FormattingPreset>): ValidationError[];
export declare function isValidPreset(preset: Partial<FormattingPreset>): preset is FormattingPreset;
//# sourceMappingURL=validation.d.ts.map