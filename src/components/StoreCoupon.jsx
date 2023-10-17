import React from "react";

export default function StoreCoupon(props) {
  return (
    <div className="container p-3 shadow">
      <div className="row">
        <div className="col-6 col-md-6 col-lg-3 w-sm-25 p-4">
          <img src={"/generalCoupon.svg"} alt="" />
        </div>
        <div className="col-6 col-md-6 col col-lg-5 pt-4">
          <h2>{props.title}</h2>
          <p className="couponExpiry">{props.expiry}</p>
        </div>

        <div className="col-sm-6 col-md-5 col-lg-4 d-flex align-items-start justify-content-end p-2 container pt-4">
          <button className="px-5 btn-custom text-light bg-primary-custom">
            {props.type === "code" ? "Get Code" : "Get Offer"}
          </button>
        </div>
      </div>
    </div>
  );
}
