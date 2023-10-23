import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/Auth/AuthContext";
import { UserLogin } from "../../api/UsersAPI";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/Modal/ErrorModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, role } = useAuth();
  const [errorModal, setErrorModal] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role) {
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "data-entry") {
        navigate("/dashboard/data-entry");
      }
    }
  }, [user, role, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      console.log("Email: ", email, " Password: ", password);
      const userData = await UserLogin(email, password);

      console.log("User Data: ", userData);

      if (userData) login(userData);
    } catch (error) {
      console.log(error);
      setErrorData(error.response);
      setErrorModal(true);
    }
  };

  const handleRegistrationShow = () => {
    navigate("/auth/registration");
  };

  const handleModalClose = () => setErrorModal(false);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title">Login Page</h1>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="d-flex justify-content-center gap-5">
                <button
                  className="btn btn-primary my-4 px-4"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary my-4 px-4"
                  onClick={handleRegistrationShow}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ErrorModal
        data={errorData}
        display={errorModal}
        handleClose={handleModalClose}
      />
    </div>
  );
}
