// BlogList.tsx
// Lista de artículos del blog que renderiza múltiples BlogCard

import React from "react";
import BlogCard from "./BlogCard.tsx";
import { BlogPost } from "../types.ts";

type BlogListProps = {
  blogs: BlogPost[];
};

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          post={blog}
        />
      ))}
    </div>
  );
};

export default BlogList;
