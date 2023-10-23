import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navigation from "../../Navigation";
import {
  getAllCategories,
  getSubCategoriesByCategory,
} from "../../../../api/CategoriesAPI";
import { addStore } from "../../../../api/StoresAPI";

export default function AdminStores(props) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [show, setShow] = useState(false);
  const [blocksCategory, setBlocksCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState([]);
  const [blocksSubcategory, setBlocksSubcategory] = useState([]);
  const [storeCategory, setStoreCategory] = useState("");
  const [storeSubCategory, setStoreSubCategory] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeURL, setStoreURL] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeImage, setStoreImage] = useState();

  const handleClose = () => {
    setStoreName("");
    setStoreURL("");
    setStoreDescription("");
    setStoreCategory("");
    setStoreSubCategory("");
    setStoreImage();
    setBlocksCategory([]);
    setBlocksSubcategory([]);
    setSelectedCategoryId([]);
    setSelectedSubCategoryId([]);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    getAllCategories(setCategoriesData);
  }, []);

  useEffect(() => {
    if (categoriesData && storeCategory) {
      const storeCategoryID = categoriesData.find((category) => {
        return category.name === storeCategory;
      }).id;

      const data = {
        "category-id": storeCategoryID,
      };

      try {
        getSubCategoriesByCategory(setSubCategoriesData, data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [storeCategory]);

  const blockElementsCategory = blocksCategory.map((block) => {
    return (
      <div className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light categoryAdd">
        {" "}
        {block}{" "}
      </div>
    );
  });

  const categorySelectElements = categoriesData.map((category) => {
    return <option value={category.name}>{category.name}</option>;
  });

  const subCategorySelectElements = subCategoriesData.map((subCategory) => {
    return <option value={subCategory.name}>{subCategory.name}</option>;
  });

  const blockElementsSubcategory = blocksSubcategory.map((block) => {
    return (
      <div className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light subCategoryAdd">
        {" "}
        {block}{" "}
      </div>
    );
  });

  let addCategory = (e) => {
    if (!storeCategory) return;
    if (blocksCategory.find((block) => block === storeCategory)) return;
    setBlocksCategory((prev) => [...prev, storeCategory]);
  };

  let addSubcategory = (e) => {
    if (!storeSubCategory) return;
    if (blocksSubcategory.find((block) => block === storeSubCategory)) return;
    setBlocksSubcategory((prev) => [...prev, storeSubCategory]);
    if (blocksCategory.find((block) => block === storeCategory)) return;

    setBlocksCategory((prev) => [...prev, storeCategory]);
  };

  const handleStoreSubCategoryChange = (e) => {
    const id = subCategoriesData.find(
      (category) => category.name === e.target.value
    ).id;

    setSelectedSubCategoryId((prev) => [...prev, id]);
    setStoreSubCategory(e.target.value);
  };

  const handleStoreCategoryChange = (e) => {
    const id = categoriesData.find(
      (category) => category.name === e.target.value
    ).id;
    setSelectedCategoryId((prev) => [...prev, id]);
    setStoreCategory(e.target.value);
  };

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };
  const handleStoreURLChange = (e) => {
    setStoreURL(e.target.value);
  };
  const handleStoreDescriptionChange = (e) => {
    setStoreDescription(e.target.value);
  };
  const handleStoreImageChange = (e) => {
    setStoreImage(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (blocksCategory.length === 0 || blocksSubcategory.length === 0) {
      alert("Enter atleast one Category and sub category");
      e;
    }

    let formData = new FormData();

    console.log("Type of CategoryIDs: ", typeof selectedCategoryId);

    formData.append("name", storeName);

    for (let i = 0; i < selectedCategoryId.length; i++) {
      formData.append("category[]", selectedCategoryId[i]);
    }
    for (let i = 0; i < selectedSubCategoryId.length; i++) {
      formData.append("sub_category[]", selectedSubCategoryId[i]);
    }

    formData.append("images", storeImage);
    formData.append("link", storeURL);
    formData.append("description", storeDescription);

    console.log("Form Data: ", formData);
    try {
      const response = addStore(formData);
    } catch (error) {
      console.log(error);
    }

    console.log(response);

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
                  value={storeName}
                  onChange={handleStoreNameChange}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  value={storeURL}
                  onChange={handleStoreURLChange}
                  placeholder="Store URL"
                  id="storeURL"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={storeDescription}
                  onChange={handleStoreDescriptionChange}
                  as="textarea"
                  placeholder="Store Description"
                  id="storeDescription"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Select
                  name="stores"
                  className="mb-2"
                  id="storeCategory"
                  value={storeCategory}
                  onChange={handleStoreCategoryChange}
                  placeholder="Select Category"
                >
                  <option value="" disabled selected>
                    Select a category
                  </option>
                  {categorySelectElements}
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
                  value={storeSubCategory}
                  onChange={handleStoreSubCategoryChange}
                  placeholder="Select SubCategory"
                >
                  {" "}
                  <option value="" disabled selected>
                    Select a subcategory
                  </option>
                  {subCategorySelectElements}
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
                  onChange={handleStoreImageChange}
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
            <Button variant="primary" type="submit" form="storeForm">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
