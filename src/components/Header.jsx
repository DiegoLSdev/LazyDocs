import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Search as SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "../contexts/LocaleContext";
import LanguageSelector from "./LanguageSelector";
import Search from "./Search";

function Header({ config, isDark, onToggleDarkMode, hideSearch = false }) {
  const { t } = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    if (hideSearch) return; // Don't listen for shortcuts if search is hidden
    
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hideSearch]);

  return (
    <header className="sticky top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="container mx-auto px-4 flex h-14 items-center gap-4">
        {/* Logo and Site Name */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {config?.logo && (
              <img
                src={config.logo[isDark ? "dark" : "light"]}
                alt={config.siteName}
                className="h-12 w-12 object-contain"
              />
            )}

            {config?.title && (
              <img
                src={config.title[isDark ? "dark" : "light"]}
                alt={config.siteName}
                className="h-14 object-contain"
              />
            )}
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-6">
            {config.navbar?.links?.map((link, index) =>
              link.to ? (
                <Link
                  key={index}
                  to={link.to}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Search Button - Only show if not hidden */}
          {!hideSearch && (
            <>
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "flex h-9 w-full max-w-[200px] items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2",
                  "text-sm text-muted-foreground transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "hidden md:flex"
                )}
              >
                <SearchIcon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">Search...</span>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="md:hidden"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>
            </>
          )}

          <LanguageSelector className="mr-2" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            aria-label={t("header.toggleTheme")}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Dialog - Only render if not hidden */}
      {!hideSearch && <Search open={searchOpen} onOpenChange={setSearchOpen} />}
    </header>
  );
}

export default Header;