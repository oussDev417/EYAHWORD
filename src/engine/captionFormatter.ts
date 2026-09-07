import { CaptionPreset } from "../presets/types";

const ALIGNMENT_MAP: Record<CaptionPreset["alignment"], Word.Alignment> = {
  left: "Left" as Word.Alignment,
  center: "Centered" as Word.Alignment,
  right: "Right" as Word.Alignment,
  justified: "Justified" as Word.Alignment,
};

const CAPTION_STYLE = "Caption";

export function isCaption(styleBuiltIn: string): boolean {
  return styleBuiltIn === CAPTION_STYLE;
}

export function applyCaptionFormat(paragraph: Word.Paragraph, preset: CaptionPreset): void {
  paragraph.font.name = preset.fontName;
  paragraph.font.size = preset.fontSize;
  paragraph.font.color = preset.color;
  paragraph.font.bold = preset.bold;
  paragraph.font.italic = preset.italic;
  paragraph.alignment = ALIGNMENT_MAP[preset.alignment];
  paragraph.spaceBefore = preset.spaceBefore;
  paragraph.spaceAfter = preset.spaceAfter;
}
