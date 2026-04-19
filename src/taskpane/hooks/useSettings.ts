import { useState, useCallback, useEffect } from "react";
import { AIProvider, ANTHROPIC_MODELS, OPENAI_MODELS } from "../../ai/types";
import { STORAGE_KEYS } from "../../utils/constants";

export interface AppSettings {
  aiProvider: AIProvider;
  anthropicApiKey: string;
  anthropicModel: string;
  openaiApiKey: string;
  openaiModel: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  aiProvider: "anthropic",
  anthropicApiKey: "",
  anthropicModel: ANTHROPIC_MODELS[0].id,
  openaiApiKey: "",
  openaiModel: OPENAI_MODELS[0].id,
};

function loadSettings(): AppSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettingsToStorage(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export interface UseSettingsReturn {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  currentApiKey: string;
  currentModel: string;
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettingsToStorage(next);
      return next;
    });
  }, []);

  const currentApiKey = settings.aiProvider === "anthropic"
    ? settings.anthropicApiKey
    : settings.openaiApiKey;

  const currentModel = settings.aiProvider === "anthropic"
    ? settings.anthropicModel
    : settings.openaiModel;

  return { settings, updateSettings, currentApiKey, currentModel };
}
