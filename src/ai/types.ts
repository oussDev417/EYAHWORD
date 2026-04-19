export type AIProvider = "anthropic" | "openai";

export type AITask =
  | "reformulate"
  | "correct"
  | "summarize"
  | "expand"
  | "simplify"
  | "formalize"
  | "translate";

export interface AITaskInfo {
  id: AITask;
  label: string;
  description: string;
}

export const AI_TASKS: AITaskInfo[] = [
  { id: "reformulate", label: "Reformuler", description: "Réécrire le texte différemment en gardant le même sens" },
  { id: "correct", label: "Corriger", description: "Corriger les fautes d'orthographe et de grammaire" },
  { id: "summarize", label: "Résumer", description: "Produire un résumé concis du texte" },
  { id: "expand", label: "Développer", description: "Développer et enrichir le texte" },
  { id: "simplify", label: "Simplifier", description: "Simplifier le vocabulaire et la syntaxe" },
  { id: "formalize", label: "Formaliser", description: "Rendre le texte plus formel et professionnel" },
  { id: "translate", label: "Traduire (EN↔FR)", description: "Traduire le texte entre français et anglais" },
];

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

export const ANTHROPIC_MODELS: AIModel[] = [
  { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", provider: "anthropic" },
  { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", provider: "anthropic" },
];

export const OPENAI_MODELS: AIModel[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "openai" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "openai" },
];
