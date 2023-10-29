import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import BlogsSideBar from "../../components/Sections/BlogsSection/BlogsSideBar";
import ReactMarkDown from "react-markdown";
import { getBlogByID } from "../../api/BlogsAPI";
import Loader from "../../components/Loader/Loader";

export default function BlogPage() {
  const { blogId } = useParams();
  const blogID = Number.parseInt(blogId);

  const [viewedBlogs, setViewedBlogs] = useState(
    JSON.parse(localStorage.getItem("viewedBlogs")) || []
  );

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    try {
      getBlogByID({ id: blogID }).then((response) => {
        setBlog(response[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [blogID]);

  useEffect(() => {
    localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));
  }, [viewedBlogs]);

  if (!viewedBlogs.includes(blogID)) {
    setViewedBlogs((prev) => [...prev, blogID]);
    setBlog((prev) => {
      return { ...prev, views: prev.views + 1 };
    });
  }

  console.log("Blog: ", blog);

  return (
    <>
      {blog ? (
        <>
          {console.log("Blog Data: ", blog)}
          <Header />

          <main className="container-fluid">
            <div className="row flex-column-reverse flex-md-row  my-4 flex-wrap flex-md-nowrap gap-3">
              <BlogsSideBar max={4} />

              <section className="mb-4 col col-12 col-md-7 col-lg-8  me-2">
                <div className="bg-white rounded p-3">
                  <h1>{blog.title}</h1>
                  <div className="blog-short-info my-2 fs-6">
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
                      <img
                        className="w-100 rounded"
                        src={blog.images[0].image}
                        alt=""
                      />
                    </div>
                    <ReactMarkDown>{blog.text}</ReactMarkDown>
                  </section>
                </div>
              </section>
            </div>
          </main>

          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
