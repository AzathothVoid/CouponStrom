import React from "react";
import { useState } from "react";
import Coupon from "../../components/Coupon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoSlider from "../../components/LogoSlider";
import { couponsData } from "./couponsData";

export default function Home() {
  const [currPage, setCurrPage] = useState("");
  const [coupons, setCoupons] = useState(couponsData);

  const couponElements = coupons.map((coupon) => {
    return (
      <Coupon description={coupon.description} expiryDate={coupon.expiryDate} />
    );
  });

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

      <div className="mt-5 mb-5">
        <LogoSlider />
      </div>
      <div className="container mt-5">
        <div className="container row">
          <div className="col-9">{couponElements}</div>
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
      <Footer />
    </>
  );
}
