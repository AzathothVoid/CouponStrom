import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ErrorModal(props) {
  const data = props.data;

  return (
    <>
      <Modal show={props.display} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${data} entered successfuly!`}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
