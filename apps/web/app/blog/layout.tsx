import type React from 'react';

const BlogLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto px-4 max-w-4xl">
    {children}
  </div>
);

export default BlogLayout;