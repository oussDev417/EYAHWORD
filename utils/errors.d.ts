export declare class EyahwordError extends Error {
    readonly code: string;
    readonly recoverable: boolean;
    constructor(message: string, code: string, recoverable?: boolean);
}
export declare class FormattingError extends EyahwordError {
    constructor(message: string);
}
export declare class AIError extends EyahwordError {
    readonly provider: string;
    constructor(message: string, provider: string);
}
export declare class PlatformError extends EyahwordError {
    constructor(message: string);
}
export declare function getErrorMessage(error: unknown): string;
//# sourceMappingURL=errors.d.ts.map