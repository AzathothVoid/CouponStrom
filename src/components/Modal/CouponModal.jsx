import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CouponModal(props) {
  const data = props.data;
  const codeToCopyRef = useRef(null);

  const handleCopyClick = (e) => {
    if (codeToCopyRef.current) {
      codeToCopyRef.current.select();
      navigator.clipboard.writeText(codeToCopyRef.current.value).then(() => {
        e.target.innerHTML = "Text Copied!";
      });
    }
  };

  return (
    <>
      <Modal size="lg" show={props.display} onHide={props.handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Header className="d-flex flex-column align-items-center">
          <div style={{ maxWidth: "25%" }}>
            <img className="mw-100" src={data.image} alt="" />
          </div>
          <Modal.Title className="mb-4">{data.title}</Modal.Title>
          <div className="mb-4">
            {data.type === "coupon" ? (
              <div className="d-flex">
                <input
                  style={{ width: "fit-content" }}
                  class="form-control text-center shadow-none"
                  type="text"
                  value={data.code}
                  readOnly
                  ref={codeToCopyRef}
                ></input>
                <button
                  onClick={handleCopyClick}
                  className="btn btn-primary btn-search-secondary"
                >
                  Copy
                </button>
              </div>
            ) : (
              <a className="link-primary fw-bold fs-5" href={data.deal}>
                Get Offer
              </a>
            )}
          </div>
          <a className="link-primary fw-bold fs-6" href={data.url}>
            Continue to offer
          </a>
          <h4 className="my-3">Copy code and continue to offer</h4>
        </Modal.Header>
        <Modal.Body className="px-4">
          <div>
            <h3 className="mb-2">Details</h3>
            <p>{data.details}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 my-4 border-top pt-4">
            <p className="m-0">Share on</p>
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20coupon%20on%20MyCouponSite:%20https://couponstrom.com/"
              target="_blank"
            >
              <img src={`/socialMediaIcons/twitter.svg`} alt="" />
            </a>

            <div
              className="fb-share-button"
              data-href="https://couponstrom.com"
              data-layout=""
              data-size=""
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcouponstrom.com%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
              >
                <img src={`/socialMediaIcons/facebook.svg`} alt="" />
              </a>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
