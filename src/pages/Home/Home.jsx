import React from "react";
import { useState } from "react";
import Coupon from "../../components/GeneralCoupon";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LogoSlider from "../../components/banners/LogoSlider";
import { couponsData } from "./couponsData";
import { Pagination } from "../../utils/Paginate";
import TopStoresSection from "../../components/Sections/TopStores/Testing";
import TopCouponsSection from "../../components/Sections/TopCoupons/TopCoupons";
import BlogCard from "../../components/Cards/BlogCard";
import blogData from "./blogData";

export default function Home() {
  const [currCouponPage, setCurrCouponPage] = useState(1);
  const [coupons, setCoupons] = useState(couponsData);

  const itemsPerPage = 10;
  const startIndex = (currCouponPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const couponsToShow = coupons.slice(startIndex, endIndex);

  const couponElements = couponsToShow.map((coupon) => {
    return (
      <div className="my-2 my-sm-3">
        <Coupon data={coupon} />
      </div>
    );
  });

  const handlePageChange = (page) => {
    setCurrCouponPage(page);
  };

  const blogElements = blogData.map((blog) => {
    return (
      <div className="mb-3">
        <BlogCard data={blog} />
      </div>
    );
  });
  return (
    <>
      <Header />

      <main>
        <section className="slider-container-bg pt-5 pb-5 mb-5">
          <LogoSlider />
        </section>
        <TopStoresSection />
        <section className="container-md mt-5 mb-5 pe-0">
          <div style={{ minHeight: "100vh" }} className="row">
            <div className="col-12 col-sm-12 col-md-7 col-lg-8">
              <h2 className="fs-2 text-uppercase text-primary-custom">
                Coupon Deals
              </h2>
              {couponElements}
              <div className="sticky-footer">
                <Pagination
                  totalItems={coupons.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-4 p-0 container sidebarWrapper  me-0 mb-4">
              {blogElements}
            </div>
          </div>
        </section>
        <TopCouponsSection />
      </main>
      <Footer />
    </>
  );
}
