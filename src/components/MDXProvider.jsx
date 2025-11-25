import React from 'react';
import {
  Callout,
  TabsGroup,
  TabList,
  Tab,
  TabPanel,
  CodeBlock,
  Card,
  CardGrid,
  Steps,
  Step,
  AccordionGroup,
  AccordionSection,
} from './mdx';

/**
 * MDX component mapping for ReactMarkdown
 * Makes custom components available in markdown files
 */
export const mdxComponents = {
  // Custom MDX components
  Callout,
  TabsGroup,
  TabList,
  Tab,
  TabPanel,
  CodeBlock,
  Card,
  CardGrid,
  Steps,
  Step,
  AccordionGroup,
  AccordionSection,

  // Enhanced default components
  pre: ({ children, ...props }) => {
    // Extract code from pre > code structure
    const codeElement = React.Children.toArray(children).find(
      child => child?.type === 'code' || child?.props?.className?.startsWith('language-')
    );

    if (codeElement) {
      const className = codeElement.props?.className || '';
      const language = className.startsWith('language-')
        ? className.replace('language-', '')
        : 'text';
      const code = codeElement.props.children;

      return (
        <CodeBlock
          code={typeof code === 'string' ? code : String(code)}
          language={language}
          {...props}
        />
      );
    }

    return <pre {...props}>{children}</pre>;
  },

  // Style enhancements for standard markdown elements
  h1: ({ children, ...props }) => (
    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
      {children}
    </h4>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:text-accent transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border bg-muted px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </td>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-border" {...props} />
  ),
};

/**
 * MDXProvider component
 * Wraps content to provide MDX components context
 */
function MDXProvider({ children }) {
  return <>{children}</>;
}

export default MDXProvider;
