import React, { useEffect } from "react";
import Navigation from "../../Navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addCategory, getAllCategories } from "../../../../api/CategoriesAPI";
import {
  useDataState,
  useDataDispatch,
} from "../../../../components/Data/DataContext";

export default function DECategories(props) {
  const useData = useDataState();
  const dispatchData = useDataDispatch();

  const [show, setShow] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [keywordBlocks, setKeywordBlocks] = useState([]);

  const categoriesData = useData.categories || [];

  const handleClose = () => {
    setBlocks([]);
    setCategoryName("");
    setCategoryDescription("");
    setKeywordBlocks([]);
    setCategoryImage(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const deleteSubCategory = (e) => {
    setBlocks((prev) => {
      return prev.filter((cat) => cat !== e.target.innerHTML);
    });
  };

  const deleteKeywordBlock = (e) => {
    setKeywordBlocks((prev) => {
      return prev.filter((keyword) => keyword !== e.target.innerHTML);
    });
  };

  const categoryElements = categoriesData.map((category) => {
    return (
      <div key={category.id} className="my-4 object">
        <div className="container p-2 ps-4 text-dark">
          <div className="fs-6 d-flex align-items-center">
            <div
              className="me-2 p-2"
              style={{
                background: "#f1f1f1",
                borderRadius: "100%",
                width: "40px",
              }}
            >
              {category.images.length > 0 ? (
                <img className="w-100" src={category.images[0].image} alt="" />
              ) : null}
            </div>
            <div className="storeDescription lead my-1 fs-4">
              {category.name}
            </div>
          </div>
          <div className="storeExpiry text-muted mb-1">
            Number of Deals : {category.total_deals}
          </div>
          <div className="storeDetails text-muted mb-1">
            Number of Coupons : {category.total_coupons}
          </div>
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
        <span onClick={deleteSubCategory} className="bi bi-trash">
          {block}
        </span>
      </div>
    );
  });

  const keywordBlockElements = keywordBlocks.map((block) => {
    return (
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 mt-3 text-light subCategoryAdd"
      >
        <span onClick={deleteKeywordBlock} className="bi bi-trash">
          {block}
        </span>
      </div>
    );
  });

  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);

  const handleCategoryDescriptionChange = (e) =>
    setCategoryDescription(e.target.value);

  const handleFileChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const addSubcategory = (e) => {
    const subCatInput = document.getElementById("subCategory");
    const value = subCatInput.value;

    subCatInput.value = "";
    if (blocks.find((block) => block === value)) return;
    setBlocks((curr) => [...curr, value]);
  };

  const addKeyword = (e) => {
    const keywordElement = document.getElementById("keyword");
    const value = keywordElement.value;

    keywordElement.value = "";

    if (keywordBlocks.find((block) => block === value)) return;
    setKeywordBlocks((curr) => [...curr, value]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (blocks.length === 0) {
      alert("Enter atleast one Category and sub category");
      return;
    }

    try {
      let formData = new FormData();

      formData.append("name", categoryName);

      for (let i = 0; i < blocks.length; i++) {
        formData.append("sub_categories[]", blocks[i]);
      }
      for (let i = 0; i < keywordBlocks.length; i++) {
        formData.append("keywords[]", keywordBlocks[i]);
      }

      formData.append("descripton", categoryDescription);
      formData.append("images", categoryImage);

      addCategory(formData).then((response) => {
        getAllCategories(dispatchData);
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
          <Form autoComplete="off" onSubmit={handleSubmit} id="categoriesForm">
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
              <Form.Label>Keywords</Form.Label>
              <Form.Control type="text" placeholder="Keyword" id="keyword" />
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={addKeyword}
                  className="mt-3"
                >
                  ADD KEYWORD
                </Button>
              </div>
              {keywordBlockElements}
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
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={addSubcategory}
                  className="mt-3"
                >
                  ADD SUBCATEGORY
                </Button>
              </div>
              {blockElements}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Icon Image</Form.Label>
              <Form.Control
                className="mb-3"
                type="file"
                onChange={handleFileChange}
                name="images"
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
          <Button variant="primary" type="submit" form="categoriesForm">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
