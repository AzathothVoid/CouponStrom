import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import couponsData from "../../../pages/Home/couponsData";
import CouponCard from "../../Cards/CouponCard";
import { areDatesOneDayApart } from "../../../utils/DateUtils";

export default function TopCouponsSection() {
  const total = 10;

  const filteredData = couponsData.slice(0, total);

  const couponsElement = filteredData.map((coupon, index) => {
    if (!areDatesOneDayApart(coupon.expiry, new Date().getTime())) return;

    const couponElement = (
      <div key={coupon.id}>
        <CouponCard data={coupon} />
      </div>
    );

    return couponElement;
  });

  return (
    <section className="container top-stores">
      <h2 className="mb-3 ms-1 text-primary-custom">Limited Time Coupons</h2>

      <div className="d-flex flex-xs-column flex-md-row justify-content-center justify-content-lg-start flex-wrap gap-2">
        {couponsElement}
      </div>
    </section>
  );
}
