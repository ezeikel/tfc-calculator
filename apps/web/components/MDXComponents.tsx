import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink, faInfoCircle, faLightbulb, faWarning, faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MDXComponents = {
  // Headings
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4 font-public-sans" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4 font-public-sans" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3 font-public-sans" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-lg font-semibold tracking-tight mt-6 mb-3 font-public-sans" {...props}>
      {children}
    </h4>
  ),

  // Paragraphs and text
  p: ({ children, ...props }: any) => (
    <p className="text-base leading-7 mb-4 font-source-sans" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 font-source-sans" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 font-source-sans" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-base leading-7" {...props}>
      {children}
    </li>
  ),

  // Links
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith('http');
    const isInternal = href?.startsWith('/');

    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium"
          {...props}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium inline-flex items-center gap-1"
        {...props}
      >
        {children}
        {isExternal && <FontAwesomeIcon icon={faExternalLink} className="text-xs" />}
      </a>
    );
  },

  // Emphasis
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),

  // Code
  code: ({ children, ...props }: any) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre
      className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4"
      {...props}
    >
      {children}
    </pre>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground mb-4"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse border border-border" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="border border-border bg-muted p-2 text-left font-semibold font-source-sans"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-border p-2 font-source-sans" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }: any) => (
    <hr className="border-t border-border my-8" {...props} />
  ),

  // Custom components for enhanced content
  InfoBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 border-blue-200 dark:border-blue-800">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            {title && (
              <h4 className="font-semibold mb-2 font-public-sans">{title}</h4>
            )}
            <div className="text-sm space-y-2">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),

  TipBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <FontAwesomeIcon icon={faLightbulb} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            {title && (
              <h4 className="font-semibold mb-2 font-public-sans text-green-800 dark:text-green-200">
                {title}
              </h4>
            )}
            <div className="text-sm space-y-2 text-green-800 dark:text-green-200">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),

  WarningBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <FontAwesomeIcon icon={faWarning} className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            {title && (
              <h4 className="font-semibold mb-2 font-public-sans text-yellow-800 dark:text-yellow-200">
                {title}
              </h4>
            )}
            <div className="text-sm space-y-2 text-yellow-800 dark:text-yellow-200">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),

  SuccessBox: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            {title && (
              <h4 className="font-semibold mb-2 font-public-sans text-green-800 dark:text-green-200">
                {title}
              </h4>
            )}
            <div className="text-sm space-y-2 text-green-800 dark:text-green-200">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),

  QuickFacts: ({ facts }: { facts: string[] }) => (
    <Card className="my-6">
      <CardContent className="pt-4">
        <h4 className="font-semibold mb-3 font-public-sans">Quick Facts</h4>
        <ul className="space-y-2">
          {facts.map((fact, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  ),

  CTAButton: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <div className="my-6 text-center">
      <Button asChild className="inline-flex">
        <Link href={href}>
          {children}
        </Link>
      </Button>
    </div>
  ),

  TagList: ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap gap-2 my-4">
      {tags.map(tag => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
      ))}
    </div>
  ),
};

export default MDXComponents;