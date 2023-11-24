import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CouponCard from "../../Cards/CouponCard";
import { areDatesOneDayApart } from "../../../utils/DateUtils";
import { useDataState } from "../../Data/DataContext";

export default function TopCouponsSection() {
  const useData = useDataState();
  const couponsData = useData.coupons;
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
    <section
      id="limitedTimeCouponsSection"
      className="container p-2 m-auto my-4 top-stores"
    >
      <h2 className="text-primary-custom">Limited Time Coupons</h2>

      <div className="d-flex flex-xs-column flex-md-row justify-content-center justify-content-lg-start flex-wrap gap-2">
        {couponsElement}
      </div>
    </section>
  );
}
