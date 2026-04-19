import { useState, useCallback } from "react";
import { AITask, AIResponse } from "../../ai/types";
import { processAIRequest } from "../../ai/aiService";
import { useSettingsContext } from "../context/SettingsContext";
import { getErrorMessage } from "../../utils/errors";

export interface UseAIReturn {
  isProcessing: boolean;
  response: AIResponse | null;
  error: string | null;
  process: (text: string, task: AITask) => Promise<void>;
  clear: () => void;
}

export function useAI(): UseAIReturn {
  const { settings, currentApiKey, currentModel } = useSettingsContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const process = useCallback(
    async (text: string, task: AITask) => {
      setIsProcessing(true);
      setResponse(null);
      setError(null);

      try {
        const result = await processAIRequest({
          text,
          task,
          provider: settings.aiProvider,
          model: currentModel,
          apiKey: currentApiKey,
        });
        setResponse(result);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsProcessing(false);
      }
    },
    [settings.aiProvider, currentModel, currentApiKey]
  );

  const clear = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return { isProcessing, response, error, process, clear };
}
