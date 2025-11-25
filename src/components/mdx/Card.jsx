import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * Card component for highlighting features or creating call-to-actions
 *
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description
 * @param {string} props.icon - Icon component
 * @param {string} props.href - Internal link (uses React Router)
 * @param {string} props.link - External link
 * @param {boolean} props.featured - Makes card stand out
 * @param {React.ReactNode} props.children - Card content
 */
function Card({
  title,
  description,
  icon: Icon,
  href,
  link,
  featured = false,
  className,
  children
}) {
  const isExternal = !!link;
  const hasLink = href || link;

  const CardContent = () => (
    <div className={cn(
      'group relative rounded-lg border bg-card p-6 transition-all hover:shadow-md',
      featured && 'border-primary bg-primary/5',
      hasLink && 'cursor-pointer hover:border-primary',
      className
    )}>
      {/* Icon */}
      {Icon && (
        <div className={cn(
          'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg',
          featured ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}>
          <Icon className="h-6 w-6" />
        </div>
      )}

      {/* Title */}
      {title && (
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {title}
        </h3>
      )}

      {/* Description or children */}
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {children && (
        <div className="text-sm text-muted-foreground leading-relaxed [&>p]:my-2">
          {children}
        </div>
      )}

      {/* Link indicator */}
      {hasLink && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          {isExternal ? (
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </div>
      )}
    </div>
  );

  // Render with appropriate link wrapper
  if (href) {
    return (
      <Link to={href}>
        <CardContent />
      </Link>
    );
  }

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
}

/**
 * CardGrid component for laying out multiple cards
 */
function CardGrid({ children, cols = 3, className }) {
  return (
    <div className={cn(
      'grid gap-4 my-6',
      cols === 2 && 'md:grid-cols-2',
      cols === 3 && 'md:grid-cols-2 lg:grid-cols-3',
      cols === 4 && 'md:grid-cols-2 lg:grid-cols-4',
      className
    )}>
      {children}
    </div>
  );
}

export { Card, CardGrid };
