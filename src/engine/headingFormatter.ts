import { HeadingPreset } from "../presets/types";
import { FormattingPreset } from "../presets/types";

const HEADING_STYLES = [
  "Heading1",
  "Heading2",
  "Heading3",
] as const;

const ALIGNMENT_MAP: Record<string, Word.Alignment> = {
  left: "Left" as Word.Alignment,
  center: "Centered" as Word.Alignment,
  right: "Right" as Word.Alignment,
  justified: "Justified" as Word.Alignment,
};

export type HeadingLevel = "h1" | "h2" | "h3";

export function getHeadingLevel(styleBuiltIn: string): HeadingLevel | null {
  if (styleBuiltIn === "Heading1") return "h1";
  if (styleBuiltIn === "Heading2") return "h2";
  if (styleBuiltIn === "Heading3") return "h3";
  return null;
}

export function isHeading(styleBuiltIn: string): boolean {
  return HEADING_STYLES.includes(styleBuiltIn as typeof HEADING_STYLES[number]);
}

export function applyHeadingFormat(
  paragraph: Word.Paragraph,
  heading: HeadingPreset
): void {
  paragraph.font.name = heading.fontName;
  paragraph.font.size = heading.fontSize;
  paragraph.font.bold = heading.bold;
  paragraph.font.color = heading.color;
  paragraph.spaceBefore = heading.spaceBefore;
  paragraph.spaceAfter = heading.spaceAfter;
  paragraph.alignment = ALIGNMENT_MAP[heading.alignment];
}

export function getHeadingPreset(
  level: HeadingLevel,
  preset: FormattingPreset
): HeadingPreset {
  return preset.headings[level];
}
