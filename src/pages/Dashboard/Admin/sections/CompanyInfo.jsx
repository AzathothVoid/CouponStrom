import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TurndownService from "turndown";
import ReactMarkDown from "react-markdown";
import Navigation from "../../Navigation";
import { getCompanyInfo, updateCompanyInfo } from "../../../../api/Company";
import {
  useDataState,
  useDataDispatch,
} from "../../../../components/Data/DataContext";

export default function CompanyInfo(props) {
  const dataState = useDataState();
  const dataDispatch = useDataDispatch();

  const [show, setShow] = useState(false);

  const [aboutUsText, setAboutUsText] = useState(
    dataState.company.aboutUs || ""
  );
  const [policyText, setPolicyText] = useState(dataState.company.policy || "");

  const handleClose = () => {
    setAboutUsText("");
    setPolicyText("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const turnDownService = new TurndownService();

  const aboutUsMarkDown = turnDownService.turndown(aboutUsText);
  const policyMarkDown = turnDownService.turndown(policyText);

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append("aboutUs", aboutUsMarkDown);
    formData.append("policy", policyMarkDown);

    try {
      updateCompanyInfo(formData).then((response) => {
        getCompanyInfo(dataDispatch);
      });
    } catch (error) {
      console.log(error);
      return;
    }
    handleClose();
  };

  const handleAboutUsChange = (value) => {
    setAboutUsText(value);
  };

  const handlePolicyChange = (value) => {
    setPolicyText(value);
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
              <i className="bi bi-plus fs-4"></i>UPDATE INFO
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE COMPANY INFO</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="blogForm">
            <Form.Group className="mb-3">
              <Form.Label>About Us</Form.Label>
              <div>
                <ReactQuill
                  theme="snow"
                  value={aboutUsText}
                  onChange={handleAboutUsChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Policy</Form.Label>
              <div>
                <ReactQuill
                  theme="snow"
                  value={policyText}
                  onChange={handlePolicyChange}
                />
              </div>
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
