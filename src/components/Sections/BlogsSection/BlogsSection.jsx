import React, { useState, useEffect } from "react";
import BlogCard from "../../Cards/BlogCard";
import blogData from "../../../pages/Home/blogData";
import { useDataState } from "../../Data/DataContext";

export default function BlogsSection(props) {
  const useData = useDataState();

  const blogs = useData.blogs;

  const filteredData = blogs.slice(0, 3);

  const blogElements = filteredData.map((blog) => {
    return (
      <div className="col-12 col-md-4 my-2">
        <BlogCard data={blog} />
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
