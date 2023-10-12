import React from "react";
import { useEffect } from "react";
import { footerData, iconData } from "./footerData";
import reactLogo from "../../assets/react.svg";

export default function Footer() {
  const toggleCollapse = (event) => {
    event.preventDefault();

    if (window.innerWidth > 600) {
      if (targetElement.classList.contains("collapse"))
        targetElement.classList.remove("collapse");

      return;
    }

    const targetElement = document.getElementById(event.target.text);

    if (targetElement.classList.contains("collapse")) {
      // Remove the class if it exists
      targetElement.classList.remove("collapse");
    } else {
      // Add the class if it doesn't exist
      targetElement.classList.add("collapse");
    }
  };

  useEffect(() => {
    const dispatch = window.addEventListener("resize", () => {
      if (window.innerWidth > 600) {
        const targets = document.getElementsByClassName("collapse");
        console.log(targets);
        targets.map((element) => {
          element.classList.remove("collapse");
        });
      }
    });

    return () => dispatch;
  }, []);

  const footerElements = footerData.map((item) => {
    return (
      <div className="col-sm-6 col-md-6 col-lg">
        <a className="h2" type="button" onClick={toggleCollapse}>
          {item.heading}
        </a>
        <div
          id={item.heading}
          className={window.innerWidth < 600 ? "collapse" : ""}
        >
          <ul className="list-group list">
            {item.content.map((itemContent) => {
              return (
                <li className="list-item mb-2">
                  <a href="">{itemContent}</a>
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
            <div className="footer-brand col col-3 d-flex align-items-center">
              <img style={{ width: "8rem" }} src={reactLogo} alt="" />
            </div>
            <div className="col col-lg-9 row">{footerElements}</div>
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
