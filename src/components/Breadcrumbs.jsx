import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Breadcrumbs component - Shows navigation path from home to current page
 */
function Breadcrumbs({ className }) {
  const location = useLocation();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname
      .split('/')
      .filter(segment => segment !== '');

    const breadcrumbs = [
      {
        label: 'Home',
        path: '/',
        icon: Home,
      },
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        path: currentPath,
        isLast: index === pathSegments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center space-x-1">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}

            {crumb.isLast ? (
              // Current page - not a link
              <span className="font-medium text-foreground" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              // Clickable breadcrumb
              <Link
                to={crumb.path}
                className="flex items-center hover:text-foreground transition-colors"
              >
                {crumb.icon && <crumb.icon className="h-4 w-4 mr-1" />}
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
