import { PagePreset } from "../presets/types";
import { supportsPageSetup } from "./platformUtils";

export interface PageSetupResult {
  applied: boolean;
  message?: string;
}

export async function applyPageSetup(
  context: Word.RequestContext,
  page: PagePreset
): Promise<PageSetupResult> {
  if (!supportsPageSetup()) {
    return {
      applied: false,
      message: "Les marges ne peuvent être modifiées que sur Word Desktop (Windows/Mac).",
    };
  }

  try {
    const body = context.document.body;
    const sections = context.document.sections;
    sections.load("items");
    await context.sync();

    for (const section of sections.items) {
      section.load("body");
      await context.sync();

      const pageSetup = (section as any).page;
      if (pageSetup) {
        pageSetup.topMargin = page.topMargin;
        pageSetup.bottomMargin = page.bottomMargin;
        pageSetup.leftMargin = page.leftMargin;
        pageSetup.rightMargin = page.rightMargin;
      }
    }

    await context.sync();
    return { applied: true };
  } catch {
    return {
      applied: false,
      message: "Impossible d'appliquer les marges. Fonctionnalité réservée à Word Desktop.",
    };
  }
}
