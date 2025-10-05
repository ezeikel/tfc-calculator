import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faCalendar } from '@fortawesome/pro-regular-svg-icons';
import { getAllPosts, getPostBySlug } from '@/app/actions/blog';
import MDXComponents from '@/components/MDXComponents';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PLACEHOLDER_AVATAR_IMAGE } from '@/constants';
import BlogInteractionButtons from '@/components/BlogInteractionButtons';

export const revalidate = 3600; // revalidate every hour

export const generateStaticParams = async () => {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.meta.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.meta.title} | TFC Calculator`,
    description: post.meta.summary,
    openGraph: {
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author.name],
      tags: post.meta.tags,
      images: post.meta.image ? [post.meta.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
};

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { meta, content, readingTime } = post;

  return (
    <div className="py-8 space-y-8">
      {/* Back Navigation */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-source-sans"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to all articles
        </Link>
      </div>

      {/* Article Header */}
      <article className="space-y-8">
        <header className="space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance font-public-sans">
            {meta.title}
          </h1>

          {/* Summary */}
          <p className="text-xl text-muted-foreground text-pretty font-source-sans">
            {meta.summary}
          </p>

          {/* Author and Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={meta.author.avatar || PLACEHOLDER_AVATAR_IMAGE}
                  alt={meta.author.name}
                />
                <AvatarFallback className="text-sm">
                  {meta.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold font-source-sans">{meta.author.name}</p>
                <p className="text-sm text-muted-foreground font-source-sans">
                  {meta.author.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground font-source-sans">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendar} />
                <time dateTime={meta.date}>
                  {new Date(meta.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} />
                <span>{readingTime}</span>
              </div>
            </div>

            <BlogInteractionButtons post={post} type="share" />
          </div>
        </header>

        {/* Featured Image */}
        {meta.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={meta.image}
              alt={meta.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXRemote source={content} components={MDXComponents} />
        </div>

        {/* Article Footer */}
        <footer className="space-y-6 pt-8 border-t">
          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold font-public-sans">Topics covered:</h3>
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={meta.author.avatar || PLACEHOLDER_AVATAR_IMAGE}
                    alt={meta.author.name}
                  />
                  <AvatarFallback>
                    {meta.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h4 className="font-semibold font-public-sans">{meta.author.name}</h4>
                  <p className="text-sm text-muted-foreground font-source-sans">
                    {meta.author.title}
                  </p>
                  <p className="text-sm font-source-sans">
                    Expert contributor sharing insights on UK childcare, government support schemes,
                    and financial planning for families.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <BlogInteractionButtons post={post} />
        </footer>
      </article>
    </div>
  );
};

export default BlogPostPage;