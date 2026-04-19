export type AIProvider = "anthropic" | "openai";
export type AITask = "reformulate" | "correct" | "summarize" | "expand" | "simplify" | "formalize" | "translate";
export interface AITaskInfo {
    id: AITask;
    label: string;
    description: string;
}
export declare const AI_TASKS: AITaskInfo[];
export interface AIRequest {
    text: string;
    task: AITask;
    provider: AIProvider;
    model: string;
    apiKey: string;
}
export interface AIResponse {
    result: string;
    provider: AIProvider;
    model: string;
    tokensUsed?: number;
}
export interface AIModel {
    id: string;
    name: string;
    provider: AIProvider;
}
export declare const ANTHROPIC_MODELS: AIModel[];
export declare const OPENAI_MODELS: AIModel[];
//# sourceMappingURL=types.d.ts.map