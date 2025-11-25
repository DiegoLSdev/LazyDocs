import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateSidebarStructure } from '../utils/sidebar';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

function Sidebar({ isOpen, docsPath }) {
  const [structure, setStructure] = useState([]);
  const location = useLocation();

  useEffect(() => {
    generateSidebarStructure(docsPath).then(setStructure);
  }, [docsPath]);

  const renderItem = (item, level = 0) => {
    if (item.type === 'folder') {
      return (
        <div key={item.path} className="mb-2">
          <div
            className="py-1.5 px-3 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default [&]:bg-transparent [&]:hover:bg-transparent"
            style={{
              paddingLeft: `${level * 0.75 + 0.75}rem`,
              backgroundColor: 'transparent !important'
            }}
          >
            {item.title}
          </div>
          <div className="mt-1">
            {item.children.map(child => renderItem(child, level + 1))}
          </div>
        </div>
      );
    } else {
      const isActive = location.pathname === item.path;
      return (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "block py-1.5 px-3 text-sm transition-colors text-muted-foreground hover:text-primary [&]:bg-transparent [&]:hover:bg-transparent",
            isActive && "text-primary font-medium"
          )}
          style={{
            paddingLeft: `${level * 0.75 + 2.25}rem`,
            backgroundColor: 'transparent !important'
          }}
        >
          {item.title}
        </Link>
      );
    }
  };

  return (
    <aside
      className={cn(
        // Mobile: fixed sidebar que se desliza desde la izquierda con sombra
        "fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-[280px] shrink-0 border-r bg-background transition-transform duration-300 ease-in-out shadow-lg",
        // Desktop: sticky sidebar normal sin sombra
        "md:sticky md:translate-x-0 md:shadow-none",
        // Toggle visibility
        !isOpen && "-translate-x-full md:hidden"
      )}
    >
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <div className="space-y-1 px-2">
          {structure.map(item => renderItem(item))}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default Sidebar;
