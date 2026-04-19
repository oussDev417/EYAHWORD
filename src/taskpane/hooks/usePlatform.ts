import { useState, useEffect } from "react";
import { Platform, detectPlatform, supportsPageSetup } from "../../engine/platformUtils";

export interface UsePlatformReturn {
  platform: Platform;
  isDesktop: boolean;
  canSetMargins: boolean;
}

export function usePlatform(): UsePlatformReturn {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return {
    platform,
    isDesktop: platform === "desktop",
    canSetMargins: supportsPageSetup(),
  };
}
