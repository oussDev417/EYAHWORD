import { processAIRequest } from "../src/ai/aiService";
import { AIRequest } from "../src/ai/types";

// Mock fetch globally
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

describe("aiService", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("throws when API key is missing", async () => {
    const request: AIRequest = {
      text: "Hello",
      task: "reformulate",
      provider: "anthropic",
      model: "claude-sonnet-4-20250514",
      apiKey: "",
    };

    await expect(processAIRequest(request)).rejects.toThrow("Clé API manquante");
  });

  it("throws when text is empty", async () => {
    const request: AIRequest = {
      text: "   ",
      task: "reformulate",
      provider: "anthropic",
      model: "claude-sonnet-4-20250514",
      apiKey: "sk-test",
    };

    await expect(processAIRequest(request)).rejects.toThrow("Aucun texte sélectionné");
  });

  it("calls Anthropic API correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        content: [{ type: "text", text: "Reformulated text" }],
        usage: { input_tokens: 10, output_tokens: 5 },
      }),
    });

    const request: AIRequest = {
      text: "Hello world",
      task: "reformulate",
      provider: "anthropic",
      model: "claude-sonnet-4-20250514",
      apiKey: "sk-test",
    };

    const result = await processAIRequest(request);
    expect(result.result).toBe("Reformulated text");
    expect(result.provider).toBe("anthropic");
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain("anthropic.com");
    expect(options.headers["anthropic-dangerous-direct-browser-access"]).toBe("true");
  });

  it("calls OpenAI API correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "Reformulated text" } }],
        usage: { total_tokens: 15 },
      }),
    });

    const request: AIRequest = {
      text: "Hello world",
      task: "correct",
      provider: "openai",
      model: "gpt-4o",
      apiKey: "sk-test",
    };

    const result = await processAIRequest(request);
    expect(result.result).toBe("Reformulated text");
    expect(result.provider).toBe("openai");
  });

  it("handles API errors from Anthropic", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => "Unauthorized",
    });

    const request: AIRequest = {
      text: "Hello",
      task: "reformulate",
      provider: "anthropic",
      model: "claude-sonnet-4-20250514",
      apiKey: "bad-key",
    };

    await expect(processAIRequest(request)).rejects.toThrow("Erreur Anthropic");
  });
});
