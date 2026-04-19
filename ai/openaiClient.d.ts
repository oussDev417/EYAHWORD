import { AIRequest, AIResponse } from "./types";
export declare function callOpenAI(request: AIRequest): Promise<AIResponse>;
export declare function testOpenAIConnection(apiKey: string, model: string): Promise<boolean>;
//# sourceMappingURL=openaiClient.d.ts.map