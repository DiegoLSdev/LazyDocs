import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import { useLocale } from '../contexts/LocaleContext';

function TableOfContents({ content }) {
  const { t } = useLocale();
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extraer headers del contenido markdown
    const extractHeadings = () => {
      const headingRegex = /^(#{1,3})\s+(.+)$/gm;
      const matches = [];
      const idCounts = {}; // Track duplicate IDs
      let match;

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        let id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Make IDs unique by appending a counter if duplicate
        if (idCounts[id] !== undefined) {
          idCounts[id]++;
          id = `${id}-${idCounts[id]}`;
        } else {
          idCounts[id] = 0;
        }

        matches.push({ level, text, id });
      }

      setHeadings(matches);
    };

    if (content) {
      extractHeadings();
    }
  }, [content]);

  useEffect(() => {
    // Observar qué header está visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0,
      }
    );

    // Observar todos los headers en el documento
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Altura del header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden p-6 xl:block w-60 shrink-0 mr-[50px]">
      <div className="py-10 sticky top-20 h-[calc(100vh-5rem)]">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground">{t('toc.title')}</h4>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="space-y-1">
            {headings.map(({ level, text, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={cn(
                  "block py-1 text-sm transition-colors hover:text-foreground",
                  activeId === id
                    ? "text-primary font-medium border-l-2 border-primary pl-3"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3",
                  level === 2 && "ml-0",
                  level === 3 && "ml-4"
                )}
              >
                {text}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}

export default TableOfContents;
