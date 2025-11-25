import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Steps component for displaying sequential instructions
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Step components
 */
function Steps({ children, className }) {
  const steps = React.Children.toArray(children);

  return (
    <div className={cn('my-6 space-y-0', className)}>
      {steps.map((step, index) => (
        <div key={index} className="relative">
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-10 h-full w-0.5 bg-border" />
          )}

          {/* Step content with number */}
          <div className="flex gap-4">
            {/* Step number */}
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
              <span className="text-sm font-semibold text-primary">
                {index + 1}
              </span>
            </div>

            {/* Step content */}
            <div className="flex-1 pb-8">
              {step}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Step component - individual step in a sequence
 *
 * @param {Object} props
 * @param {string} props.title - Step title
 * @param {React.ReactNode} props.children - Step content
 */
function Step({ title, children, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-foreground">
          {title}
        </h3>
      )}
      <div className="text-sm text-muted-foreground leading-relaxed [&>p]:my-2 [&>p:first-child]:mt-0">
        {children}
      </div>
    </div>
  );
}

export { Steps, Step };
