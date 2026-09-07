import React from "react";
/**
 * Small building blocks shared by the preset editors. Every editor repeats the
 * same font / colour / spacing groups, so they live here to stay consistent and
 * to keep the task pane's narrow-width fixes in one place.
 */
interface FontRowProps {
    fontName: string;
    fontSize: number;
    color: string;
    onFontName: (v: string) => void;
    onFontSize: (v: number) => void;
    onColor: (v: string) => void;
    fontLabel?: string;
}
export declare const FontRow: React.FC<FontRowProps>;
interface StyleTogglesProps {
    bold: boolean;
    italic: boolean;
    onBold: (v: boolean) => void;
    onItalic: (v: boolean) => void;
}
export declare const StyleToggles: React.FC<StyleTogglesProps>;
interface AlignmentFieldProps {
    value: string;
    onChange: (v: string) => void;
    includeJustified?: boolean;
    label?: string;
}
export declare const AlignmentField: React.FC<AlignmentFieldProps>;
interface SpacingRowProps {
    spaceBefore: number;
    spaceAfter: number;
    onSpaceBefore: (v: number) => void;
    onSpaceAfter: (v: number) => void;
}
export declare const SpacingRow: React.FC<SpacingRowProps>;
interface NumberFieldProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (v: number) => void;
}
export declare const NumberField: React.FC<NumberFieldProps>;
export {};
//# sourceMappingURL=fields.d.ts.map