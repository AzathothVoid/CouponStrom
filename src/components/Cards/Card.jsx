import React from "react";

export default function Card(props) {
  const { data, limitedTime } = props;

  return (
    <div className="card shadow p-1" style={{ width: "200px" }}>
      <div style={{ height: "98px" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          className="ps-2 pe-2 card-img"
          src={`/${data.image}`}
          alt=""
        />
      </div>

      <div className="card-body pb-2  pt-1">
        <div class="row mb-2">
          <div className="col-8">
            <h3 className="fs-6">{data.title}</h3>
          </div>
          <div className="col-4 d-flex justify-content-center">
            {data.likes}{" "}
            <i className="bi-heart-fill" style={{ color: "red" }}></i>
          </div>
        </div>
        {props.type === "coupon" ? (
          <div className="sticky-footer">
            <div class="row ">
              <h6
                style={{ fontSize: "0.8rem", opacity: "0.4" }}
                className="couponExpiry"
              >
                {!limitedTime ? `Expires ${data.expiry}` : "Ends Tommorow"}
              </h6>
            </div>
            <div class="row card-btn-container mt-3">
              <a href="" className="text-white card-btn bg-primary-custom">
                Get Offer
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/*
<div className="container card">
      <div className="row card-image-top">
        <img src="aliexpress.webp" alt="" />
      </div>
      <div className="row">
        <div className="row">
          <div className="col-*-6">Get upto 40% off!</div>
          <div className="col-*-6">
            148 <i className="bi-heart"></i>
          </div>
        </div>
        <div className="row">Expires 25-11-2023</div>
      </div>
      <div className="row">
        <div className="btn">Get Offer</div>
      </div>
    </div>
*/
