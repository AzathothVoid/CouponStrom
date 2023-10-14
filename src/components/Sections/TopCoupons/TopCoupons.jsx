import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopCouponsData from "./TopCouponsData";
import Card from "../../Cards/Card";

export default function TopCouponsSection() {
  const total = 10;
  const max = 5;
  var toDisplay;

  if (TopCouponsData.length % max === 0) {
    toDisplay = TopCouponsData.length;
  } else {
    toDisplay = max * Math.floor(TopCouponsData.length / max);
  }

  if (toDisplay > total) {
    toDisplay = total;
  }

  const filteredData = TopCouponsData.slice(0, toDisplay);

  const couponsElement = filteredData.map((coupon, index) => {
    const couponElement = (
      <div key={coupon.id}>
        <Card
          type={coupon.type}
          title={coupon.title}
          likes={coupon.likes}
          image={coupon.image}
          expiry={coupon.expiry}
        />
      </div>
    );
    if ((index + 1) % max === 0) {
      return [<div></div>, couponElement];
    }
    return couponElement;
  });

  return (
    <section className="container-fluid p-2 ms-1 mb-4 mt-4 top-stores">
      <div className=" text-center ">
        <h2 className="mb-3 text-primary-custom">Top Coupons</h2>

        <div className="d-flex flex-xs-column flex-md-row justify-content-center flex-wrap gap-3">
          {couponsElement}
        </div>
      </div>
    </section>
  );
}
