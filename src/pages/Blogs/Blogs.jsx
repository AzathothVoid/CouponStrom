import React, { useEffect, useState } from "react";
import { Pagination } from "../../utils/Paginate";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BlogCard from "../../components/Cards/BlogCard";
import { useDataState } from "../../components/Data/DataContext";

export default function Blogs() {
  const dataState = useDataState();
  const blogs = dataState.blogs;
  const [currBlogPage, setCurrBlogPage] = useState(1);

  const itemsPerPage = 9;
  const startIndex = (currBlogPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const blogsToShow = blogs.slice(startIndex, endIndex);

  const blogElements = blogsToShow.map((blog) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 my-2">
        <BlogCard data={blog} />
      </div>
    );
  });

  const handlePageChange = (page) => {
    setCurrBlogPage(page);
  };

  return (
    <>
      <Header />
      <main className="container">
        <h1 className="text-center my-4">Blogs and Community</h1>
        <section className="container my-4 p-4 rounded bg-white">
          <h2 className="mb-4 ms-1 text-center text-primary-custom">
            Top Blogs
          </h2>

          <div className="row justify-content-center">{blogElements}</div>
          <div className="sticky-footer my-4">
            <Pagination
              totalItems={blogs.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
