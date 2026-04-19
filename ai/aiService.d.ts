import { AIRequest, AIResponse, AIProvider } from "./types";
export declare function processAIRequest(request: AIRequest): Promise<AIResponse>;
export declare function testConnection(provider: AIProvider, apiKey: string, model: string): Promise<boolean>;
//# sourceMappingURL=aiService.d.ts.map