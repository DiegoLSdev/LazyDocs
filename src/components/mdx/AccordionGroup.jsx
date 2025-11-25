import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

/**
 * AccordionGroup component for MDX - container for collapsible sections
 *
 * @param {Object} props
 * @param {'single'|'multiple'} props.type - Allow single or multiple open items
 * @param {string} props.defaultValue - Default open item(s)
 * @param {boolean} props.collapsible - Allow collapsing all items (for type="single")
 * @param {React.ReactNode} props.children - AccordionSection components
 */
function AccordionGroup({ type = 'single', defaultValue, collapsible = true, children, className }) {
  return (
    <Accordion
      type={type}
      defaultValue={defaultValue}
      collapsible={collapsible}
      className={className}
    >
      {children}
    </Accordion>
  );
}

/**
 * AccordionSection component - individual collapsible section
 *
 * @param {Object} props
 * @param {string} props.value - Unique identifier for this section
 * @param {string} props.title - Section title/trigger text
 * @param {React.ReactNode} props.children - Section content
 */
function AccordionSection({ value, title, children, className }) {
  return (
    <AccordionItem value={value} className={className}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <div className="text-sm text-muted-foreground leading-relaxed [&>p]:my-2 [&>p:first-child]:mt-0">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export { AccordionGroup, AccordionSection };
