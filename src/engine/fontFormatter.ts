import { FontPreset } from "../presets/types";

export function applyFontToRange(range: Word.Range, font: FontPreset): void {
  range.font.name = font.name;
  range.font.size = font.size;
  range.font.color = font.color;
  range.font.bold = font.bold;
  range.font.italic = font.italic;
}
