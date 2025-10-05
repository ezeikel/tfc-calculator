"use client"

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { faShareNodes } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { trackEvent, getBlogAnalyticsProperties } from '@/lib/analytics';
import type { Post } from '@/types';

interface BlogInteractionButtonsProps {
  post: Post;
  showBackButton?: boolean;
  type?: 'share' | 'navigation';
}

const BlogInteractionButtons = ({ post, showBackButton = true, type = 'navigation' }: BlogInteractionButtonsProps) => {
  const handleShareClick = async () => {
    const shareUrl = `${window.location.origin}/blog/${post.meta.slug}`;
    const shareData = {
      title: post.meta.title,
      text: post.meta.summary,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        trackEvent("blog_post_shared", {
          ...getBlogAnalyticsProperties(post),
          share_method: "native",
          button_location: "article_header"
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        trackEvent("blog_post_shared", {
          ...getBlogAnalyticsProperties(post),
          share_method: "clipboard",
          button_location: "article_header"
        });
        // You could add a toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleTryCalculatorClick = () => {
    trackEvent("blog_try_calculator_clicked", {
      ...getBlogAnalyticsProperties(post),
      button_location: "article_footer"
    });
  };

  if (type === 'share') {
    return (
      <div className="sm:ml-auto">
        <Button variant="outline" size="sm" className="text-xs" onClick={handleShareClick}>
          <FontAwesomeIcon icon={faShareNodes} className="mr-2" />
          Share Article
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      {showBackButton && (
        <Link href="/blog">
          <Button variant="outline" className="w-full sm:w-auto">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            All Articles
          </Button>
        </Link>
      )}
      <Link href="/" onClick={handleTryCalculatorClick}>
        <Button className="w-full sm:w-auto">
          Try TFC Calculator
        </Button>
      </Link>
    </div>
  );
};

export default BlogInteractionButtons;