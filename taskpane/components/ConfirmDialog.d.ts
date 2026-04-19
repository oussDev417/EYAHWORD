import React from "react";
interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export {};
//# sourceMappingURL=ConfirmDialog.d.ts.map