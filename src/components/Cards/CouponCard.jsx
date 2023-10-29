import React from "react";
import { areDatesOneDayApart, formatDate } from "../../utils/DateUtils";

export default function CouponCard(props) {
  const { data } = props;

  var limitedTime = false;

  if (areDatesOneDayApart(data.expiry, new Date().getTime())) {
    limitedTime = true;
  }

  return (
    <div className="card shadow p-1 h-100" style={{ width: "200px" }}>
      <div style={{ height: "98px" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          className="ps-2 pe-2 card-img"
          src={data.images[0].image}
          alt=""
        />
      </div>

      <div className="card-body pb-2  pt-1">
        <div class="row mb-2">
          <div className="col-8">
            <h3 className="fs-6">{data.name}</h3>
          </div>
          <div className="col-4 d-flex justify-content-center">
            {data.likes}{" "}
            <i className="bi-heart-fill ms-1" style={{ color: "red" }}></i>
          </div>
        </div>
        <div className="sticky-footer">
          <div class="row">
            <h6
              style={{ fontSize: "0.8rem" }}
              className="couponExpiry opacity-50"
            >
              {!limitedTime ? (
                `Expires ${data.expiry}`
              ) : (
                <span className="badge text-bg-primary ">Limited Time</span>
              )}
            </h6>
          </div>
          <div class="row card-btn-container mt-3">
            <a href="" className="text-white card-btn bg-primary-custom">
              Get Offer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
