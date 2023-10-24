import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navigation from "../../Navigation";
import { getSubCategoriesByCategory } from "../../../../api/CategoriesAPI";
import {
  addStore,
  getStoreByCategory,
  getStoreBySubCategory,
} from "../../../../api/StoresAPI";
import { useDataState } from "../../../../components/Data/DataContext";

export default function AdminStores(props) {
  const dataState = useDataState();

  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [show, setShow] = useState(false);
  const [blocksCategory, setBlocksCategory] = useState([]);
  const [blocksSubcategory, setBlocksSubcategory] = useState([]);
  const [storeCategory, setStoreCategory] = useState("");
  const [storeSubCategory, setStoreSubCategory] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeURL, setStoreURL] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeImage, setStoreImage] = useState();
  const [storesByCategory, setStoresByCategory] = useState();
  const [storesBySubCategory, setStoresBySubCategory] = useState();

  const categoriesData = dataState.categories;
  const storesData = dataState.stores;

  const handleClose = () => {
    setStoreName("");
    setStoreURL("");
    setStoreDescription("");
    setStoreCategory("");
    setStoreSubCategory("");
    setStoreImage();
    setBlocksCategory([]);
    setBlocksSubcategory([]);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (storeCategory) {
      const data = {
        "category-id": Number.parseInt(storeCategory[1]),
      };
      getStoreByCategory(setStoresByCategory, data);
    }
  }, [storeCategory]);

  useEffect(() => {
    if (storeSubCategory) {
      const data = {
        "subcategory-id": Number.parseInt(storeSubCategory[1]),
      };
      getStoreBySubCategory(setStoresBySubCategory, data);
    }
  }, [storeSubCategory]);

  useEffect(() => {
    if (categoriesData && storeCategory) {
      const storeCategoryID = categoriesData.find((category) => {
        return category.name === storeCategory[0];
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
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light categoryAdd"
      >
        {" "}
        {block}{" "}
      </div>
    );
  });

  var storesToShow = storesData;

  if (storeCategory) {
    if (!storesByCategory) {
      storesToShow = [];
    } else {
      storesToShow = storesByCategory;
    }
  }

  if (storeSubCategory) {
    if (!storesBySubCategory) {
      storesToShow = [];
    } else {
      storesToShow = storesBySubCategory;
    }
  }

  console.log("Stores to show: ", storesToShow);

  const storeElements = storesToShow.map((store) => {
    return (
      <div key={store.id} className="my-4 row object">
        <div className="col-xl-3 col-lg-3 img">
          <img
            className=""
            src={store.images[0].image}
            alt="AliExpress"
            width="180"
            height="110"
          ></img>
        </div>

        <div className="col-xl-6 col-lg-6 container p-2 text-dark">
          <div className="storeDescription lead my-1 fs-4">{store.name}</div>
          <div className="storeExpiry text-muted mb-1">
            Number of Coupons : {store.coupons}
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 d-flex align-items-start justify-content-end p-2 container">
          <button className="btn">
            <i className="bi bi-trash-fill fs-2"></i>
          </button>
        </div>
      </div>
    );
  });

  const categorySelectElements = categoriesData.map((category) => {
    return (
      <option key={category.id} value={[category.name, category.id]}>
        {category.name}
      </option>
    );
  });

  const subCategorySelectElements = subCategoriesData.map((subCategory) => {
    return (
      <option key={subCategory.id} value={[subCategory.name, subCategory.id]}>
        {subCategory.name}
      </option>
    );
  });

  const blockElementsSubcategory = blocksSubcategory.map((block) => {
    return (
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light subCategoryAdd"
      >
        {" "}
        {block}{" "}
      </div>
    );
  });

  let addCategory = (e) => {
    if (!storeCategory) return;
    if (blocksCategory.find((block) => block === storeCategory[0])) return;
    setBlocksCategory((prev) => [...prev, storeCategory[0]]);
  };

  let addSubcategory = (e) => {
    if (!storeSubCategory) return;
    if (blocksSubcategory.find((block) => block === storeSubCategory[0]))
      return;
    setBlocksSubcategory((prev) => [...prev, storeSubCategory][0]);
    if (blocksCategory.find((block) => block === storeCategory[0])) return;

    setBlocksCategory((prev) => [...prev, storeCategory[0]]);
  };

  const handleStoreSubCategoryChange = (e) => {
    setStoreSubCategory(e.target.value.split(","));
  };

  const handleStoreCategoryChange = (e) => {
    setStoreCategory(e.target.value.split(","));
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

    formData.append("name", storeName);

    for (let i = 0; i < blocksCategory.length; i++) {
      formData.append("category[]", blocksCategory[i]);
    }
    for (let i = 0; i < blocksSubcategory.length; i++) {
      formData.append("sub_category[]", blocksSubcategory[i]);
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

          <Form>
            <div className="container row py-2 gap-5 ">
              <Form.Group className="row mb-3 col-6 ">
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
              </Form.Group>

              <Form.Group className="row mb-3 col-6">
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
              </Form.Group>
            </div>
          </Form>

          <div className="container mb-4">
            <div className="container objectContainer">{storeElements}</div>
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
