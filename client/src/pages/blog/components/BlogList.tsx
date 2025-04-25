// BlogList.tsx
// Lista de artículos del blog que renderiza múltiples BlogCard

import React from "react";
import BlogCard from "./BlogCard";

type BlogItem = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
};

type BlogListProps = {
  blogs: BlogItem[];
  onSelect: (id: string) => void;
};

const BlogList: React.FC<BlogListProps> = ({ blogs, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          excerpt={blog.excerpt}
          image={blog.image}
          date={blog.date}
          author={blog.author}
          onClick={() => onSelect(blog.id)}
        />
      ))}
    </div>
  );
};

export default BlogList;
