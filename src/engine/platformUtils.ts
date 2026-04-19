/* global Office */

export type Platform = "desktop" | "web" | "unknown";

export function detectPlatform(): Platform {
  if (typeof Office === "undefined" || !Office.context) return "unknown";

  const platform = Office.context.platform;
  if (
    platform === Office.PlatformType.PC ||
    platform === Office.PlatformType.Mac
  ) {
    return "desktop";
  }

  return "web";
}

export function supportsPageSetup(): boolean {
  return detectPlatform() === "desktop";
}

export function supportsDesktopApi(requirementSet: string, version: string): boolean {
  try {
    return Office.context.requirements.isSetSupported(requirementSet, version);
  } catch {
    return false;
  }
}
