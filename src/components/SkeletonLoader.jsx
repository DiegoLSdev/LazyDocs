import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Skeleton loader for documentation content
 */
function SkeletonLoader({ className }) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6 animate-pulse", className)}>
      {/* Breadcrumbs skeleton */}
      <div className="flex gap-2 items-center">
        <div className="h-4 w-12 bg-muted rounded"></div>
        <div className="h-4 w-4 bg-muted rounded"></div>
        <div className="h-4 w-20 bg-muted rounded"></div>
        <div className="h-4 w-4 bg-muted rounded"></div>
        <div className="h-4 w-32 bg-muted rounded"></div>
      </div>

      {/* Title skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-10 bg-muted rounded-md w-3/4"></div>
        <div className="h-6 bg-muted/70 rounded-md w-full"></div>
      </div>

      {/* Content paragraphs skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>

      {/* Heading skeleton */}
      <div className="h-8 bg-muted rounded-md w-2/3 mt-8"></div>

      {/* More content */}
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>

      {/* Code block skeleton */}
      <div className="h-32 bg-muted rounded-lg mt-6"></div>

      {/* More paragraphs */}
      <div className="space-y-4 mt-6">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>

      {/* Another heading */}
      <div className="h-8 bg-muted rounded-md w-1/2 mt-8"></div>

      {/* List items skeleton */}
      <div className="space-y-3 mt-4">
        <div className="flex items-start gap-2">
          <div className="h-2 w-2 bg-muted rounded-full mt-2"></div>
          <div className="h-4 bg-muted rounded flex-1"></div>
        </div>
        <div className="flex items-start gap-2">
          <div className="h-2 w-2 bg-muted rounded-full mt-2"></div>
          <div className="h-4 bg-muted rounded flex-1"></div>
        </div>
        <div className="flex items-start gap-2">
          <div className="h-2 w-2 bg-muted rounded-full mt-2"></div>
          <div className="h-4 bg-muted rounded flex-1"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
