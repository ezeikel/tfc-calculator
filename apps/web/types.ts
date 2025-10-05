import { z } from 'zod';

export type PostAuthor = {
  name: string;
  title: string;
  avatar: string;
};

export type PostMeta = {
  title: string;
  date: string;
  author: PostAuthor;
  summary: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  slug: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
  readingTime: string;
};

// Define the tags directly here to avoid circular imports
const BLOG_TAGS_ENUM = [
  'tax-free-childcare',
  'government-support',
  'childcare-costs',
  'nursery-fees',
  'working-parents',
  'financial-planning',
  'eligibility-guide',
  'application-process',
  'benefits-comparison',
  'savings-calculator',
  'childcare-vouchers',
  'universal-credit',
  'free-childcare-hours',
  'self-employed-parents',
  'single-parents',
  'disabled-children',
  'special-needs',
  'emergency-childcare',
  'holiday-care',
  'wraparound-care',
  'after-school-clubs',
  'childminder-costs',
  'nursery-comparison',
  'regional-costs',
  'london-childcare',
  'budget-planning',
  'return-to-work',
  'maternity-transition',
  'flexible-working',
  'shift-workers',
  'part-time-work',
  'seasonal-care',
  'ofsted-ratings',
  'quality-standards',
  'health-safety',
  'food-allergies',
  'mental-health',
  'separation-anxiety',
  'early-years-education',
  'child-development'
] as const;

/**
 * Zod schema for blog post metadata generation
 */
export const BlogPostMetaSchema = z.object({
  title: z
    .string()
    .describe(
      'Engaging, SEO-optimized title with high search potential for UK childcare audience',
    ),
  summary: z
    .string()
    .describe(
      'Brief, compelling summary that describes what parents will learn and why it matters',
    ),
  tags: z
    .array(z.enum(BLOG_TAGS_ENUM))
    .max(5)
    .describe(
      '3-5 most relevant tags from the predefined list that best match this childcare topic',
    ),
  category: z
    .enum([
      'tax-free-childcare',
      'government-support',
      'childcare-costs',
      'financial-planning',
      'working-parents',
      'childcare-types',
      'regional-guides',
      'special-needs',
      'seasonal-care',
      'early-years',
      'general',
    ])
    .describe('Most appropriate category for this childcare topic'),
});

export type BlogPostMeta = z.infer<typeof BlogPostMetaSchema>;