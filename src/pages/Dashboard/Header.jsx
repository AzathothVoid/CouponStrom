import React from "react";
import { Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Header(props) {
  return (
    <Navbar className="bg-body-tertiary">
      <div className="container">
        <Navbar.Brand href="#home">
          <img src="/logo.svg" alt="logo" width={"200px"} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{props.name}</a>
          </Navbar.Text>
          <Button variant="secondary" className="mx-3">
            Sign out
          </Button>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
