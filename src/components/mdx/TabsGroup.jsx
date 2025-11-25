import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

/**
 * TabsGroup component for MDX - container for multiple tabs
 *
 * @param {Object} props
 * @param {string} props.defaultValue - Default active tab
 * @param {React.ReactNode} props.children - Tab and TabPanel components
 */
function TabsGroup({ defaultValue, children, className }) {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      {children}
    </Tabs>
  );
}

/**
 * TabList component - contains Tab triggers
 */
function TabList({ children, className }) {
  return (
    <TabsList className={className}>
      {children}
    </TabsList>
  );
}

/**
 * Tab component - individual tab trigger
 *
 * @param {Object} props
 * @param {string} props.value - Unique identifier for this tab
 * @param {string} props.label - Display text
 */
function Tab({ value, label, children }) {
  return (
    <TabsTrigger value={value}>
      {label || children}
    </TabsTrigger>
  );
}

/**
 * TabPanel component - content for each tab
 *
 * @param {Object} props
 * @param {string} props.value - Matches the tab value
 * @param {React.ReactNode} props.children - Content to display
 */
function TabPanel({ value, children, className }) {
  return (
    <TabsContent value={value} className={className}>
      <div className="rounded-lg border bg-card p-6">
        {children}
      </div>
    </TabsContent>
  );
}

export { TabsGroup, TabList, Tab, TabPanel };
