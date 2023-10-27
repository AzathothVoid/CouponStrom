import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import BlogsSideBar from "../../components/Sections/BlogsSection/BlogsSideBar";
import ReactMarkDown from "react-markdown";
import { useLocation } from "react-router-dom";

export default function BlogPage() {
  const { blogId } = useParams();
  const blogID = Number.parseInt(blogId);
  const location = useLocation();

  const [viewedBlogs, setViewedBlogs] = useState(
    JSON.parse(localStorage.getItem("viewedBlogs")) || []
  );

  const [blog, setBlog] = useState(location.state.blog);

  console.log("Opened Blog: ", blog);

  const blogsData = location.state.blogs;

  console.log("Blog Page Blocks Data: ", blogsData);

  if (!viewedBlogs.includes(blogID)) {
    setViewedBlogs((prev) => [...prev, blogID]);
    setBlog((prev) => {
      return { ...prev, views: prev.views + 1 };
    });
  }

  useEffect(() => {
    localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));
  }, [viewedBlogs]);

  console.log(blog);
  return (
    <>
      <Header />

      <main className="container-fluid">
        <div className="row flex-column-reverse flex-md-row  my-4 flex-wrap flex-md-nowrap gap-3">
          <BlogsSideBar data={blogsData} max={4} />

          <section className="mb-4 col col-12 col-md-7 col-lg-8  me-2">
            <div className="bg-white rounded p-3">
              <h1>{blog.title}</h1>
              <div className="blog-short-info">
                <span className="me-2">
                  <i class="bi bi-person-circle me-1"></i>
                  {blog.writer.name}
                </span>
                {new Date(blog.created_at).toDateString()}
                <span className="ms-2">
                  <i class="bi bi-eye-fill me-1"></i>
                  {blog.views}
                </span>
              </div>
              <section className="my-3">
                <div className="mb-3">
                  <img className="w-100 rounded" src={blog.img} alt="" />
                </div>
                <ReactMarkDown>{blog.text}</ReactMarkDown>
              </section>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
