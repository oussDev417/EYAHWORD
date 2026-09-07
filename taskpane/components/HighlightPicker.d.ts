import React from "react";
/** Word maps arbitrary values onto its fixed highlighter palette, so offer only those. */
export declare const HIGHLIGHT_COLORS: Array<{
    label: string;
    value: string;
}>;
interface HighlightPickerProps {
    value: string;
    onChange: (value: string) => void;
}
export declare const HighlightPicker: React.FC<HighlightPickerProps>;
export {};
//# sourceMappingURL=HighlightPicker.d.ts.map