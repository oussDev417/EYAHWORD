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
    color: string;
    spaceBefore: number;
    spaceAfter: number;
    alignment: "left" | "center" | "right" | "justified";
}
export interface PagePreset {
    topMargin: number;
    bottomMargin: number;
    leftMargin: number;
    rightMargin: number;
}
export interface FormattingPreset {
    id: string;
    name: string;
    description: string;
    isBuiltIn: boolean;
    body: FontPreset;
    paragraph: ParagraphPreset;
    headings: {
        h1: HeadingPreset;
        h2: HeadingPreset;
        h3: HeadingPreset;
    };
    page: PagePreset;
}
//# sourceMappingURL=types.d.ts.map