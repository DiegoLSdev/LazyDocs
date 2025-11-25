import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Beautiful and fun loading spinner with multiple animation options
 */
function LoadingSpinner({ variant = 'dots', className }) {
  if (variant === 'dots') {
    return (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  if (variant === 'spinner') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        <div className="flex gap-2">
          <div className="w-4 h-12 bg-primary rounded-full animate-pulse-height" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-12 bg-primary rounded-full animate-pulse-height" style={{ animationDelay: '150ms' }}></div>
          <div className="w-4 h-12 bg-primary rounded-full animate-pulse-height" style={{ animationDelay: '300ms' }}></div>
          <div className="w-4 h-12 bg-primary rounded-full animate-pulse-height" style={{ animationDelay: '450ms' }}></div>
        </div>
      </div>
    );
  }

  if (variant === 'orbit') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-primary rounded-full animate-orbit"></div>
          <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-primary/60 rounded-full animate-orbit-reverse"></div>
        </div>
      </div>
    );
  }

  // Default: book pages flip
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative w-20 h-16">
        {/* Book cover */}
        <div className="absolute inset-0 bg-primary/20 rounded-lg border-2 border-primary"></div>

        {/* Animated pages */}
        <div className="absolute left-4 top-2 w-12 h-12">
          <div className="absolute w-full h-full bg-primary/40 rounded-r origin-left animate-flip-page" style={{ animationDelay: '0ms' }}></div>
          <div className="absolute w-full h-full bg-primary/60 rounded-r origin-left animate-flip-page" style={{ animationDelay: '300ms' }}></div>
          <div className="absolute w-full h-full bg-primary/80 rounded-r origin-left animate-flip-page" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading documentation...</p>
    </div>
  );
}

export default LoadingSpinner;
