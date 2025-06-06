'use client';

import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AlertProps {
  message: string;
  type: 'error' | 'success' | 'warning';
  onClose: () => void;
  show: boolean;
}

export default function Alert({ message, type, onClose, show }: AlertProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const alertStyles = {
    error: 'bg-red-50 border-red-500 text-red-700',
    success: 'bg-green-50 border-green-500 text-green-700',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 animate-fade-in-down`}>
      <div className={`rounded-lg border p-4 shadow-lg ${alertStyles[type]} flex items-center gap-3`}>
        <div className="flex-1">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 