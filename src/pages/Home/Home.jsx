import React from "react";
import { useState } from "react";
import Coupon from "../../components/Coupon";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LogoSlider from "../../components/banners/LogoSlider";
import Card from "../../components/Cards/Card";
import { couponsData } from "./couponsData";
import { Pagination } from "../../utils/Paginate";
import TopStoresSection from "../../components/Sections/TopStores/Testing";
import TopCouponsSection from "../../components/Sections/TopCoupons/TopCoupons";

export default function Home() {
  const [currCouponPage, setCurrCouponPage] = useState(1);
  const [coupons, setCoupons] = useState(couponsData);

  const itemsPerPage = 5;
  const startIndex = (currCouponPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const couponsToShow = coupons.slice(startIndex, endIndex);

  const couponElements = couponsToShow.map((coupon) => {
    return (
      <Coupon description={coupon.description} expiryDate={coupon.expiryDate} />
    );
  });

  const handlePageChange = (page) => {
    setCurrCouponPage(page);
  };

  function addCoupon() {
    console.log("add");
  }
  return (
    <>
      <Header />

      <main>
        <section className="slider-container-bg pt-5 pb-5 mb-5">
          <LogoSlider />
        </section>
        <section className="container mt-5 mb-5">
          <div style={{ minHeight: "100vh" }} className="row">
            <div className="col-9">
              <h2 className=" text-primary fs-2 text-uppercase">
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
            <div className="col-3 container sidebarWrapper">
              <button
                className="btn btn-secondary"
                onClick={() => setCoupons((prev) => [...prev, prev[0]])}
              >
                Click
              </button>
            </div>
          </div>
        </section>
        <TopStoresSection />
        <TopCouponsSection />
      </main>
      <Footer />
    </>
  );
}
