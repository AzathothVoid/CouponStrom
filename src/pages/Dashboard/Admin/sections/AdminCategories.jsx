import React, { useEffect } from "react";
import Navigation from "../../Navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addCategory } from "../../../../api/CategoriesAPI";
import { useDataState } from "../../../../components/Data/DataContext";

export default function AdminCategories(props) {
  const useData = useDataState();

  const [show, setShow] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const categoriesData = useData.categories || [];

  const handleClose = () => {
    setBlocks([]);
    setCategoryName("");
    setCategoryDescription("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const categoryElements = categoriesData.map((category) => {
    return (
      <div key={category.id} className="my-4 row object">
        <div className="col-8 container p-2 ps-4 text-dark">
          <div className="storeDescription lead my-1 fs-4">{category.name}</div>
          <div className="storeExpiry text-muted mb-1">
            Number of Deals : {category.total_deals}
          </div>
          <div className="storeDetails text-muted mb-1">
            Number of Coupons : {category.total_coupons}
          </div>
        </div>
        <div className="col-4 d-flex align-items-start justify-content-end p-2 container">
          <button className="btn">
            <i className="bi bi-trash-fill fs-2"></i>
          </button>
        </div>
      </div>
    );
  });

  const blockElements = blocks.map((block) => {
    return (
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 mt-3 text-light subCategoryAdd"
      >
        {" "}
        {block}{" "}
      </div>
    );
  });

  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);

  const handleCategoryDescriptionChange = (e) =>
    setCategoryDescription(e.target.value);

  const addSubcategory = (e) => {
    const subCatInput = document.getElementById("subCategory").value;

    if (blocks.find((block) => block === subCatInput)) return;
    setBlocks((curr) => [...curr, subCatInput]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addCategory({
        name: categoryName,
        sub_categories: blocks,
        description: categoryDescription,
      });
    } catch (error) {
      console.log(error);
      return;
    }

    handleClose();
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

          <div className="container mb-4">{categoryElements}</div>
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
                value={categoryName}
                onChange={handleCategoryNameChange}
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
                value={categoryDescription}
                onChange={handleCategoryDescriptionChange}
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
