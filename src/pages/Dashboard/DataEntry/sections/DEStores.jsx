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
  getAllStores,
} from "../../../../api/StoresAPI";
import {
  useDataState,
  useDataDispatch,
} from "../../../../components/Data/DataContext";

export default function DEStores(props) {
  const dataState = useDataState();
  const dataDispatch = useDataDispatch();

  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [show, setShow] = useState(false);

  const [storeCategory, setStoreCategory] = useState("");
  const [storeSubCategory, setStoreSubCategory] = useState("");
  const [storesByCategory, setStoresByCategory] = useState();
  const [storesBySubCategory, setStoresBySubCategory] = useState();
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
    keywords: [],
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
      keywords: [],
      sub_category: [],
      images: "",
    });
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

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

  const deleteCategory = (e) => {
    const category = categoriesData.find(
      (cat) => cat.name === e.target.innerHTML
    );

    setFormData((prev) => {
      return {
        ...prev,
        category: formData.category.filter((cat) => cat !== e.target.innerHTML),
        sub_category: formData.sub_category.filter(
          (subcat) => !category.subcategories.find((sb) => sb.name === subcat)
        ),
      };
    });
  };

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

  const deleteKeywordBlock = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        keywords: prev.keywords.filter(
          (keyword) => keyword !== e.target.innerHTML
        ),
      };
    });
  };

  var storesToShow = storesData;

  console.log("Store category: ", storeCategory);
  console.log("Store subcategory: ", storeSubCategory);
  console.log("Stores by Category: ", storesByCategory);

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
        <div className="col-4 col-sm-3 col-md-2 img p-4 d-flex align-items-center">
          <img
            className="w-100"
            src={store.images[0].image}
            alt="AliExpress"
          ></img>
        </div>

        <div className="col-8 col-sm-9 col-md-10 container p-2 text-dark">
          <div className="storeDescription lead my-1 fs-4">{store.name}</div>
          <div className="storeExpiry text-muted mb-1">
            Number of Coupons : {store.total_coupons}
          </div>
          <div className="storeExpiry text-muted mb-1">
            Number of Deals : {store.total_deals}
          </div>
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
        <span onClick={deleteCategory} className="bi bi-trash">
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

  const keywordBlockElements = formData.keywords.map((block) => {
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

  const addKeyword = (e) => {
    const keywordElement = document.getElementById("keyword");
    const value = keywordElement.value;

    keywordElement.value = "";

    if (formData.keywords.find((block) => block === value)) return;
    setFormData((prev) => {
      return {
        ...prev,
        keywords: [...prev.keywords, value],
      };
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
      alert("Enter atleast one Category and subCategory");
      return;
    }

    for (i = 0; i < formData.category.length; i++) {
      const catData = categoriesData.find(
        (cat) => cat.name === formData.category[i]
      );

      console.log("Cat Data: ", catData);

      if (
        !catData.subcategories.some((subcat) =>
          formData.sub_category.includes(subcat.name)
        )
      ) {
        alert(`Enter atleast one subcategory for the category ${catData.name}`);
        return;
      }
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
    for (let i = 0; i < formData.keywords.length; i++) {
      submission.append("keywords[]", formData.keywords[i]);
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
                  size="6"
                  id="storeCategory"
                  value={storeCategory}
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
                  size="6"
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
                  value={formData.name}
                  name="name"
                  onChange={handleInputChange}
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
                  size="6"
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
