import React, { useEffect, useState } from "react";
import BlogCard from "../../Cards/BlogCard";

export default function BlogsSideBar(props) {
  const blogs = props.data;

  const filteredBlogs = blogs.slice(0, props.max);
  const blogElements = filteredBlogs.map((blog) => {
    return (
      <div className="col-12 col-sm-6 col-md-12 my-3">
        <BlogCard data={blog} blogs={blogs} />
      </div>
    );
  });
  return (
    <div className="row col-12 col-md-5 col-lg-4 py-3 container-fluid sidebarWrapper  rounded me-0 mb-4">
      {blogElements}
    </div>
  );
}
