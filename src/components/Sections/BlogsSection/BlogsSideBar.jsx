import React, { useEffect, useState } from "react";
import BlogCard from "../../Cards/BlogCard";
import blogData from "../../../pages/Home/blogData";

export default function BlogsSideBar(props) {
  const [blogs, setBlogs] = useState(blogData);

  useEffect(() => {
    setBlogs(blogData);
  }, [blogData]);

  const filteredBlogs = blogs.slice(0, props.max);
  const blogElements = filteredBlogs.map((blog) => {
    return (
      <div className="col-12 col-sm-6 col-md-12 my-3">
        <BlogCard data={blog} />
      </div>
    );
  });
  return (
    <div className="row col-12 col-md-5 col-lg-4 py-3 container-fluid sidebarWrapper bg-white rounded me-0 mb-4">
      {blogElements}
    </div>
  );
}
