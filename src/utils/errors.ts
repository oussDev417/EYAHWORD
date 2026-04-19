export class EyahwordError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly recoverable: boolean = true
  ) {
    super(message);
    this.name = "EyahwordError";
  }
}

export class FormattingError extends EyahwordError {
  constructor(message: string) {
    super(message, "FORMATTING_ERROR");
  }
}

export class AIError extends EyahwordError {
  constructor(message: string, public readonly provider: string) {
    super(message, "AI_ERROR");
  }
}

export class PlatformError extends EyahwordError {
  constructor(message: string) {
    super(message, "PLATFORM_ERROR", false);
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof EyahwordError) return error.message;
  if (error instanceof Error) return error.message;
  return String(error);
}
