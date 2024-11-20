import { useEffect } from 'react';

export interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ show, message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-300 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}