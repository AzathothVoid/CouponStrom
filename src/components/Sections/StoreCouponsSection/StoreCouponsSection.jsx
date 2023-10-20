import React from "react";
import { useState, useEffect } from "react";
import StoreCoupon from "../../StoreCoupon";

export default function StoreCouponsSection(props) {
  const { data } = props;

  console.log("Data ", data);

  const couponElements = data.map((coupon) => {
    return (
      <div className="my-3 my-sm-3">
        <StoreCoupon data={coupon} />
      </div>
    );
  });

  return <section className="mb-3">{couponElements}</section>;
}
