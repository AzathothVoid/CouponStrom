import React from "react";
import { useState, useEffect } from "react";
import Coupon from "../../components/GeneralCoupon";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LogoSlider from "../../components/Slider";
import { Pagination } from "../../utils/Paginate";
import TopStoresSection from "../../components/Sections/TopStores/TopStoresSection";
import TopCouponsSection from "../../components/Sections/TopCoupons/TopCoupons";
import LimitedTimeCouponsSection from "../../components/Sections/LimitedTimeCoupons/LimitedTimeCoupons";
import LatestCouponsSection from "../../components/Sections/LatestCoupons/LatestCoupons";
import BlogsSideBar from "../../components/Sections/BlogsSection/BlogsSideBar";
import { useDataState } from "../../components/Data/DataContext";
import Loader from "../../components/Loader/Loader";
import SearchCoupons from "../../components/SearchCoupons/SearchCoupons";
import { Helmet } from "react-helmet";

export default function Home() {
  const useData = useDataState();

  const [currCouponPage, setCurrCouponPage] = useState(1);
  const coupons = useData.coupons;

  const itemsPerPage = 12;
  const startIndex = (currCouponPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const couponsToShow = coupons.slice(startIndex, endIndex);

  const couponElements = couponsToShow.map((coupon) => {
    return (
      <div className="my-3 my-sm-3">
        <Coupon data={coupon} />
      </div>
    );
  });

  const handlePageChange = (page) => {
    setCurrCouponPage(page);
  };

  return (
    <>
      <Helmet>
        <title>CouponStrom: Free Coupons and Deals</title>
      </Helmet>
      {couponElements && coupons ? (
        <>
          <Header />

          <main>
            <section className="container m-auto flex-wrap flex-md-nowrap slider-container-bg align-items-center row gap-5 py-5">
              <div className="col-12 col-md-8">
                <LogoSlider />
              </div>
              <div className="col-12 col-md-4 my-md-0 my-4">
                <SearchCoupons />
              </div>
            </section>
            <div className="mb-5">
              <TopStoresSection />
            </div>
            <section className="container-md my-3 pe-0">
              <div style={{ minHeight: "100vh" }} className="row">
                <div className="col-12 col-sm-12 col-md-7 col-lg-8 mb-4">
                  <h2 className="fs-2 text-uppercase text-primary-custom">
                    Coupon Deals
                  </h2>
                  <div>{couponElements}</div>
                  <div className="sticky-footer my-4">
                    <Pagination
                      totalItems={coupons.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
                <BlogsSideBar max={3} />
              </div>
            </section>
            <div className="my-4">
              <TopCouponsSection />
            </div>
            <div className="my-4">
              <LatestCouponsSection />
            </div>
            <div className="my-4">
              <LimitedTimeCouponsSection />
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
