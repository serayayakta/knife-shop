// ConfirmDialog.tsx
import { ReactNode } from "react";

export interface ConfirmDialogProps {
  children: ReactNode;
  open?: boolean;
  onClose: () => void;
}

export default function ConfirmDialog({
  open = false,
  onClose,
  children,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 shadow-md min-w-[300px] max-w-sm">
        {children}
        <button
          onClick={onClose}
          className="mt-4 block w-full text-sm text-gray-500 hover:text-gray-700 text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
