import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

/**
 * PageNavigation component - Shows previous and next page links
 */
function PageNavigation({ structure, className }) {
  const location = useLocation();
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    if (!structure || structure.length === 0) return;

    // Flatten the structure to get all pages in order
    const flattenStructure = (items) => {
      const result = [];
      items.forEach(item => {
        if (item.type === 'file') {
          result.push(item);
        }
        if (item.type === 'folder' && item.children) {
          result.push(...flattenStructure(item.children));
        }
      });
      return result;
    };

    const allPages = flattenStructure(structure);
    const currentIndex = allPages.findIndex(page => page.path === location.pathname);

    if (currentIndex !== -1) {
      setPrevPage(currentIndex > 0 ? allPages[currentIndex - 1] : null);
      setNextPage(currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null);
    }
  }, [location.pathname, structure]);

  // Don't render if no prev/next pages
  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <nav
      className={cn(
        'mt-8 pt-8 border-t flex items-center justify-between gap-4',
        className
      )}
      aria-label="Page navigation"
    >
      {/* Previous Page */}
      <div className="flex-1">
        {prevPage && (
          <Link to={prevPage.path} className="group block">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </div>
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">
              {prevPage.title}
            </div>
          </Link>
        )}
      </div>

      {/* Next Page */}
      <div className="flex-1 text-right">
        {nextPage && (
          <Link to={nextPage.path} className="group block">
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </div>
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">
              {nextPage.title}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

/**
 * Compact PageNavigation buttons (for mobile or compact layouts)
 */
export function PageNavigationCompact({ structure, className }) {
  const location = useLocation();
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    if (!structure || structure.length === 0) return;

    const flattenStructure = (items) => {
      const result = [];
      items.forEach(item => {
        if (item.type === 'file') {
          result.push(item);
        }
        if (item.type === 'folder' && item.children) {
          result.push(...flattenStructure(item.children));
        }
      });
      return result;
    };

    const allPages = flattenStructure(structure);
    const currentIndex = allPages.findIndex(page => page.path === location.pathname);

    if (currentIndex !== -1) {
      setPrevPage(currentIndex > 0 ? allPages[currentIndex - 1] : null);
      setNextPage(currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null);
    }
  }, [location.pathname, structure]);

  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {prevPage ? (
        <Button variant="outline" size="sm" asChild>
          <Link to={prevPage.path}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextPage && (
        <Button variant="default" size="sm" asChild className="ml-auto">
          <Link to={nextPage.path}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export default PageNavigation;
