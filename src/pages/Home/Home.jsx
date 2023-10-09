import React from "react";
import { useState } from "react";
import Coupon from "../../components/Coupon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoSlider from "../../components/LogoSlider";
import { couponsData } from "./couponsData";
import Pagination from "../../utils/Paginate";
import CallToAction from "../../components/CallToAction";

export default function Home() {
  const [currPage, setCurrPage] = useState("");
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
    if (page === Math.ceil(coupons.length / itemsPerPage)) {
      document.get;
    }
    setCurrCouponPage(page);
  };
  const currStatus = window.location.pathname === "/home";

  if (currStatus && !currPage) {
    setCurrPage("Home");
  } else if (!currStatus && currPage) {
    setCurrPage("");
  }

  function addCoupon() {
    console.log("add");
  }
  return (
    <>
      <Header currPage={currPage} />

      <div className="slider-container-bg  pt-sm-5 pb-5 mb-5">
        <LogoSlider />
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-9">
            <h2 className=" text-primary fs-2 text-uppercase">Coupon Deals</h2>
            {couponElements}
            <Pagination
              totalItems={coupons.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
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
      </div>
      <CallToAction />
      <Footer />
    </>
  );
}
