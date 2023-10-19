import React, { useState, useEffect } from "react";
import BlogCard from "../../Cards/BlogCard";
import blogData from "../../../pages/Home/blogData";

export default function BlogsSection(props) {
  const blogs = blogData;
  const [viewedBlogs, setViewedBlogs] = useState(
    JSON.parse(localStorage.getItem("viewedBlogs")) || []
  );

  const viewBlog = (blogID, setBlog) => {
    if (!viewedBlogs.includes(blogID)) {
      setViewedBlogs((prev) => [...prev, blogID]);
      setBlog((prev) => {
        return { ...prev, views: prev.views + 1 };
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));
  }, [viewedBlogs]);

  const filteredData = blogs.slice(0, 3);

  const blogElements = filteredData.map((blog) => {
    return (
      <div className="col-12 col-md-4 my-2">
        <BlogCard data={blog} viewBlog={viewBlog} />
      </div>
    );
  });
  return (
    <section className="container my-4 p-4 rounded bg-white">
      <h2 className="mb-4 ms-1 text-center text-primary-custom">Top Blogs</h2>

      <div className="row">{blogElements}</div>
    </section>
  );
}
