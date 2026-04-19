import { AIRequest, AIResponse } from "./types";
import { getSystemPrompt } from "./prompts";
import { AIError } from "../utils/errors";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export async function callAnthropic(request: AIRequest): Promise<AIResponse> {
  const systemPrompt = getSystemPrompt(request.task);

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": request.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: request.model,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: request.text,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new AIError(
        `Erreur Anthropic (${response.status}): ${errorBody}`,
        "anthropic"
      );
    }

    const data = await response.json();

    const resultText = data.content
      ?.filter((block: any) => block.type === "text")
      .map((block: any) => block.text)
      .join("") || "";

    return {
      result: resultText,
      provider: "anthropic",
      model: request.model,
      tokensUsed: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
    };
  } catch (error) {
    if (error instanceof AIError) throw error;
    throw new AIError(`Erreur de connexion à Anthropic : ${String(error)}`, "anthropic");
  }
}

export async function testAnthropicConnection(apiKey: string, model: string): Promise<boolean> {
  try {
    await callAnthropic({
      text: "Dis 'OK'.",
      task: "reformulate",
      provider: "anthropic",
      model,
      apiKey,
    });
    return true;
  } catch {
    return false;
  }
}
