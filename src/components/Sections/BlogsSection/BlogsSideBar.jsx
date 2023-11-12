import React, { useEffect, useState } from "react";
import BlogCard from "../../Cards/BlogCard";
import { useDataState } from "../../Data/DataContext";

export default function BlogsSideBar(props) {
  const useData = useDataState();
  const blogs = useData.blogs;

  const filteredBlogs = blogs.slice(0, props.max);
  const blogElements = filteredBlogs.map((blog) => {
    return (
      <div className="col-12 col-sm-6 col-md-12 my-3">
        <BlogCard data={blog} />
      </div>
    );
  });
  return (
    <div
      style={{ height: "fit-content" }}
      className="row col-12 col-md-5 col-lg-4 py-3 container-fluid sidebarWrapper text-center rounded me-0 mb-4"
    >
      <h3 className="text-primary-custom">Popular Blogs</h3>
      {blogElements}
    </div>
  );
}
