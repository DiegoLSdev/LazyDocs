import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Tema personalizado completo para mejor highlighting
const customTheme = {
  'pre[class*="language-"]': {
    background: 'rgb(var(--code-background))',
    textAlign: 'left',
    padding: '1rem',
    margin: 0,
  },
  // Comentarios
  'comment': { color: 'rgb(var(--code-comment))', fontStyle: 'italic' },
  'prolog': { color: 'rgb(var(--code-comment))', fontStyle: 'italic' },
  'doctype': { color: 'rgb(var(--code-comment))', fontStyle: 'italic' },
  'cdata': { color: 'rgb(var(--code-comment))', fontStyle: 'italic' },
  
  // Puntuación
  'punctuation': { color: 'rgb(var(--code-punctuation))' },
  
  // Propiedades y tags
  'property': { color: 'rgb(var(--code-variable))' },
  'tag': { color: 'rgb(var(--code-tag))' },
  
  // Números y booleanos
  'boolean': { color: 'rgb(var(--code-number))' },
  'number': { color: 'rgb(var(--code-number))' },
  'constant': { color: 'rgb(var(--code-number))' },
  'symbol': { color: 'rgb(var(--code-number))' },
  
  // Strings
  'selector': { color: 'rgb(var(--code-string))' },
  'attr-name': { color: 'rgb(var(--code-attribute))' },
  'string': { color: 'rgb(var(--code-string))' },
  'char': { color: 'rgb(var(--code-string))' },
  'builtin': { color: 'rgb(var(--code-builtin))' },
  'inserted': { color: 'rgb(var(--code-string))', background: 'rgba(21, 128, 61, 0.1)' },
  
  // Operadores
  'operator': { color: 'rgb(var(--code-operator))' },
  'entity': { color: 'rgb(var(--code-operator))', cursor: 'help' },
  'url': { color: 'rgb(var(--code-function))' },
  
  // Variables
  'variable': { color: 'rgb(var(--code-variable))' },
  'property-access': { color: 'rgb(var(--code-variable))' },
  
  // Keywords
  'atrule': { color: 'rgb(var(--code-keyword))' },
  'attr-value': { color: 'rgb(var(--code-string))' },
  'keyword': { color: 'rgb(var(--code-keyword))', fontWeight: '600' },
  'control': { color: 'rgb(var(--code-keyword))', fontWeight: '600' },
  'directive': { color: 'rgb(var(--code-keyword))', fontWeight: '600' },
  
  // Funciones
  'function': { color: 'rgb(var(--code-function))' },
  'function-name': { color: 'rgb(var(--code-function))' },
  'method': { color: 'rgb(var(--code-function))' },
  
  // Clases
  'class-name': { color: 'rgb(var(--code-class))' },
  'maybe-class-name': { color: 'rgb(var(--code-class))' },
  'type-class-name': { color: 'rgb(var(--code-class))' },
  
  // Otros
  'regex': { color: 'rgb(var(--code-keyword))' },
  'important': { color: 'rgb(var(--code-keyword))', fontWeight: 'bold' },
  'bold': { fontWeight: 'bold' },
  'italic': { fontStyle: 'italic' },
  'deleted': { color: 'rgb(var(--code-tag))', background: 'rgba(185, 28, 28, 0.1)' },
  'namespace': { color: 'rgb(var(--code-attribute))', opacity: 0.7 },
  'parameter': { color: 'rgb(var(--code-variable))' },
};

/**
 * Enhanced CodeBlock component with syntax highlighting and copy button
 */
function CodeBlock({
  code,
  language = 'javascript',
  filename,
  showLineNumbers = true,
  highlightLines,
  className,
  children,
  ...props
}) {
  const [copied, setCopied] = useState(false);
  
  // Manejar tanto el prop 'code' como 'children' del markdown
  let codeContent = code || '';
  
  if (!codeContent && children) {
    if (typeof children === 'string') {
      codeContent = children;
    } else if (children.props && children.props.children) {
      codeContent = children.props.children;
    }
  }

  // Limpiar el código (remover salto de línea final)
  codeContent = String(codeContent).replace(/\n$/, '');

  // Detectar el lenguaje desde className (viene del markdown como 'language-js')
  const match = /language-(\w+)/.exec(className || props.className || '');
  const detectedLanguage = match ? match[1] : language;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse highlighted lines
  const parseHighlightLines = (str) => {
    if (!str) return [];
    const lines = [];
    str.split(',').forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          lines.push(i);
        }
      } else {
        lines.push(Number(part));
      }
    });
    return lines;
  };

  const highlightedLines = parseHighlightLines(highlightLines);

  // Si es código inline (no tiene lenguaje), renderizar como <code> simple
  if (!match && !language) {
    return (
      <code className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)} {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className={cn('code-block group relative my-6 rounded-lg overflow-hidden border border-border', className)}>

      {/* Language badge y Copy button juntos a la derecha */}
      {!filename && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-muted/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-muted-foreground uppercase">
            {detectedLanguage}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 w-8 bg-background/80 hover:bg-background text-foreground backdrop-blur-sm"
            aria-label="Copy code"
            title={copied ? '¡Copiado!' : 'Copiar código'}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}

      {/* Filename header */}
      {filename && (
        <div className="flex items-center justify-between bg-muted border-b border-border px-4 py-2 text-sm font-mono text-muted-foreground">
          <span>{filename}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase opacity-70">{detectedLanguage}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
              className="h-6 w-6 hover:bg-background/80 text-foreground"
              aria-label="Copy code"
              title={copied ? '¡Copiado!' : 'Copiar código'}
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Code content */}
      <SyntaxHighlighter
        language={detectedLanguage}
        style={customTheme}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        lineProps={(lineNumber) => {
          const style = { display: 'block' };
          if (highlightedLines.includes(lineNumber)) {
            style.backgroundColor = 'rgba(var(--code-keyword), 0.1)';
            style.borderLeft = '3px solid rgb(var(--code-keyword))';
            style.paddingLeft = '0.5rem';
            style.marginLeft = '-0.5rem';
          }
          return { style };
        }}
        customStyle={{
          margin: 0,
          borderRadius: 0,
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
          }
        }}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;