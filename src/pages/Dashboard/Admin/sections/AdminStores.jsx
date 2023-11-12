import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navigation from "../../Navigation";
import { getSubCategoriesByCategory } from "../../../../api/CategoriesAPI";
import {
  addStore,
  getAllStores,
  getStoreByCategory,
  getStoreBySubCategory,
  deleteStoreById,
} from "../../../../api/StoresAPI";
import {
  useDataState,
  useDataDispatch,
} from "../../../../components/Data/DataContext";

export default function AdminStores(props) {
  const dataState = useDataState();
  const dataDispatch = useDataDispatch();

  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [show, setShow] = useState(false);
  const [callDelete, setCallDelete] = useState(null);

  const [storeCategory, setStoreCategory] = useState("");
  const [storeSubCategory, setStoreSubCategory] = useState("");
  const [storesByCategory, setStoresByCategory] = useState();
  const [storesBySubCategory, setStoresBySubCategory] = useState();
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
    category: [],
    sub_category: [],
    images: null,
  });

  const categoriesData = dataState.categories;
  const storesData = dataState.stores;

  const handleClose = () => {
    setStoreCategory("");
    setStoreSubCategory("");

    setFormData({
      name: "",
      link: "",
      description: "",
      category: [],
      sub_category: [],
      images: "",
    });
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (callDelete) {
      try {
        deleteStoreById({ id: callDelete }).then((response) => {
          window.location.reload();
        });
      } catch (error) {}
    }
  }, [callDelete]);

  useEffect(() => {
    if (storeCategory.length > 1) {
      const data = {
        "category-id": Number.parseInt(storeCategory[1]),
      };
      getStoreByCategory(data).then((response) => {
        setStoresByCategory(response);
      });
    } else {
      setStoresByCategory([]);
    }
  }, [storeCategory]);

  useEffect(() => {
    if (storeSubCategory.length > 1) {
      const data = {
        "subcategory-id": Number.parseInt(storeSubCategory[1]),
      };
      getStoreBySubCategory(data).then((response) => {
        setStoresBySubCategory(response);
      });
    } else {
      setStoresBySubCategory([]);
    }
  }, [storeSubCategory]);

  useEffect(() => {
    if (storeCategory.length > 1) {
      const data = {
        "category-id": storeCategory[1],
      };

      try {
        getSubCategoriesByCategory(setSubCategoriesData, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSubCategoriesData([]);
    }
  }, [storeCategory]);

  const deleteSubCategory = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        sub_category: formData.sub_category.filter(
          (cat) => cat !== e.target.innerHTML
        ),
      };
    });
  };

  const deleteStore = (e, storeID) => {
    e.preventDefault();
    setCallDelete(storeID);
  };

  var storesToShow = storesData;

  if (storeCategory.length > 1) {
    if (!storesByCategory) {
      storesToShow = [];
    } else {
      storesToShow = storesByCategory;
    }
  }

  if (storeSubCategory.length > 1) {
    if (!storesBySubCategory) {
      storesToShow = [];
    } else {
      storesToShow = storesBySubCategory;
    }
  }

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
            Number of Coupons : {store.total_coupons}
          </div>
          <div className="storeExpiry text-muted mb-1">
            Number of Deals : {store.total_deals}
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 d-flex align-items-start justify-content-end p-2 container">
          <button onClick={(e) => deleteStore(e, store.id)} className="btn">
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

  const blockElementsCategory = formData.category.map((block) => {
    return (
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light categoryAdd"
      >
        <span onClick={deleteSubCategory} className="bi bi-trash">
          {block}
        </span>
      </div>
    );
  });

  const blockElementsSubcategory = formData.sub_category.map((block) => {
    return (
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light subCategoryAdd"
      >
        <span onClick={deleteSubCategory} className="bi bi-trash">
          {block}
        </span>
      </div>
    );
  });

  const addCategory = (e) => {
    if (!storeCategory) return;
    if (formData.category.find((block) => block === storeCategory[0])) return;
    setFormData((prev) => {
      return { ...prev, category: [...prev.category, storeCategory[0]] };
    });
  };

  const addSubcategory = (e) => {
    if (!storeSubCategory) return;
    if (formData.sub_category.find((block) => block === storeSubCategory[0]))
      return;

    setFormData((prev) => {
      return {
        ...prev,
        sub_category: [...prev.sub_category, storeSubCategory[0]],
      };
    });
    if (formData.category.find((block) => block === storeCategory[0])) return;

    setFormData((prev) => {
      return { ...prev, category: [...prev.category, storeCategory[0]] };
    });
  };

  const handleStoreSubCategoryChange = (e) => {
    setStoreSubCategory(e.target.value.split(","));
  };

  const handleStoreCategoryChange = (e) => {
    setStoreSubCategory("");
    setStoreCategory(e.target.value.split(","));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...formData, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    console.log("Image: ", e.target.files[0]);
    setFormData((prev) => {
      return { ...formData, images: e.target.files[0] };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.category.length === 0 || formData.sub_category.length === 0) {
      alert("Enter atleast one Category and sub category");
      return;
    }

    console.log("Form Data: ", formData);

    let submission = new FormData();

    submission.append("name", formData.name);

    for (let i = 0; i < formData.category.length; i++) {
      submission.append("category[]", formData.category[i]);
    }
    for (let i = 0; i < formData.sub_category.length; i++) {
      submission.append("sub_category[]", formData.sub_category[i]);
    }

    submission.append("images", formData.images);
    submission.append("link", formData.link);
    submission.append("description", formData.description);

    console.log("Form Data: ", formData);
    try {
      addStore(submission).then((response) => {
        getAllStores(dataDispatch);
      });
    } catch (error) {
      console.log("ERROR: ", error);
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
                  size="6"
                  onChange={handleStoreCategoryChange}
                  placeholder="Select Category"
                >
                  <option value="" selected>
                    Show all stores
                  </option>
                  {categorySelectElements}
                </Form.Select>
              </Form.Group>

              <Form.Group className="row mb-3 col-6">
                <Form.Select
                  name="stores"
                  className="mb-2"
                  id="storeSubCategory"
                  size="6"
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
            <Form autoComplete="off" onSubmit={handleSubmit} id="storeForm">
              <Form.Group className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  id="storeName"
                  value={formData.name}
                  name="name"
                  onChange={handleInputChange}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="Store URL"
                  name="link"
                  id="storeURL"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={formData.description}
                  onChange={handleInputChange}
                  as="textarea"
                  placeholder="Store Description"
                  name="description"
                  id="storeDescription"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Select
                  name="stores"
                  className="mb-2"
                  size="6"
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
                  size="6"
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
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
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
            <Button variant="primary" type="submit" form="storeForm">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
