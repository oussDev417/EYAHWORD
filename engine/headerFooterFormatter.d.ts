import { PageLayoutConfig } from "../presets/pageTypes";
export interface PageLayoutResult {
    success: boolean;
    headerApplied: boolean;
    footerApplied: boolean;
    pageNumberApplied: boolean;
    sectionsProcessed: number;
}
export declare function applyPageLayout(config: PageLayoutConfig): Promise<PageLayoutResult>;
export declare function clearHeaderFooter(target: "header" | "footer" | "both"): Promise<void>;
//# sourceMappingURL=headerFooterFormatter.d.ts.map