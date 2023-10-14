import React from "react";
import { useState, useEffect } from "react";
import StoreCoupon from "../../StoreCoupon";

export default function StoreCouponsSection(props) {
  const data = props.data;

  console.log("Data is: ", data);
  const couponElements = data.map((coupon) => {
    return (
      <div className="mb-3">
        <StoreCoupon
          type={coupon.type}
          title={coupon.title}
          expiry={coupon.expiry}
        />
      </div>
    );
  });

  return <section className="mb-3">{couponElements}</section>;
}
