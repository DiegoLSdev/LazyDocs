import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, FileText, Hash, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { cn } from '@/lib/utils';
import searchIndex from '../utils/search-index';

function Search({ open, onOpenChange }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isIndexing, setIsIndexing] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Build search index on mount
  useEffect(() => {
    const buildIndex = async () => {
      setIsIndexing(true);
      await searchIndex.buildIndex();
      setIsIndexing(false);
    };

    buildIndex();
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const searchResults = searchIndex.search(query);
      setResults(searchResults.slice(0, 10)); // Limit to top 10 results
      setSelectedIndex(0);
      setIsSearching(false);
    }, 150); // 150ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;

        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            navigateToResult(results[selectedIndex]);
          }
          break;

        case 'Escape':
          e.preventDefault();
          onOpenChange(false);
          break;

        default:
          break;
      }
    },
    [open, results, selectedIndex, onOpenChange]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  // Navigate to selected result
  const navigateToResult = (result) => {
    navigate(result.url);
    onOpenChange(false);
    setQuery('');
    setResults([]);
  };

  // Highlight matched text
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary font-medium rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Group results by section
  const groupedResults = results.reduce((acc, result) => {
    const section = result.section || 'Other';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(result);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Accessible title and description for screen readers */}
        <DialogTitle className="sr-only">Search Documentation</DialogTitle>
        <DialogDescription className="sr-only">
          Search through all documentation pages. Use arrow keys to navigate results and Enter to select.
        </DialogDescription>

        {/* Search Input */}
        <div className="flex items-center border-b px-4 py-3">
          {isSearching ? (
            <Loader2 className="h-5 w-5 text-muted-foreground animate-spin mr-3" />
          ) : (
            <SearchIcon className="h-5 w-5 text-muted-foreground mr-3" />
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder={isIndexing ? 'Indexing documentation...' : 'Search documentation...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isIndexing}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <kbd className="">
            
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
          {isIndexing ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
              <p className="text-sm text-muted-foreground">Building search index...</p>
            </div>
          ) : query.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <SearchIcon className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Search Documentation</p>
              <p className="text-xs text-muted-foreground">
                Type to search across all pages, headings, and content
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <kbd className="px-2 py-1 bg-muted rounded">↑↓</kbd>
                <span>Navigate</span>
                <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd>
                <span>Select</span>
              </div>
            </div>
          ) : query.length < 2 ? (
            <div className="py-12 text-center px-4">
              <p className="text-sm text-muted-foreground">
                Type at least 2 characters to search
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center px-4">
              <p className="text-sm font-medium text-foreground mb-1">No results found</p>
              <p className="text-xs text-muted-foreground">
                Try different keywords or check for typos
              </p>
            </div>
          ) : (
            <div ref={resultsRef} className="py-2">
              {Object.entries(groupedResults).map(([section, sectionResults], sectionIdx) => (
                <div key={section}>
                  {/* Section Header */}
                  <div className="px-4 py-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section}
                    </h3>
                  </div>

                  {/* Section Results */}
                  {sectionResults.map((result, resultIdx) => {
                    const globalIndex = results.findIndex((r) => r === result);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={result.url}
                        onClick={() => navigateToResult(result)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          'w-full text-left px-4 py-3 transition-colors',
                          'flex items-start gap-3 group',
                          isSelected
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        )}
                      >
                        {/* Icon */}
                        <div className="mt-0.5 shrink-0">
                          <FileText className={cn(
                            'h-4 w-4',
                            isSelected ? 'text-primary' : 'text-muted-foreground'
                          )} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <div className="font-medium text-sm text-foreground mb-0.5 truncate">
                            {highlightText(result.title, query)}
                          </div>

                          {/* Description or Snippet */}
                          {(result.description || result.snippet) && (
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {highlightText(result.description || result.snippet, query)}
                            </div>
                          )}

                          {/* Matched Headings */}
                          {result.matches?.some(m => m.key === 'headings.text') && (() => {
                            const matchedHeadings = result.headings
                              .filter(h =>
                                h.text.toLowerCase().includes(query.toLowerCase())
                              )
                              .slice(0, 2)
                              .map(h => highlightText(h.text, query));

                            if (matchedHeadings.length === 0) return null;

                            return (
                              <div className="flex items-center gap-1 mt-1">
                                <Hash className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {matchedHeadings.reduce((prev, curr, idx) => [
                                    prev,
                                    idx > 0 && <span key={idx} className="mx-1">·</span>,
                                    curr
                                  ])}
                                </span>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Keyboard Hint */}
                        {isSelected && (
                          <div className="shrink-0 hidden sm:flex items-center">
                            <kbd className="px-2 py-1 bg-background border rounded text-xs text-muted-foreground">
                              ↵
                            </kbd>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground bg-muted/30">
            <div>
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background border rounded">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background border rounded">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background border rounded">ESC</kbd>
                Close
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Search;
