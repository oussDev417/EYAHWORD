import { AIProvider } from "../../ai/types";
export interface AppSettings {
    aiProvider: AIProvider;
    anthropicApiKey: string;
    anthropicModel: string;
    openaiApiKey: string;
    openaiModel: string;
}
export interface UseSettingsReturn {
    settings: AppSettings;
    updateSettings: (partial: Partial<AppSettings>) => void;
    currentApiKey: string;
    currentModel: string;
}
export declare function useSettings(): UseSettingsReturn;
//# sourceMappingURL=useSettings.d.ts.map