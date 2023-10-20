import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CouponModal(props) {
  const data = props.data;
  const codeToCopyRef = useRef(null);

  const handleCopyClick = () => {
    if (codeToCopyRef.current) {
      codeToCopyRef.current.select();
      navigator.clipboard.writeText(codeToCopyRef.current.value).then(() => {
        alert("Text Copied To Clip Board");
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
        </Modal.Header>
        <Modal.Body className="px-4">
          <div>
            <h3 className="mb-2">Details</h3>
            <p>{data.details}</p>
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
