import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { userRegistration } from "../../api/UsersAPI";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/UsersAPI";
import ErrorModal from "../../components/Modal/ErrorModal";

export default function Registration() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasswor] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPasswor(e.target.value);

  const handleClose = () => setShow(false);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await userRegistration(
        name,
        email,
        password,
        confirmPassword
      );

      console.log(response);
      setShow(true);
    } catch (error) {
      console.log("Error: ", error);
      setErrorData(error.response.data.errors);
      setErrorModal(true);
    }
  };

  const handleCodeChange = (e) => setCode(e.target.value);
  const handleLogin = (e) => {
    navigate("/auth/login");
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      code: code,
    };
    try {
      const response = await verifyEmail(data);

      const register = await userRegistration(
        name,
        email,
        password,
        confirmPassword
      );

      if (register.status === 201) {
        setShow(false);
        handleLogin();
      }
    } catch (error) {
      setShow(false);
      setErrorData(error);
      setErrorModal(true);
    }
  };

  const handleModalClose = () => setErrorModal(false);

  return (
    <div className="container object formWrapper my-3 p-4">
      <div className="container d-flex align-items-center justify-content-center">
        <i className="bi bi-person-fill display-1"></i>
      </div>

      <Form className="container mb-4">
        <Form.Label className="d-flex justify-content-center display-6">
          REGISTRATION
        </Form.Label>

        <Form.Group className="container row my-4">
          <div className="namesForm">
            <Form.Label className="fs-5">Full Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Full name"
              className="container col-6"
            ></Form.Control>
          </div>
        </Form.Group>

        <Form.Group className="container my-4">
          <Form.Label className="fs-5">Email</Form.Label>
          <Form.Control
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="abc@gmail.com"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="container my-4">
          <Form.Label className="fs-5">Password</Form.Label>
          <Form.Control
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            className="my-2"
          ></Form.Control>
          <Form.Control
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type="password"
            placeholder="Repeat password"
            className="my-2"
          ></Form.Control>
        </Form.Group>
      </Form>

      <div className="container d-flex justify-content-center gap-5">
        <Button
          className="px-4"
          onClick={handleRegistration}
          type="submit"
          variant="primary"
        >
          Register
        </Button>
        <Button
          className="px-4"
          onClick={handleLogin}
          type="button"
          variant="primary"
        >
          Log in
        </Button>
      </div>

      <ErrorModal
        data={errorData}
        display={errorModal}
        handleClose={handleModalClose}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>VERIFICATION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="false" id="verificationForm">
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label>
                The verification code has been sent to your email. Please check
                your inbox. If not found check your spam folder.
              </Form.Label>
              <Form.Label>Enter the verification code below.</Form.Label>
              <div className="container">
                <Form.Label className="fs-5 mb-3">
                  Verification Code:
                </Form.Label>
                <Form.Control
                  value={code}
                  onChange={handleCodeChange}
                  type="text"
                  min={6}
                  max={6}
                  required
                  autoComplete="false"
                ></Form.Control>
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
            form="verificationForm"
            onClick={verifyCode}
          >
            Verify Code
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
