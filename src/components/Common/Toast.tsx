import React from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types/palette';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-3 rounded-[10px] shadow-elevated border transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
              isError
                ? 'bg-[#401C17] text-[#F7F4ED] border-[#73352B]'
                : isInfo
                ? 'bg-[#263A35] text-[#F7F4ED] border-[#375049]'
                : 'bg-[#263A35] text-[#F7F4ED] border-[#375049]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isError ? (
                <div className="w-5 h-5 rounded-full bg-[#D16C50] text-[#FFFFFF] flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3 h-3" />
                </div>
              ) : isInfo ? (
                <div className="w-5 h-5 rounded-full bg-[#3D564F] text-[#DCE5D8] flex items-center justify-center shrink-0">
                  <Info className="w-3 h-3" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#DCE5D8] text-[#263A35] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
              )}
              <span className="text-xs font-medium leading-tight truncate text-[#F7F4ED]">
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-[4px] text-[#9BB0A8] hover:text-[#F7F4ED] hover:bg-white/10 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
