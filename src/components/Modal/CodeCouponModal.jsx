import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CodeCouponModal(props) {
  return (
    <>
      <Modal size="lg" show={props.display} onHide={props.handleClose}>
        <Modal.Header className="fs-3 text-capitalize" closeButton>
          Success
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
          <i className="fs-1 bi bi-hand-thumbs-up text-primary"></i>
          <Modal.Title>Code Successfully Copied!</Modal.Title>
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
