import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CouponCard from "../../Cards/CouponCard";
import { useDataState } from "../../Data/DataContext";

export default function TopCouponsSection() {
  const useData = useDataState();

  const couponsData = useData.coupons;

  console.log("Coupons Data: ", couponsData);
  const total = 10;

  const sortedData = couponsData.sort(
    (item1, item2) => item2.likes - item1.likes
  );

  const filteredData = sortedData.slice(0, total);

  const couponsElement = filteredData.map((coupon, index) => {
    const couponElement = (
      <div className="" key={coupon.id}>
        <CouponCard data={coupon} />
      </div>
    );
    return couponElement;
  });

  return (
    <section
      id="topCouponsSection"
      className="container p-2 m-auto my-4 top-stores"
    >
      <h2 className="fs-4 mb-3 rounded bg-primary-custom p-2 text-white d-inline-block">
        Top Coupons
      </h2>

      <div className="d-flex flex-xs-column flex-md-row justify-content-center justify-content-lg-start flex-wrap gap-2">
        {couponsElement}
      </div>
    </section>
  );
}
