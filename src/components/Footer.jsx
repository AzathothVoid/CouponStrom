import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#f1f1f1" }}
    >
      <div className="container pt-4">
        <section className="">
          <div className="row">
            <div className="col">
              <h3>Company</h3>
              <ul>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mb-4">
          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab bi-facebook"></i>
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fas bi-twitter"></i>
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab bi-google"></i>
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab bi-instagram"></i>
          </a>
        </section>
      </div>

      <div
        className="text-center text-dark p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        www.couponstrom.com and its logo are the property of Couponstrom.com Ltd
        <a className="text-dark" href="https://mdbootstrap.com/"></a>
      </div>
    </footer>
  );
}
