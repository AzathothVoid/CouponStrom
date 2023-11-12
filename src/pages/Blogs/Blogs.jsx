import React, { useEffect, useState } from "react";
import { Pagination } from "../../utils/Paginate";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BlogCard from "../../components/Cards/BlogCard";
import { useDataState } from "../../components/Data/DataContext";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>CouponStrom: Free Coupons and Deals</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />

        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />

        <meta property="twitter:card" content="" />
        <meta property="twitter:title" content="" />
        <meta property="twitter:description" content="" />
        <meta property="twitter:image" content="" />
      </Helmet>
      {blogs && blogElements ? (
        <>
          <Header />
          <main className="container">
            <h1 className="text-center mt-4 mb-2">Blogs and Community</h1>
            <section className="container mb-4 p-4 rounded bg-white">
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
      ) : (
        <Loader />
      )}
    </>
  );
}
