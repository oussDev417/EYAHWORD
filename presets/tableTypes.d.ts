export type TableAlignH = "left" | "center" | "right" | "justified";
export type TableAlignV = "top" | "center" | "bottom";
export interface TableCellPreset {
    fontName: string;
    fontSize: number;
    color: string;
    bold: boolean;
    italic: boolean;
    horizontalAlignment: TableAlignH;
    verticalAlignment: TableAlignV;
    shadingColor: string;
    spaceBefore: number;
    spaceAfter: number;
}
export interface TableBulletPreset {
    fontName: string;
    fontSize: number;
    color: string;
    bold: boolean;
    italic: boolean;
    spaceBefore: number;
    spaceAfter: number;
    leftIndent: number;
}
export type TableBorderStyle = "none" | "single" | "double" | "dashed" | "dotted" | "thick";
export interface TableBorderPreset {
    style: TableBorderStyle;
    width: number;
    color: string;
}
export interface TablePreset {
    id: string;
    name: string;
    description: string;
    isBuiltIn: boolean;
    header: TableCellPreset;
    headerEnabled: boolean;
    cells: TableCellPreset;
    bandedRows: boolean;
    bandedShadingColor: string;
    borders: {
        outside: TableBorderPreset;
        inside: TableBorderPreset;
    };
    cellBullets: TableBulletPreset | null;
}
//# sourceMappingURL=tableTypes.d.ts.map