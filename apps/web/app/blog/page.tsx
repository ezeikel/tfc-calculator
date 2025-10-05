import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
import { getAllPosts } from '@/app/actions/blog';
import BlogPostGrid from '@/components/BlogPostGrid';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const revalidate = 3600; // revalidate every hour

const BlogIndexPage = async () => {
  const posts = await getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((post) => post.meta.tags)));

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <FontAwesomeIcon icon={faBookOpen} size="xl" className="text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-balance font-public-sans">
          Tax-Free Childcare Guide
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-source-sans">
          Expert advice on maximizing your government childcare support, understanding eligibility,
          and managing childcare costs across the UK.
        </p>
      </div>

      {/* Description Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faInfoCircle} size="lg" className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <p className="text-sm text-pretty leading-relaxed font-source-sans">
                Stay up-to-date with the latest information on Tax-Free Childcare, government support schemes,
                and practical guidance for working parents across the UK. Our expert contributors share
                insights from government agencies, childcare providers, and financial advisors.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Tax-Free Childcare guides
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Government schemes
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Cost planning
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Regional guidance
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Working parent tips
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Grid */}
      <BlogPostGrid posts={posts} tags={allTags} />

      {/* Stats */}
      {posts.length > 0 && (
        <div className="text-center pt-8 border-t">
          <p className="text-sm text-muted-foreground font-source-sans">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} •
            {allTags.length} {allTags.length === 1 ? 'topic' : 'topics'} •
            Updated regularly
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogIndexPage;