import { useState, useCallback } from "react";
import { FormattingPreset } from "../../presets/types";
import { applyPreset, FormatProgress, FormatResult } from "../../engine/formatting";
import { getErrorMessage } from "../../utils/errors";

export interface UseWordFormattingReturn {
  isFormatting: boolean;
  progress: FormatProgress | null;
  result: FormatResult | null;
  error: string | null;
  format: (preset: FormattingPreset) => Promise<void>;
}

export function useWordFormatting(): UseWordFormattingReturn {
  const [isFormatting, setIsFormatting] = useState(false);
  const [progress, setProgress] = useState<FormatProgress | null>(null);
  const [result, setResult] = useState<FormatResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const format = useCallback(async (preset: FormattingPreset) => {
    setIsFormatting(true);
    setProgress(null);
    setResult(null);
    setError(null);

    try {
      const formatResult = await applyPreset(preset, (p) => setProgress(p));
      setResult(formatResult);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsFormatting(false);
    }
  }, []);

  return { isFormatting, progress, result, error, format };
}
