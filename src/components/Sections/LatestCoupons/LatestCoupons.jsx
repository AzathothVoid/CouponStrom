import React, { useState } from "react";
import CouponCard from "../../Cards/CouponCard";
import { useDataState } from "../../Data/DataContext";

export default function LatestCouponsSection() {
  const useData = useDataState();
  const couponsData = useData.coupons;
  const total = 10;

  const sortedCoupons = couponsData.sort((coup1, coup2) => {
    return new Date(coup2.created_at) - new Date(coup1.created_at);
  });

  const filteredData = sortedCoupons.slice(0, total);

  const couponsElement = filteredData.map((coupon, index) => {
    const couponElement = (
      <div key={coupon.id}>
        <CouponCard data={coupon} />
      </div>
    );

    return couponElement;
  });

  return (
    <section
      id="latestCouponsSection"
      className="container p-2 m-auto my-4 top-stores"
    >
      <h2 className="mb-3 text-primary-custom ">Latest Coupons</h2>

      <div className="d-flex flex-xs-column flex-md-row justify-content-center justify-content-lg-start flex-wrap gap-2">
        {couponsElement}
      </div>
    </section>
  );
}
