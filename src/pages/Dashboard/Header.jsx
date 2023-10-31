import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../../components/Auth/AuthContext";
import { userLogout } from "../../api/UsersAPI";

export default function Header(props) {
  const { data, logout } = useAuth();
  const [logoutCall, setLogoutCall] = useState(false);

  useEffect(() => {
    if (logoutCall) {
      try {
        userLogout().then((response) => {
          logout();
          setLogoutCall(false);
        });
      } catch (error) {}
    }
  }, [logoutCall]);
  const handleLogout = () => {
    setLogoutCall(true);
  };

  return (
    <Navbar className="bg-primary-custom">
      <div className="container">
        <Navbar.Brand href="#home">
          <img src="/logo.svg" alt="logo" width={"300px"} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <a className="fw-bold" href="#login">
              {data.name}
            </a>
          </Navbar.Text>
          <Button onClick={handleLogout} variant="secondary" className="mx-3">
            Sign out
          </Button>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
