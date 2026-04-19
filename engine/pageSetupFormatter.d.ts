import { PagePreset } from "../presets/types";
export interface PageSetupResult {
    applied: boolean;
    message?: string;
}
export declare function applyPageSetup(context: Word.RequestContext, page: PagePreset): Promise<PageSetupResult>;
//# sourceMappingURL=pageSetupFormatter.d.ts.map