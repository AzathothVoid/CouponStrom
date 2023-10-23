import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navigation from "../../Navigation";
import { addAd } from "../../../../api/AdsAPI";

export default function AdminAdvertisements(props) {
  const [show, setShow] = useState(false);
  const [adImage, setAdImage] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdImageChange = (e) => {
    setAdImage(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData("image", adImage);

    formData.append("image", adImage);

    try {
      const response = addAd(formData);
    } catch (error) {}
  };

  return (
    <>
      <div className="container">
        <Navigation setSection={props.setSection} section={props.section} />

        <div className="container border border-warning mainSection px-4">
          <div className="container py-4">
            <button
              className="btn py-0 btn-outline-secondary lead d-flex align-items-center"
              onClick={handleShow}
            >
              <i className="bi bi-plus fs-4"></i>ADD ADVERTISEMENT
            </button>
          </div>

          <div className="container mb-4">
            <div className="container objectContainer">
              <div className="my-4 row object">
                <img
                  src="/samsung.webp"
                  alt="advert"
                  className="advertImgs p-0"
                />

                <div className="d-flex align-items-center justify-content-center p-2 container">
                  <button className="btn">
                    <i className="bi bi-trash-fill fs-2"></i>
                  </button>
                </div>
              </div>

              <div className="my-4 row object">
                <img
                  src="/samsung.webp"
                  alt="advert"
                  className="advertImgs p-0"
                />

                <div className="d-flex align-items-center justify-content-center p-2 container">
                  <button className="btn">
                    <i className="bi bi-trash-fill fs-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD ADVERTISEMENT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="advertForm">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className="mb-3"
                type="file"
                onChange={handleAdImageChange}
                accept="image/*"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="advertForm"
            onClick={handleClose}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
