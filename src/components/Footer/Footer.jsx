import React from "react";
import { useEffect } from "react";
import { footerData, iconData } from "./footerData";
import reactLogo from "../../assets/react.svg";

export default function Footer() {
  const footerElements = footerData.map((item) => {
    return (
      <div
        className="col-sm-6 col-md-6 col-lg collapsible"
        onClick={(event) => {
          if (event.currentTarget.classList.contains("collapsible--expanded")) {
            event.currentTarget.classList.remove("collapsible--expanded");
          } else {
            event.currentTarget.classList.add("collapsible--expanded");
          }
        }}
      >
        <a className="h2 text-decoration-none" type="button">
          {item.heading}
        </a>
        <div id={item.heading} className="collapsible__content">
          <ul className="list-group list">
            {item.content.map((itemContent) => {
              return (
                <li className="list-item mb-2">
                  <a className="text-decoration-none" href="">
                    {itemContent}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
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
    <footer className="text-center text-white sticky-footer">
      <div className="container pt-4">
        <section className="mb-4">
          <div className="row">
            <div className="footer-brand p-0 col col-sm-6 col-md-4 col-lg-3 d-flex align-items-center">
              <img style={{ width: "100%" }} src={"/logo.svg"} alt="" />
            </div>
            <div className="col col-sm-6 col-lg-9 row">{footerElements}</div>
          </div>
        </section>
        <section className="mb-4">
          <div className="d-flex justify-content-center align-items-center">
            Follow us on {iconElements}
          </div>
        </section>
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
