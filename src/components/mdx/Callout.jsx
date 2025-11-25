import React from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Callout component for highlighting important information
 *
 * @param {Object} props
 * @param {'info'|'warning'|'error'|'success'|'tip'} props.type - Type of callout
 * @param {string} props.title - Optional title
 * @param {React.ReactNode} props.children - Content
 */
function Callout({ type = 'info', title, children, className }) {
  const config = {
    info: {
      icon: Info,
      className: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-100',
      iconClassName: 'text-blue-600 dark:text-blue-400',
      defaultTitle: 'Info',
    },
    warning: {
      icon: AlertTriangle,
      className: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/30 dark:border-yellow-900 dark:text-yellow-100',
      iconClassName: 'text-yellow-600 dark:text-yellow-400',
      defaultTitle: 'Warning',
    },
    error: {
      icon: AlertCircle,
      className: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-900 dark:text-red-100',
      iconClassName: 'text-red-600 dark:text-red-400',
      defaultTitle: 'Error',
    },
    success: {
      icon: CheckCircle,
      className: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-900 dark:text-green-100',
      iconClassName: 'text-green-600 dark:text-green-400',
      defaultTitle: 'Success',
    },
    tip: {
      icon: Lightbulb,
      className: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/30 dark:border-purple-900 dark:text-purple-100',
      iconClassName: 'text-purple-600 dark:text-purple-400',
      defaultTitle: 'Tip',
    },
  };

  const { icon: Icon, className: typeClassName, iconClassName, defaultTitle } = config[type] || config.info;

  return (
    <div className={cn(
      'my-6 rounded-lg border-l-4 p-4',
      typeClassName,
      className
    )}>
      <div className="flex gap-3">
        <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconClassName)} />
        <div className="flex-1 space-y-2">
          {(title || defaultTitle) && (
            <div className="font-semibold">
              {title || defaultTitle}
            </div>
          )}
          <div className="text-sm leading-relaxed [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Callout;
