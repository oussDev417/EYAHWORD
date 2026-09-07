export declare function escapeXml(value: string): string;
/** Strips the leading "#" so a CSS colour becomes an OOXML hex value. */
export declare function toOoxmlColor(color: string): string;
/** OOXML font sizes are expressed in half-points. */
export declare function toHalfPoints(sizeInPoints: number): number;
export interface RunStyle {
    fontName: string;
    fontSize: number;
    color: string;
    bold?: boolean;
    italic?: boolean;
}
export declare function runProperties(style: RunStyle): string;
export declare function textRun(text: string, style: RunStyle): string;
/**
 * Builds the run sequence for a Word field (begin / instruction / separator /
 * placeholder / end). `dirty` asks Word to recalculate the field on load.
 */
export declare function fieldRuns(instruction: string, placeholder: string, style: RunStyle, dirty?: boolean): string;
export declare function paragraph(innerRuns: string, alignment: string, extraProps?: string): string;
/** Wraps body-level XML in the flat OPC package that insertOoxml expects. */
export declare function wrapInPackage(bodyXml: string): string;
//# sourceMappingURL=ooxml.d.ts.map