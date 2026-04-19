import { AITask, AIResponse } from "../../ai/types";
export interface UseAIReturn {
    isProcessing: boolean;
    response: AIResponse | null;
    error: string | null;
    process: (text: string, task: AITask) => Promise<void>;
    clear: () => void;
}
export declare function useAI(): UseAIReturn;
//# sourceMappingURL=useAI.d.ts.map