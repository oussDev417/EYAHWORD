import { TocPreset } from "../presets/pageTypes";
export interface TocResult {
    success: boolean;
    headingsFound: number;
    message: string;
}
export declare function insertToc(preset: TocPreset): Promise<TocResult>;
//# sourceMappingURL=tocFormatter.d.ts.map