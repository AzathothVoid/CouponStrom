import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TurndownService from "turndown";
import { marked } from "marked";
import Navigation from "../../Navigation";
import { getCompanyInfo, updateCompanyInfo } from "../../../../api/Company";
import {
  useDataState,
  useDataDispatch,
} from "../../../../components/Data/DataContext";

export default function CompanyInfo(props) {
  const dataState = useDataState();
  const dataDispatch = useDataDispatch();

  const companyData = dataState.company;

  const [show, setShow] = useState(false);

  const [companyInfo, setCompanyInfo] = useState(
    {
      aboutUs: companyData.about_us ? marked(companyData.about_us) : "",
      policy: companyData.policy ? marked(companyData.policy) : "",
    } || {}
  );

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const turnDownService = new TurndownService();

  const aboutUsMarkDown = turnDownService.turndown(companyInfo.aboutUs);
  const policyMarkDown = turnDownService.turndown(companyInfo.policy);

  console.log("INFO: ", companyData);
  console.log("Company INFO: ", companyInfo);

  useEffect(() => {
    if (companyData)
      setCompanyInfo({
        aboutUs: marked(companyData.about_us),
        policy: marked(companyData.policy),
      });
  }, [companyData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      aboutUs: aboutUsMarkDown,
      policy: policyMarkDown,
    };

    console.log("DATA TO BE SENT: ", data);

    try {
      updateCompanyInfo(data).then((response) => {
        getCompanyInfo(dataDispatch);
      });
    } catch (error) {
      console.log(error);
      return;
    }
    handleClose();
  };

  const handleAboutUsChange = (value) => {
    setCompanyInfo((prev) => {
      return { ...prev, aboutUs: value };
    });
  };

  const handlePolicyChange = (value) => {
    setCompanyInfo((prev) => {
      return { ...prev, policy: value };
    });
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
                  value={companyInfo.aboutUs}
                  onChange={handleAboutUsChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Policy</Form.Label>
              <div>
                <ReactQuill
                  theme="snow"
                  value={companyInfo.policy}
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
