import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navigation from "../../Navigation";

export default function AdminStores(props) {
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
    var name = document.getElementById("storeName").value;
    var cats = document.querySelectorAll(".categoryAdd");
    var subCats = document.querySelectorAll(".subCategoryAdd");

    console.log(name);

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
              <i className="bi bi-plus fs-4"></i>ADD STORE
            </button>
          </div>

          <div className="container row py-2">
            <div className="dropdown mb-3 col-6">
              <button
                className="btn btn-outline-secondary lead px-4 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SELECT CATEGORY
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    {}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {}
                  </a>
                </li>
              </ul>
            </div>

            <div className="dropdown col-6">
              <button
                className="btn btn-outline-secondary lead px-4 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SELECT SUBCATEGORY
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    {}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {}
                  </a>
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
                    src="/aliexpress-180x110-1508417884.webp"
                    alt="AliExpress"
                    width="180"
                    height="110"
                  ></img>
                </div>

                <div className="col-xl-6 col-lg-6 container p-2 text-dark">
                  <div className="storeDescription lead my-1 fs-4">
                    AliExpress
                  </div>
                  <div className="storeNumber text-muted mb-1">
                    Number of Coupons : 55
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
                    src="/aliexpress-180x110-1508417884.webp"
                    alt="AliExpress"
                    width="180"
                    height="110"
                  ></img>
                </div>

                <div className="col-xl-6 col-lg-6 container p-2 text-dark">
                  <div className="storeDescription lead my-1 fs-4">
                    AliExpress
                  </div>
                  <div className="storeExpiry text-muted mb-1">
                    Number of Coupons : 55
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ADD STORE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} id="storeForm">
              <Form.Group className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  id="storeName"
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Select
                  name="stores"
                  className="mb-2"
                  id="storeCategory"
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
                <Form.Select
                  name="stores"
                  className="mb-2"
                  id="storeSubCategory"
                >
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

              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              ></Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
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
              form="storeForm"
              onClick={handleClose}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
