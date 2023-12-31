import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TurndownService from "turndown";
import ReactMarkDown from "react-markdown";
import Navigation from "../../Navigation";
import { addBlog, deleteBlogById, getBlogs } from "../../../../api/BlogsAPI";
import {
  useDataState,
  useDataDispatch,
} from "../../../../components/Data/DataContext";

export default function AdminBlogs(props) {
  const dataState = useDataState();
  const dataDispatch = useDataDispatch();

  const [show, setShow] = useState(false);
  const [callDelete, setCallDelete] = useState(null);
  const [keywordBlocks, setKeywordBlocks] = useState([]);

  const [text, setText] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState();
  const [blogDescription, setBlogDescription] = useState("");

  const [search, setSearch] = useState("");

  let blogData = dataState.blogs || [];

  const handleClose = () => {
    setText("");
    setBlogTitle("");
    setBlogImage();
    setBlogDescription("");
    setKeywordBlocks([]);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  if (search) {
    blogData = blogData.filter((blog) => {
      return blog.title.toLowerCase().includes(search.toLowerCase());
    });
  }

  useEffect(() => {
    if (callDelete) {
      try {
        const response = deleteBlogById({ id: callDelete }).then((response) => {
          getBlogs(dataDispatch);
          setCallDelete(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [callDelete]);

  const deleteKeywordBlock = (e) => {
    setKeywordBlocks((prev) => {
      return prev.filter((keyword) => keyword !== e.target.innerHTML);
    });
  };

  const deleteBlog = (e, blogID) => {
    e.preventDefault();
    console.log("Blog ID: ", blogID);
    setCallDelete(blogID);
  };

  const turnDownService = new TurndownService();

  const markDown = turnDownService.turndown(text);

  const blogsElements = blogData.map((blog) => {
    return (
      <div key={blog.id} className="my-4 row object">
        <div className="col-8 container p-2 ps-4 text-dark">
          <div className="blogTitle lead my-1 fs-4">{blog.title}</div>
          <div className="blogDate text-muted mb-1">
            Date Modified : {new Date(blog.updated_at).toUTCString()}
          </div>
        </div>

        <div className="col-4 d-flex align-items-start justify-content-end p-2 container">
          <button onClick={(e) => deleteBlog(e, blog.id)} className="btn">
            <i className="bi bi-trash-fill fs-2"></i>
          </button>
        </div>
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

  const addKeyword = (e) => {
    const keywordElement = document.getElementById("keyword");
    const value = keywordElement.value;

    keywordElement.value = "";

    if (keywordBlocks.find((block) => block === value)) return;
    setKeywordBlocks((curr) => [...curr, value]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append("image", blogImage);
    formData.append("text", markDown);
    formData.append("title", blogTitle);
    formData.append("description", blogDescription);
    for (let i = 0; i < keywordBlocks.length; i++) {
      formData.append("keywords[]", keywordBlocks[i]);
    }

    try {
      addBlog(formData).then((response) => {
        getBlogs(dataDispatch);
      });
    } catch (error) {
      console.log(error);
      return;
    }
    handleClose();
  };

  const handleBlogImageChange = (event) => {
    setBlogImage(event.target.files[0]);
  };
  const handleBlogTitleChange = (event) => {
    setBlogTitle(event.target.value);
  };

  const handleBlogDescriptionChange = (event) => {
    setBlogDescription(event.target.value);
  };

  const handleQuillChange = (value) => {
    setText(value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
              <i className="bi bi-plus fs-4"></i>ADD BLOG
            </button>
          </div>

          <div className="container py-2">
            <div className="form-outline">
              <input
                type="search"
                id="form1"
                value={search}
                onChange={handleSearchChange}
                className="form-control"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="container mb-4">
            <div className="container objectContainer">{blogsElements}</div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD BLOG</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="blogForm">
            <Form.Group className="mb-3">
              <Form.Label>BLOG TITLE</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                id="blogTitle"
                value={blogTitle}
                onChange={handleBlogTitleChange}
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
              <Form.Label>BLOG DESCRIPTION</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                id="blogDescription"
                value={blogDescription}
                onChange={handleBlogDescriptionChange}
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enter Text Here</Form.Label>

              <div style={{ minHeight: "400px" }}>
                <ReactQuill
                  theme="snow"
                  value={text}
                  onChange={handleQuillChange}
                />
              </div>

              <Form.Control
                className="mb-3"
                type="file"
                accept="image/*"
                name="blogimage"
                onChange={handleBlogImageChange}
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
            form="blogForm"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
