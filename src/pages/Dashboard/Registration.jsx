import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userRegistration } from "../../api/UsersAPI";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modal/ErrorModal";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasswor] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPasswor(e.target.value);

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
    } catch (error) {
      console.log(error);
      setErrorData(error.response.data.error);
      setErrorModal(true);
    }
  };

  const handleLogin = (e) => {
    navigate("/auth/login");
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
    </div>
  );
}
