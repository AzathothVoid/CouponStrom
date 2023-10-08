import React from "react";
import { footerData, iconData } from "./footerData";
import reactLogo from "../assets/react.svg";

export default function Footer() {
  const footerElements = footerData.map((item) => {
    return (
      <div className="col-sm-4">
        <h3>{item.heading}</h3>
        <ul className="list">
          {item.content.map((itemContent) => {
            return (
              <li className="list-item">
                <a href="">{itemContent}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  const iconElements = iconData.map((item) => {
    return (
      <a
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
      >
        <i className={`fab ${item} icon-white`}></i>
      </a>
    );
  });
  return (
    <footer className="text-center text-white">
      <div className="container pt-4">
        <section className="mb-4">
          <div className="row">
            <div className="footer-brand col-3 d-flex align-items-center">
              <img style={{ width: "8rem" }} src={reactLogo} alt="" />
            </div>
            <div className="col row">{footerElements}</div>
          </div>
        </section>
        <section className="mb-4">{iconElements}</section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        www.couponstrom.com and its logo are the property of Couponstrom.com Ltd
        <a className="text-dark" href="https://mdbootstrap.com/"></a>
      </div>
    </footer>
  );
}
