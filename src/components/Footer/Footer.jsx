import React from "react";
import { useEffect } from "react";
import { footerData, iconData } from "./footerData";
import reactLogo from "../../assets/react.svg";

export default function Footer() {
  const footerElements = footerData.map((item) => {
    return (
      <div
        key={item.id}
        className="col-sm-6 col-md-6 col-lg collapsible text-center"
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
                <li key={itemContent.id} className="list-item mb-2">
                  <a className="text-decoration-none" href={itemContent.href}>
                    {itemContent.name}
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
        key={item.id}
        className="btn btn-link btn-floating btn-lg text-dark m-1"
        href={`${item.url}`}
        role="button"
        target="_blank"
        data-mdb-ripple-color="dark"
      >
        <img src={item.img} alt="" />
      </a>
    );
  });

  return (
    <footer className="text-center text-white sticky-footer mt-5">
      <div className="container pt-4">
        <section className="mb-4">
          <div className="row ">
            <div className="footer-brand my-4 p-0 col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center">
              <img style={{ width: "100%" }} src={"/logo.svg"} alt="" />
            </div>
            <div className="col-12 col-sm-6 col-lg-9 row">{footerElements}</div>
          </div>
        </section>
        <section className="mb-4">
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
            Follow us on
            <div>{iconElements}</div>
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
