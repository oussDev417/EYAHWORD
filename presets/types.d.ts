export interface FontPreset {
    name: string;
    size: number;
    color: string;
    bold: boolean;
    italic: boolean;
}
export interface ParagraphPreset {
    alignment: "left" | "center" | "right" | "justified";
    lineSpacing: number;
    spaceBefore: number;
    spaceAfter: number;
    firstLineIndent: number;
}
export interface HeadingPreset {
    fontName: string;
    fontSize: number;
    bold: boolean;
    italic: boolean;
    color: string;
    /** Empty string means no highlight. */
    highlightColor: string;
    spaceBefore: number;
    spaceAfter: number;
    alignment: "left" | "center" | "right" | "justified";
}
export type HeadingKey = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export declare const HEADING_KEYS: HeadingKey[];
export type HeadingSet = Record<HeadingKey, HeadingPreset>;
export interface PagePreset {
    topMargin: number;
    bottomMargin: number;
    leftMargin: number;
    rightMargin: number;
}
export interface BulletPreset {
    fontName: string;
    fontSize: number;
    color: string;
    bold: boolean;
    italic: boolean;
    alignment: "left" | "center" | "right" | "justified";
    lineSpacing: number;
    spaceBefore: number;
    spaceAfter: number;
    leftIndent: number;
}
export interface CaptionPreset {
    fontName: string;
    fontSize: number;
    color: string;
    bold: boolean;
    italic: boolean;
    alignment: "left" | "center" | "right" | "justified";
    spaceBefore: number;
    spaceAfter: number;
}
export interface FormattingPreset {
    id: string;
    name: string;
    description: string;
    isBuiltIn: boolean;
    body: FontPreset;
    paragraph: ParagraphPreset;
    headings: HeadingSet;
    bullet: BulletPreset;
    caption: CaptionPreset;
    page: PagePreset;
}
//# sourceMappingURL=types.d.ts.map