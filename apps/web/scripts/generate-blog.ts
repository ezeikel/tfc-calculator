#!/usr/bin/env tsx

/**
 * Test script for blog post generation
 * Usage: cd apps/web && npx tsx scripts/generate-blog.ts
 */

import { generateRandomBlogPost, getCoveredTopics } from '@/app/actions/blog';

const testBlogGeneration = async () => {
  console.log('🚀 Testing Tax-Free Childcare Blog Generation System');
  console.log('==================================================\n');

  // Check OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY environment variable not set');
    console.log('Please add your OpenAI API key to .env.local');
    process.exit(1);
  }

  try {
    // Show current stats
    console.log('📊 Current Blog Stats:');
    const coveredTopics = await getCoveredTopics();
    console.log(`   Posts already created: ${coveredTopics.length}`);
    console.log(`   System: Can generate unlimited childcare topics dynamically\n`);

    // Show sample topics that can be generated
    console.log(
      '📝 System can generate posts for any UK childcare topic:',
    );
    const sampleTopics = [
      'Tax-Free Childcare eligibility requirements',
      'nursery costs London 2024',
      'childcare vouchers vs Tax-Free Childcare',
      'working parent flexible childcare options',
      'emergency childcare support schemes',
    ];
    sampleTopics.forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic}`);
    });
    console.log('   ... or any other childcare topic you can think of!\n');

    // Generate a test blog post
    console.log('🎯 Generating Random Test Blog Post...');
    const result = await generateRandomBlogPost();

    if (result.success) {
      console.log('✅ Blog post generated successfully!');
      console.log(`   Title: ${result.title}`);
      console.log(`   Slug: ${result.slug}`);
      console.log(`   File: content/blog/${result.slug}.mdx`);

      // Show updated stats
      const updatedCoveredTopics = await getCoveredTopics();
      console.log(`\n📊 Updated Stats:`);
      console.log(`   Posts created: ${updatedCoveredTopics.length} (+1)`);
    } else {
      console.error('❌ Failed to generate blog post');
      console.error(`   Error: ${result.error}`);
      process.exit(1);
    }

    console.log('\n🎉 Test completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Check the generated file in Vercel Blob storage');
    console.log('   2. Review the content quality');
    console.log('   3. Create blog pages at /blog');
    console.log('   4. Set up your cron job with CRON_SECRET');
    console.log('   5. Add OPENAI_API_KEY and BLOB_READ_WRITE_TOKEN to production');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
};

// Run the test
testBlogGeneration();