import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navigation from "../../Navigation";
import { addAd, deleteAdById } from "../../../../api/AdsAPI";
import { useDataState } from "../../../../components/Data/DataContext";

export default function AdminAdvertisements(props) {
  const dataState = useDataState();

  const [show, setShow] = useState(false);
  const [callDelete, setCallDelete] = useState(null);

  const [adImage, setAdImage] = useState();

  const adData = dataState.ads || [];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (callDelete) {
      try {
        const response = deleteAdById({ id: callDelete }).then((response) => {
          window.location.reload();
        });
      } catch (error) {}
    }
  }, [callDelete]);

  const handleAdImageChange = (e) => {
    setAdImage(e.target.files[0]);
  };

  const deleteAd = (e, adID) => {
    e.preventDefault();
    setCallDelete(adID);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", adImage);

    try {
      const response = await addAd(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const adElements = adData.map((ad) => {
    return (
      <div key={ad.id} className="my-4 row object">
        <img src={ad.images[0].image} alt="advert" className="advertImgs p-0" />

        <div className="d-flex align-items-center justify-content-center p-2 container">
          <button onClick={(e) => deleteAd(e, ad.id)} className="btn">
            <i className="bi bi-trash-fill fs-2"></i>
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container">
        <Navigation
          sections={props.sections}
          setSection={props.setSection}
          section={props.section}
        />

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
            <div className="container objectContainer">{adElements}</div>
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
