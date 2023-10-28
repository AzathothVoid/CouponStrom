import React from "react";
import { useState, useEffect } from "react";
import Coupon from "../../components/GeneralCoupon";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LogoSlider from "../../components/Slider";
import couponsData from "./couponsData";
import { Pagination } from "../../utils/Paginate";
import TopStoresSection from "../../components/Sections/TopStores/TopStoresSection";
import TopCouponsSection from "../../components/Sections/TopCoupons/TopCoupons";
import LimitedTimeCouponsSection from "../../components/Sections/LimitedTimeCoupons/LimitedTimeCoupons";
import BlogsSideBar from "../../components/Sections/BlogsSection/BlogsSideBar";
import { logosAndNames } from "./sliderData";
import { useDataState } from "../../components/Data/DataContext";

export default function Home() {
  const [currCouponPage, setCurrCouponPage] = useState(1);
  const [coupons, setCoupons] = useState(couponsData);

  const useData = useDataState();

  const itemsPerPage = 12;
  const startIndex = (currCouponPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const couponsToShow = coupons.slice(startIndex, endIndex);

  useEffect(() => {
    setCoupons(couponsData);
  }, [couponsData]);

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
      <Header />

      <main>
        <section className="container-fluid slider-container-bg  py-5">
          <LogoSlider data={logosAndNames} />
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
          <LimitedTimeCouponsSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
