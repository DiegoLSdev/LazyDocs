import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateSidebarStructure } from '../utils/sidebar';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

function AppSidebar({ docsPath, config }) {
  const [structure, setStructure] = useState([]);
  const location = useLocation();

  useEffect(() => {
    generateSidebarStructure(docsPath).then(setStructure);
  }, [docsPath]);

  const renderItem = (item) => {
    if (item.type === 'folder') {
      return (
          <SidebarMenuItem key={item.path}>
            <div className="px-2 py-1.5">
            <span className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
              {item.title}
            </span>
            </div>
            {item.children && item.children.length > 0 && (
                <SidebarMenuSub className="border-l border-border ml-3 pl-3">
                  {item.children.map(child => renderSubItem(child))}
                </SidebarMenuSub>
            )}
          </SidebarMenuItem>
      );
    }

    const isActive = location.pathname === item.path;
    return (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                  "hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent",
                  "hover:text-primary data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
          >
            <Link to={item.path}>
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
    );
  };

  const renderSubItem = (item) => {
    if (item.type === 'folder') {
      return (
          <div key={item.path} className="relative">
            <SidebarMenuSubItem>
              <div className="px-2 py-1.5">
              <span className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
                {item.title}
              </span>
              </div>
            </SidebarMenuSubItem>
            {item.children && item.children.length > 0 && (
                <div className="border-l border-border ml-3 pl-3">
                  {item.children.map(child => renderSubItem(child))}
                </div>
            )}
          </div>
      );
    }

    const isActive = location.pathname === item.path;
    return (
        <SidebarMenuSubItem key={item.path}>
          <SidebarMenuSubButton
              asChild
              isActive={isActive}
              className={cn(
                  "hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent",
                  "hover:text-primary data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
          >
            <Link to={item.path}>
              <span>{item.title}</span>
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
  };

  return (
      <div className="py-10 sticky top-16 h-[calc(100vh-4rem)] pl-6 ml-[50px] hidden lg:block"> {/* Añadido hidden lg:block */}
        <Sidebar
            collapsible="none"
            variant="sidebar"
            className="h-full flex flex-col"
        >
          {/* Content con ScrollArea */}
          <SidebarContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {structure.map(item => renderItem(item))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>
      </div>
  );
}

export default AppSidebar;