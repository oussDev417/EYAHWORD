import { PageLayoutConfig } from "../../presets/pageTypes";
import { PageLayoutResult } from "../../engine/headerFooterFormatter";
import { TocResult } from "../../engine/tocFormatter";
export interface UsePageLayoutReturn {
    config: PageLayoutConfig;
    setConfig: (config: PageLayoutConfig) => void;
    isApplying: boolean;
    result: PageLayoutResult | null;
    tocResult: TocResult | null;
    error: string | null;
    apply: () => Promise<void>;
    clear: (target: "header" | "footer" | "both") => Promise<void>;
    generateToc: () => Promise<void>;
}
export declare function usePageLayout(): UsePageLayoutReturn;
//# sourceMappingURL=usePageLayout.d.ts.map