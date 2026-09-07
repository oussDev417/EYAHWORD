import { TableCellPreset, TableBorderPreset, TablePreset } from "../presets/tableTypes";
import { applyTableBulletFormat } from "./bulletFormatter";
import { FormattingError, getErrorMessage } from "../utils/errors";

const H_ALIGN_MAP: Record<TableCellPreset["horizontalAlignment"], Word.Alignment> = {
  left: "Left" as Word.Alignment,
  center: "Centered" as Word.Alignment,
  right: "Right" as Word.Alignment,
  justified: "Justified" as Word.Alignment,
};

const V_ALIGN_MAP: Record<TableCellPreset["verticalAlignment"], Word.VerticalAlignment> = {
  top: "Top" as Word.VerticalAlignment,
  center: "Center" as Word.VerticalAlignment,
  bottom: "Bottom" as Word.VerticalAlignment,
};

const BORDER_TYPE_MAP: Record<TableBorderPreset["style"], Word.BorderType> = {
  none: "None" as Word.BorderType,
  single: "Single" as Word.BorderType,
  double: "Double" as Word.BorderType,
  dashed: "Dashed" as Word.BorderType,
  dotted: "Dotted" as Word.BorderType,
  thick: "Thick" as Word.BorderType,
};

const OUTSIDE_LOCATIONS: Word.BorderLocation[] = [
  "Top" as Word.BorderLocation,
  "Bottom" as Word.BorderLocation,
  "Left" as Word.BorderLocation,
  "Right" as Word.BorderLocation,
];
const INSIDE_LOCATIONS: Word.BorderLocation[] = [
  "InsideHorizontal" as Word.BorderLocation,
  "InsideVertical" as Word.BorderLocation,
];

function applyCellFormatting(cell: Word.TableCell, preset: TableCellPreset, shadingOverride?: string): void {
  cell.horizontalAlignment = H_ALIGN_MAP[preset.horizontalAlignment];
  cell.verticalAlignment = V_ALIGN_MAP[preset.verticalAlignment];

  const shading = shadingOverride ?? preset.shadingColor;
  if (shading && shading.length > 0) {
    cell.shadingColor = shading;
  }

  const font = cell.body.font;
  font.name = preset.fontName;
  font.size = preset.fontSize;
  font.color = preset.color;
  font.bold = preset.bold;
  font.italic = preset.italic;
}

function applyBorder(table: Word.Table, location: Word.BorderLocation, border: TableBorderPreset): void {
  try {
    const b = table.getBorder(location);
    b.type = BORDER_TYPE_MAP[border.style];
    if (border.style !== "none") {
      b.color = border.color;
      b.width = border.width;
    }
  } catch {
    // Some hosts don't expose all border locations; ignore silently.
  }
}

export interface TableFormatResult {
  success: boolean;
  tablesFormatted: number;
  error?: string;
}

export async function applyTablePreset(preset: TablePreset): Promise<TableFormatResult> {
  try {
    return await Word.run(async (context) => {
      const tables = context.document.body.tables;
      tables.load("items");
      await context.sync();

      const total = tables.items.length;
      if (total === 0) {
        return { success: true, tablesFormatted: 0 };
      }

      for (const table of tables.items) {
        table.load("rowCount");
      }
      await context.sync();

      for (const table of tables.items) {
        for (const loc of OUTSIDE_LOCATIONS) {
          applyBorder(table, loc, preset.borders.outside);
        }
        for (const loc of INSIDE_LOCATIONS) {
          applyBorder(table, loc, preset.borders.inside);
        }
        table.rows.load("items");
      }
      await context.sync();

      for (const table of tables.items) {
        for (const row of table.rows.items) {
          row.cells.load("items");
        }
      }
      await context.sync();

      const cellParaLoads: Array<{
        para: Word.Paragraph;
        li: any;
        cellPreset: TableCellPreset;
      }> = [];

      for (const table of tables.items) {
        const rowItems = table.rows.items;
        for (let r = 0; r < rowItems.length; r++) {
          const row = rowItems[r];
          const isHeader = preset.headerEnabled && r === 0;
          const cellPreset = isHeader ? preset.header : preset.cells;
          let shadingOverride: string | undefined;
          if (!isHeader && preset.bandedRows && r % 2 === 1) {
            shadingOverride = preset.bandedShadingColor;
          }

          for (const cell of row.cells.items) {
            applyCellFormatting(cell, cellPreset, shadingOverride);
            cell.body.paragraphs.load("items");
          }
          void shadingOverride;
        }
      }
      await context.sync();

      for (const table of tables.items) {
        const rowItems = table.rows.items;
        for (let r = 0; r < rowItems.length; r++) {
          const row = rowItems[r];
          const isHeader = preset.headerEnabled && r === 0;
          const cellPreset = isHeader ? preset.header : preset.cells;

          for (const cell of row.cells.items) {
            for (const para of cell.body.paragraphs.items) {
              para.spaceBefore = cellPreset.spaceBefore;
              para.spaceAfter = cellPreset.spaceAfter;
              if (preset.cellBullets) {
                const li = (para as any).listItemOrNullObject;
                if (li && typeof li.load === "function") {
                  li.load("isNullObject");
                  cellParaLoads.push({ para, li, cellPreset });
                }
              }
            }
          }
        }
      }
      await context.sync();

      if (preset.cellBullets && cellParaLoads.length > 0) {
        for (const { para, li } of cellParaLoads) {
          if (!li.isNullObject) {
            applyTableBulletFormat(para, preset.cellBullets);
          }
        }
        await context.sync();
      }

      return { success: true, tablesFormatted: total };
    });
  } catch (error) {
    const message = getErrorMessage(error);
    throw new FormattingError(`Erreur de formatage des tableaux : ${message}`);
  }
}
