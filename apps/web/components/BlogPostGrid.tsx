"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFilter, faTag } from '@fortawesome/pro-regular-svg-icons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PLACEHOLDER_AVATAR_IMAGE, PLACEHOLDER_BLOG_IMAGE } from '@/constants';
import type { Post } from '@/types';

interface BlogPostGridProps {
  posts: Post[];
  tags: string[];
}

const BlogPostGrid = ({ posts, tags }: BlogPostGridProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.meta.tags.includes(selectedTag))
    : posts;

  const displayedTags = showAllTags ? tags : tags.slice(0, 8);
  const featuredPosts = posts.filter(post => post.meta.featured);
  const regularPosts = posts.filter(post => !post.meta.featured);

  return (
    <div className="space-y-8">
      {/* Tag Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFilter} className="text-muted-foreground" />
          <span className="text-sm font-medium font-source-sans">Filter by topic:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="text-xs"
          >
            All Posts
          </Button>
          {displayedTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className="text-xs"
            >
              <FontAwesomeIcon icon={faTag} className="mr-1" />
              {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Button>
          ))}
          {tags.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-xs text-muted-foreground"
            >
              {showAllTags ? 'Show Less' : `+${tags.length - 8} more`}
            </Button>
          )}
        </div>
      </div>

      {/* Featured Posts */}
      {!selectedTag && featuredPosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-public-sans">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.slice(0, 2).map(post => (
              <Link key={post.meta.slug} href={`/blog/${post.meta.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative aspect-video">
                    <Image
                      src={post.meta.image || PLACEHOLDER_BLOG_IMAGE}
                      alt={post.meta.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {post.meta.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag.replace(/-/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-bold text-lg leading-tight font-public-sans">
                        {post.meta.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 font-source-sans">
                        {post.meta.summary}
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={post.meta.author.avatar || PLACEHOLDER_AVATAR_IMAGE}
                            alt={post.meta.author.name}
                          />
                          <AvatarFallback className="text-xs">
                            {post.meta.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate font-source-sans">
                            {post.meta.author.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <time dateTime={post.meta.date}>
                              {new Date(post.meta.date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </time>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faClock} />
                              {post.readingTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Posts Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold font-public-sans">
            {selectedTag
              ? `Posts about ${selectedTag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
              : 'All Articles'
            }
          </h2>
          <p className="text-sm text-muted-foreground font-source-sans">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-2">
                <p className="text-muted-foreground font-source-sans">
                  No articles found for this topic.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedTag(null)}
                  size="sm"
                >
                  View All Articles
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => (
              <Link key={post.meta.slug} href={`/blog/${post.meta.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative aspect-video">
                    <Image
                      src={post.meta.image || PLACEHOLDER_BLOG_IMAGE}
                      alt={post.meta.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {post.meta.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag.replace(/-/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-base leading-tight font-public-sans line-clamp-2">
                        {post.meta.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 font-source-sans">
                        {post.meta.summary}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={post.meta.author.avatar || PLACEHOLDER_AVATAR_IMAGE}
                            alt={post.meta.author.name}
                          />
                          <AvatarFallback className="text-xs">
                            {post.meta.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="truncate">{post.meta.author.name}</span>
                            <span>•</span>
                            <time dateTime={post.meta.date}>
                              {new Date(post.meta.date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostGrid;