import { ParagraphPreset } from "../presets/types";

const ALIGNMENT_MAP: Record<ParagraphPreset["alignment"], Word.Alignment> = {
  left: "Left" as Word.Alignment,
  center: "Centered" as Word.Alignment,
  right: "Right" as Word.Alignment,
  justified: "Justified" as Word.Alignment,
};

export function applyParagraphFormat(
  paragraph: Word.Paragraph,
  preset: ParagraphPreset
): void {
  paragraph.alignment = ALIGNMENT_MAP[preset.alignment];
  paragraph.lineSpacing = preset.lineSpacing * 12;
  paragraph.spaceBefore = preset.spaceBefore;
  paragraph.spaceAfter = preset.spaceAfter;
  paragraph.firstLineIndent = preset.firstLineIndent;
}
