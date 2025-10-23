'use client';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Blog page error:', error);
    }
  }, [error]);

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-destructive/10 rounded-lg">
            <FontAwesomeIcon icon={faExclamationTriangle} size="xl" className="text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-balance font-public-sans">
          Unable to Load Blog Posts
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-source-sans">
          We&apos;re having trouble loading the blog posts right now. This is usually temporary.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-semibold font-public-sans">What happened?</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground font-source-sans">
            Our blog content is temporarily unavailable. This could be due to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground font-source-sans">
            <li>A temporary connection issue with our content storage</li>
            <li>Maintenance or updates in progress</li>
            <li>A brief service interruption</li>
          </ul>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-xs font-mono text-muted-foreground">
                Error: {error.message}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            onClick={reset}
            className="flex-1"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="flex-1"
          >
            Return Home
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground font-source-sans">
          If this problem persists, please try again in a few minutes.
        </p>
      </div>
    </div>
  );
}
