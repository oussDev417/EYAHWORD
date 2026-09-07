import { BulletPreset } from "../presets/types";
import { TableBulletPreset } from "../presets/tableTypes";

const ALIGNMENT_MAP: Record<BulletPreset["alignment"], Word.Alignment> = {
  left: "Left" as Word.Alignment,
  center: "Centered" as Word.Alignment,
  right: "Right" as Word.Alignment,
  justified: "Justified" as Word.Alignment,
};

export function applyBulletFormat(paragraph: Word.Paragraph, preset: BulletPreset): void {
  paragraph.font.name = preset.fontName;
  paragraph.font.size = preset.fontSize;
  paragraph.font.color = preset.color;
  paragraph.font.bold = preset.bold;
  paragraph.font.italic = preset.italic;
  paragraph.alignment = ALIGNMENT_MAP[preset.alignment];
  paragraph.lineSpacing = preset.lineSpacing * 12;
  paragraph.spaceBefore = preset.spaceBefore;
  paragraph.spaceAfter = preset.spaceAfter;
  paragraph.leftIndent = preset.leftIndent;
}

export function applyTableBulletFormat(paragraph: Word.Paragraph, preset: TableBulletPreset): void {
  paragraph.font.name = preset.fontName;
  paragraph.font.size = preset.fontSize;
  paragraph.font.color = preset.color;
  paragraph.font.bold = preset.bold;
  paragraph.font.italic = preset.italic;
  paragraph.spaceBefore = preset.spaceBefore;
  paragraph.spaceAfter = preset.spaceAfter;
  paragraph.leftIndent = preset.leftIndent;
}

export function isListParagraph(paragraph: Word.Paragraph): boolean {
  const li = (paragraph as any).listItemOrNullObject;
  return li ? !li.isNullObject : false;
}
