import { useEffect } from 'react';

interface FlashMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info' | string;
  onClose: () => void;
}

export default function FlashMessage({ message, type = 'info', onClose }: FlashMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-20 right-5 z-50 px-6 py-3 text-white rounded-md shadow-lg transition-transform transform animate-slide-in 
      ${type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}
    >
      {message}
    </div>
  );
}
