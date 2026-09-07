export type PageAlign = "left" | "center" | "right";
export interface HeaderFooterPreset {
    enabled: boolean;
    text: string;
    fontName: string;
    fontSize: number;
    color: string;
    bold: boolean;
    italic: boolean;
    alignment: PageAlign;
}
export type PageNumberFormat = "number" | "page-n" | "page-n-of-m";
export interface PageNumberPreset {
    enabled: boolean;
    position: "header" | "footer";
    alignment: PageAlign;
    format: PageNumberFormat;
    fontName: string;
    fontSize: number;
    color: string;
}
export interface TocPreset {
    title: string;
    levels: number;
    showPageNumbers: boolean;
    useHyperlinks: boolean;
    titleFontName: string;
    titleFontSize: number;
    titleColor: string;
    titleBold: boolean;
    titleAlignment: PageAlign;
}
export interface PageLayoutConfig {
    header: HeaderFooterPreset;
    footer: HeaderFooterPreset;
    pageNumber: PageNumberPreset;
    toc: TocPreset;
}
//# sourceMappingURL=pageTypes.d.ts.map