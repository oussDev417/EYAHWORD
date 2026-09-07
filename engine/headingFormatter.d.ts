import { HeadingPreset, HeadingKey } from "../presets/types";
import { FormattingPreset } from "../presets/types";
export type HeadingLevel = HeadingKey;
export declare function getHeadingLevel(styleBuiltIn: string): HeadingLevel | null;
export declare function isHeading(styleBuiltIn: string): boolean;
export declare function applyHeadingFormat(paragraph: Word.Paragraph, heading: HeadingPreset): void;
export declare function getHeadingPreset(level: HeadingLevel, preset: FormattingPreset): HeadingPreset;
//# sourceMappingURL=headingFormatter.d.ts.map