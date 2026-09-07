import { useState, useCallback } from "react";
import { TablePreset } from "../../presets/tableTypes";
import { applyTablePreset, TableFormatResult } from "../../engine/tableFormatter";
import { getErrorMessage } from "../../utils/errors";

export interface UseTableFormattingReturn {
  isFormatting: boolean;
  result: TableFormatResult | null;
  error: string | null;
  format: (preset: TablePreset) => Promise<void>;
}

export function useTableFormatting(): UseTableFormattingReturn {
  const [isFormatting, setIsFormatting] = useState(false);
  const [result, setResult] = useState<TableFormatResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const format = useCallback(async (preset: TablePreset) => {
    setIsFormatting(true);
    setResult(null);
    setError(null);

    try {
      const r = await applyTablePreset(preset);
      setResult(r);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsFormatting(false);
    }
  }, []);

  return { isFormatting, result, error, format };
}
