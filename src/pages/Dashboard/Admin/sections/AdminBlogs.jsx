import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TurndownService from "turndown";
import ReactMarkDown from "react-markdown";
import Navigation from "../../Navigation";

export default function AdminBlogs(props) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const turnDownService = new TurndownService();

  const markDown = turnDownService.turndown(text);

  const handleSubmit = (event) => {
    event.preventDefault();
    var title = document.getElementById("blogTitle").value;

    console.log(markDown);

    const data = {
      title: title,
      text: markDown,
    };

    console.log(data);
    setText("");
  };

  const handleChange = (event) => {
    event.value = event.target.value;
  };

  const handleQuillChange = (value) => {
    setText(value);
  };

  return (
    <>
      <ReactMarkDown>{markDown}</ReactMarkDown>

      <div className="container">
        <Navigation setSection={props.setSection} section={props.section}/>

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
                className="form-control"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="container mb-4">
            <div className="container objectContainer">
              <div className="my-4 row object">
                <div className="col-8 container p-2 ps-4 text-dark">
                  <div className="blogTitle lead my-1 fs-4">
                    How To Use a Coupon?
                  </div>
                  <div className="blogDate text-muted mb-1">
                    Date Modified : 24/5/2021
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
                  <div className="blogTitle lead my-1 fs-4">
                    How To Use a Coupon?
                  </div>
                  <div className="blogDate text-muted mb-1">
                    Date Modified : 24/5/2021
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
          <Modal.Title>ADD BLOG</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit} id="blogForm">
            <Form.Group className="mb-3">
              <Form.Label>BLOG TITLE</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                id="blogTitle"
                onChange={handleChange}
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
            form="blogForm"
            onClick={handleClose}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}