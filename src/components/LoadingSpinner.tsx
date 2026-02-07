import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  /** Full-page centered spinner */
  fullPage?: boolean;
  /** Message below the spinner */
  message?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function LoadingSpinner({ fullPage = false, message, size = 'md' }: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeMap[size]} text-[#6E5B6A] animate-spin`} />
      {message && (
        <p className="text-sm text-[#9AACB6]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-[#F1F2F4] flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/** Full-page loading fallback for React.lazy / Suspense */
export function PageLoadingFallback() {
  return <LoadingSpinner fullPage message="Loading..." size="lg" />;
}
