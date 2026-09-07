import { FormattingPreset } from "../presets/types";
import { applyFontToRange } from "./fontFormatter";
import { applyParagraphFormat } from "./paragraphFormatter";
import { getHeadingLevel, isHeading, applyHeadingFormat, getHeadingPreset } from "./headingFormatter";
import { applyPageSetup, PageSetupResult } from "./pageSetupFormatter";
import { applyBulletFormat } from "./bulletFormatter";
import { isCaption, applyCaptionFormat } from "./captionFormatter";
import { BATCH_SIZE } from "../utils/constants";
import { FormattingError, getErrorMessage } from "../utils/errors";

export interface FormatProgress {
  current: number;
  total: number;
  phase: string;
}

export interface FormatResult {
  success: boolean;
  paragraphsFormatted: number;
  pageSetupResult: PageSetupResult;
  error?: string;
}

export async function applyPreset(
  preset: FormattingPreset,
  onProgress?: (progress: FormatProgress) => void
): Promise<FormatResult> {
  try {
    return await Word.run(async (context) => {
      const body = context.document.body;
      const paragraphs = body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      const total = paragraphs.items.length;

      onProgress?.({ current: 0, total, phase: "Chargement des paragraphes..." });

      const listItems: Array<{ para: Word.Paragraph; li: any }> = [];
      for (const p of paragraphs.items) {
        p.load("styleBuiltIn");
        const li = (p as any).listItemOrNullObject;
        if (li && typeof li.load === "function") {
          li.load("isNullObject");
          listItems.push({ para: p, li });
        }
      }
      await context.sync();

      const isListPara = new Map<Word.Paragraph, boolean>();
      for (const { para, li } of listItems) {
        isListPara.set(para, !li.isNullObject);
      }

      for (let i = 0; i < total; i += BATCH_SIZE) {
        const batch = paragraphs.items.slice(i, Math.min(i + BATCH_SIZE, total));

        for (const paragraph of batch) {
          const styleBuiltIn = paragraph.styleBuiltIn;
          const headingLevel = getHeadingLevel(styleBuiltIn);

          if (isCaption(styleBuiltIn)) {
            applyCaptionFormat(paragraph, preset.caption);
          } else if (headingLevel) {
            const headingPreset = getHeadingPreset(headingLevel, preset);
            applyHeadingFormat(paragraph, headingPreset);
          } else if (isListPara.get(paragraph)) {
            applyBulletFormat(paragraph, preset.bullet);
          } else if (!isHeading(styleBuiltIn)) {
            applyFontToRange(paragraph.getRange(), preset.body);
            applyParagraphFormat(paragraph, preset.paragraph);
          }
        }

        await context.sync();

        onProgress?.({
          current: Math.min(i + BATCH_SIZE, total),
          total,
          phase: "Formatage du texte...",
        });
      }

      onProgress?.({ current: total, total, phase: "Configuration de la page..." });
      const pageSetupResult = await applyPageSetup(context, preset.page);

      return {
        success: true,
        paragraphsFormatted: total,
        pageSetupResult,
      };
    });
  } catch (error) {
    const message = getErrorMessage(error);
    throw new FormattingError(`Erreur de formatage : ${message}`);
  }
}
