import React from "react";
import Navigation from "../../Navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../../../components/Auth/AuthContext";

export default function AdminCoupons(props) {
  const [show, setShow] = useState(false);
  const [blocksCategory, setBlocksCategory] = useState([]);
  const [blocksSubcategory, setBlocksSubcategory] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const blockElementsCategory = blocksCategory.map((block) => {
    return (
      <div className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light categoryAdd">
        {" "}
        {block}{" "}
      </div>
    );
  });

  let addCategory = (e) => {
    const data = e.target.parentElement.parentElement.firstChild.value;

    if (blocksCategory.find((block) => block === data)) return;
    setBlocksCategory((prev) => [
      ...prev,
      e.target.parentElement.parentElement.firstChild.value,
    ]);
  };

  const blockElementsSubcategory = blocksSubcategory.map((block) => {
    return (
      <div className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light subCategoryAdd">
        {" "}
        {block}{" "}
      </div>
    );
  });

  let addSubcategory = (e) => {
    const data = e.target.parentElement.parentElement.firstChild.value;

    if (blocksSubcategory.find((block) => block === data)) return;
    setBlocksSubcategory((prev) => [
      ...prev,
      e.target.parentElement.parentElement.firstChild.value,
    ]);
  };

  const handleSubmit = (event) => {
    var title = document.getElementById("title").value;
    var store = document.getElementById("store").value;
    var expiryDate = document.getElementById("expiryDate").value;
    var code = document.getElementById("code").value;
    var deal = document.getElementById("deal").value;
    var details = document.getElementById("details").value;

    var cats = document.querySelectorAll(".categoryAdd");
    var subCats = document.querySelectorAll(".subCategoryAdd");

    cats.forEach((el) => {
      console.log(el.innerHTML);
    });

    subCats.forEach((el) => {
      console.log(el.innerHTML);
    });

    event.preventDefault();
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
              <i className="bi bi-plus fs-4"></i>ADD COUPON
            </button>
          </div>

          <div className="container py-2">
            <div className="dropdown">
              <button
                className="col-4 btn btn-outline-secondary lead dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SELECT STORE
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#"></a>
                </li>
                <li>
                  <a className="dropdown-item" href="#"></a>
                </li>
                <li>
                  <a className="dropdown-item" href="#"></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="container mb-4">
            <div className="container objectContainer">
              <div className="my-4 row object">
                <div className="col-xl-3 col-lg-3 img">
                  <img
                    className=""
                    src={""}
                    alt=""
                    width="180"
                    height="110"
                  ></img>
                </div>

                <div className="col-xl-6 col-lg-6 container p-2 text-dark">
                  <div className="couponDescription lead fs-4 my-1">
                    Shop Popular Items for up to 70% Off
                  </div>
                  <div className="couponExpiry text-muted mb-1">
                    Expires Mar 31
                  </div>
                  <div
                    className="couponDetails display-5 popupBtn"
                    onClick="showPopup()"
                  >
                    Details:
                    <i
                      className="bi bi-arrow-down-circle"
                      id="detailsArrowIcon"
                    ></i>
                    <span className="popupText">details lao laka</span>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-3 d-flex align-items-start justify-content-end p-2 container">
                  <button className="btn">
                    <i className="bi bi-trash-fill fs-2"></i>
                  </button>
                </div>
              </div>

              <div className="my-4 row object">
                <div className="col-xl-3 col-lg-3 img">
                  <img
                    className=""
                    src={""}
                    alt=""
                    width="180"
                    height="110"
                  ></img>
                </div>

                <div className="col-xl-6 col-lg-6 container p-2 text-dark">
                  <div className="couponDescription lead fs-4 my-1">
                    Shop Popular Items for up to 70% Off
                  </div>
                  <div className="couponExpiry text-muted mb-1">
                    Expires Mar 31
                  </div>
                  <div
                    className="couponDetails display-5 popupBtn"
                    onClick="showPopup()"
                  >
                    Details:
                    <i
                      className="bi bi-arrow-down-circle"
                      id="detailsArrowIcon"
                    ></i>
                    <span className="popupText">details lao laka</span>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-3 d-flex align-items-start justify-content-end p-2 container">
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
          <Modal.Title>ADD COUPON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="couponForm">
            <Form.Group className="mb-4">
              <Form.Label>Coupon Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                autoFocus
                size="lg"
                id="title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select name="store" id="store" required>
                <option>Select Store</option>
                <option>{}</option>
                <option>{}</option>
                <option>{}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" id="expiryDate" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control className="mb-4" type="text" id="code" />
              <Form.Label>Deal</Form.Label>
              <Form.Control className="mb-4" type="text" id="deal" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select
                name="category"
                className="mb-2"
                id="category"
                required
              >
                <option>Select Category</option>
                <option>{}</option>
                <option>{}</option>
                <option>{}</option>
              </Form.Select>

              <div className="container categoryContainer">
                <Button
                  variant="outline-secondary"
                  className="justify-content-center"
                  onClick={addCategory}
                >
                  +
                </Button>
                {blockElementsCategory}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select name="subCategory" className="mb-2" id="subCategory">
                <option>Select SubCategory</option>
                <option>{}</option>
                <option>{}</option>
                <option>{}</option>
              </Form.Select>

              <div className="container subcategoryContainer">
                <Button
                  variant="outline-secondary"
                  className="justify-content-center"
                  onClick={addSubcategory}
                >
                  +
                </Button>
                {blockElementsSubcategory}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                className="mb-3"
                as="textarea"
                rows={4}
                id="details"
              />
              <Form.Control
                className="mb-3"
                type="file"
                accept=".jpeg,.png,.svg,.webp"
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
            form="couponForm"
            onClick={handleClose}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
