import React from "react";
import { useState } from "react";
import { areDatesOneDayApart } from "../utils/DateUtils";
import CodeCouponModal from "./Modal/CodeCouponModal";
import ShareCouponModal from "./Modal/ShareCouponModal";

export default function GeneralCoupon(props, { btn = true }) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [shareModalDisplay, setShareModalDisplay] = useState(false);

  const data = props.data;
  const expiry = new Date(data.expiry);

  const handleShow = async () => {
    await navigator.clipboard.writeText(data.code);
    setModalDisplay(true);
    window.open(data.stores.link, "_blank");
  };

  const getOffer = () => {
    window.open(data.deal, "_blank");
  };

  const handleShareOpen = () => {
    setShareModalDisplay(true);
  };

  const handleShareClose = () => setShareModalDisplay(false);

  const handleClose = () => setModalDisplay(false);

  const handleShowSmallScreen = (event) => {
    event.stopPropagation();
    if (window.screen.width < 576) {
      setModalDisplay(true);
      return;
    }
  };

  const handleReadMore = (event) => {
    const detailsElement = document.getElementById(`details${data.id}`);

    detailsElement.classList.toggle("collapsible--expanded");
  };

  let limitedTime = false;

  if (areDatesOneDayApart(data.expiry, new Date().getTime())) {
    limitedTime = true;
  }

  return (
    <div className="container-md pe-0 ">
      <div className="container-fluid pe-0 row">
        <div className="container-fluid row shadow bg-white">
          <a
            href={`/stores/${data.stores.name}/${data.store}`}
            target="_blank"
            style={{ maxWidth: "150px", height: "98px" }}
            className="col-4 col-sm-3 mt-3 d-flex flex-column align-items-center border justify-content-center hover-image img"
          >
            <img
              style={{ width: "60%", maxHeight: "100%" }}
              className="p-2 card-img "
              src={data.images[0].image}
              alt=""
            />
          </a>

          <div
            onClick={handleShowSmallScreen}
            className="col-8 col-sm-6 container-fluid p-2 text-dark"
          >
            <div className="couponDescription mt-1 mb-2 lead fs-5">
              {data.name}
              <div>
                {!limitedTime ? null : (
                  <span
                    style={{ fontSize: "1rem" }}
                    className="badge me-2 text-bg-success"
                  >
                    Limited Time
                  </span>
                )}
                <span
                  style={{ fontSize: "1rem" }}
                  className="badge me-2 text-bg-primary"
                >
                  {data.type == "coupon" ? "Code" : "Deal"}
                </span>
              </div>
            </div>
            <div className="couponExpiry text-muted mb-2">
              <i className="bi bi-clock me-2"></i>

              {`${expiry.toDateString()} ${expiry.toLocaleTimeString()}`}
            </div>
            <div className="d-inline-block">
              <div
                id={`details${data.id}`}
                className="collapsible text-success hover-mouse"
              >
                <div
                  style={{ width: "fit-content" }}
                  className="d-flex align-items-center"
                  onClick={handleReadMore}
                >
                  <h3
                    id={`readMoreButton${data.id}`}
                    className="fs-6 me-2 d-inline-block"
                  >
                    Read More
                  </h3>
                  <div className="collapsible__chevron d-inline-block">
                    <i
                      id={`readMoreChevron${data.id}`}
                      className="bi bi-chevron-double-right"
                    ></i>
                  </div>
                </div>
                <p className="collapsible__content text-black p-0 details rounded w-100">
                  {data.details}
                </p>
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column align-items-end justify-content-between p-2 container">
            <button
              onClick={data.type == "coupon" ? handleShow : getOffer}
              className="d-none d-sm-flex px-4 btn text-light bg-primary-custom hover-button"
            >
              {data.type === "coupon" ? "Get Code" : "Get Offer"}
            </button>
            <div className="hover-mouse" onClick={handleShareOpen}>
              <i className="bi bi-share"></i>
            </div>
          </div>

          <CodeCouponModal
            data={data}
            display={modalDisplay}
            handleClose={handleClose}
          />
          <ShareCouponModal
            data={data}
            display={shareModalDisplay}
            handleClose={handleShareClose}
          />
        </div>
      </div>
    </div>
  );
}
