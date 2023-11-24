import React, { useState } from "react";
import { areDatesOneDayApart, formatDate } from "../../utils/DateUtils";
import CouponModal from "../Modal/CouponModal";

export default function CouponCard(props) {
  const { data } = props;

  const [modalDisplay, setModalDisplay] = useState(false);

  const handleShow = () => setModalDisplay(true);
  const handleClose = () => setModalDisplay(false);

  var limitedTime = false;

  if (areDatesOneDayApart(data.expiry, new Date().getTime())) {
    limitedTime = true;
  }

  return (
    <div className="card shadow p-1 h-100" style={{ width: "200px" }}>
      <a
        className="d-flex align-items-center justify-content-center mb-2 border m-3 hover-image"
        href={`/stores/${data.store}`}
        style={{ height: "98px" }}
      >
        <img
          style={{ width: "60%", height: "100%" }}
          className="p-2 card-img"
          src={data.images[0].image}
          alt=""
        />
      </a>

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
            <a
              onClick={handleShow}
              target="_blank"
              href={data.stores.link}
              className="text-white card-btn bg-primary-custom"
            >
              Get Offer
            </a>
          </div>
          <CouponModal
            data={data}
            display={modalDisplay}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
