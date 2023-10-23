import React from "react";
import Navigation from "../../Navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addCategory, getAllCategories } from "../../../../api/CategoriesAPI";

export default function AdminCategories(props) {
  const [show, setShow] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("Categories: ", getAllCategories());

  const blockElements = blocks.map((block) => {
    return (
      <div className="d-inline-flex bg-secondary border border-dark p-1 m-1 mt-3 text-light subCategoryAdd">
        {" "}
        {block}{" "}
      </div>
    );
  });

  let addSubcategory = (e) => {
    const subCatInput = document.getElementById("subCategory").value;

    if (blocks.find((block) => block === subCatInput)) return;
    setBlocks((curr) => [...curr, subCatInput]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    try {
      const response = await addCategory({
        name: category,
        sub_categories: blocks,
        description: description,
      });
    } catch (error) {
      console.log(error);
      setBlocks([]);
    }

    setBlocks([]);
    setShow(false);
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
              <i className="bi bi-plus fs-4"></i>ADD CATEGORY
            </button>
          </div>

          <div className="container mb-4">
            <div className="container objectContainer">
              <div className="my-4 row object">
                <div className="col-8 container p-2 ps-4 text-dark">
                  <div className="storeDescription lead my-1 fs-4">FOOD</div>
                  <div className="storeExpiry text-muted mb-1">
                    Number of Stores : 48
                  </div>
                  <div className="storeDetails text-muted mb-1">
                    Number of Coupons : 87
                  </div>
                </div>

                <div className="col-4 d-flex align-items-start justify-content-end p-2 container">
                  <button className="btn">
                    <i className="bi bi-trash-fill fs-2"></i>
                  </button>
                </div>
              </div>

              <div className="my-4 row object">
                <div className="col-8 container p-2 ps-4 text-dark">
                  <div className="categoryDescription lead my-1 fs-4">FOOD</div>
                  <div className="categoryNumbers text-muted mb-1">
                    Number of Stores : 48
                  </div>
                  <div className="categoryNumbers text-muted mb-1">
                    Number of Coupons : 87
                  </div>
                </div>

                <div className="col-4 d-flex align-items-start justify-content-end p-2 container">
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
          <Modal.Title>ADD CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="categoriesForm">
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                id="category"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Description"
                id="description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add a subcategory</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subcategory"
                id="subCategory"
              />
            </Form.Group>
          </Form>

          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              onClick={addSubcategory}
              className="mt-3"
            >
              ADD SUBCATEGORY
            </Button>
            {blockElements}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="categoriesForm">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
