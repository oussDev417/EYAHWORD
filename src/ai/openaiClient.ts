import { AIRequest, AIResponse } from "./types";
import { getSystemPrompt } from "./prompts";
import { AIError } from "../utils/errors";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function callOpenAI(request: AIRequest): Promise<AIResponse> {
  const systemPrompt = getSystemPrompt(request.task);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.apiKey}`,
      },
      body: JSON.stringify({
        model: request.model,
        max_tokens: 4096,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: request.text },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new AIError(
        `Erreur OpenAI (${response.status}): ${errorBody}`,
        "openai"
      );
    }

    const data = await response.json();
    const resultText = data.choices?.[0]?.message?.content || "";

    return {
      result: resultText,
      provider: "openai",
      model: request.model,
      tokensUsed: data.usage?.total_tokens,
    };
  } catch (error) {
    if (error instanceof AIError) throw error;
    throw new AIError(`Erreur de connexion à OpenAI : ${String(error)}`, "openai");
  }
}

export async function testOpenAIConnection(apiKey: string, model: string): Promise<boolean> {
  try {
    await callOpenAI({
      text: "Say 'OK'.",
      task: "reformulate",
      provider: "openai",
      model,
      apiKey,
    });
    return true;
  } catch {
    return false;
  }
}
