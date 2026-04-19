import { AIRequest, AIResponse, AIProvider } from "./types";
import { callAnthropic, testAnthropicConnection } from "./anthropicClient";
import { callOpenAI, testOpenAIConnection } from "./openaiClient";
import { AIError } from "../utils/errors";

export async function processAIRequest(request: AIRequest): Promise<AIResponse> {
  if (!request.apiKey) {
    throw new AIError("Clé API manquante. Configurez-la dans les Réglages.", request.provider);
  }

  if (!request.text.trim()) {
    throw new AIError("Aucun texte sélectionné.", request.provider);
  }

  switch (request.provider) {
    case "anthropic":
      return callAnthropic(request);
    case "openai":
      return callOpenAI(request);
    default:
      throw new AIError(`Fournisseur IA inconnu : ${request.provider}`, request.provider);
  }
}

export async function testConnection(
  provider: AIProvider,
  apiKey: string,
  model: string
): Promise<boolean> {
  switch (provider) {
    case "anthropic":
      return testAnthropicConnection(apiKey, model);
    case "openai":
      return testOpenAIConnection(apiKey, model);
    default:
      return false;
  }
}
