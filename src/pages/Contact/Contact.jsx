import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [message, setMessage] = useState(false);

  const handleContact = (e) => {
    setMessage(true);
  };

  const handleSubmit = (e) => {};
  const handleBack = (e) => {
    setMessage(false);
  };

  const mainElement = (
    <div className="container my-5 d-flex flex-column align-items-center">
      <h1>Get in Touch</h1>
      <div className="container d-flex justify-content-center flex-wrap flex-md-nowrap my-5">
        <div className="text-center">
          <i
            style={{ fontSize: "4rem" }}
            className="bi bi-chat-text text-secondary-custom fa-5x"
          ></i>
          <h3>Send us a Message</h3>
          <div className="my-3">
            <button
              onClick={handleContact}
              className="btn-custom rounded shadow text-secondary-custom fw-bold px-4"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const messageElement = (
    <div className="container m-auto my-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <h1 className="mb-3 fw-bold">Contact Us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem rem,
            sint possimus eum ullam laborum cumque aut eius quasi dolorem.
          </p>
          <button
            onClick={handleBack}
            className="btn bg-primary-dark-custom text-light px-4 ms-2"
          >
            Go Back
          </button>
        </div>
        <div className="col-12 col-md-6 shadow p-4">
          <form className="row gap-2" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="col-6 form-control"
                />
              </div>
              <div className="col-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="col-6 form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="textArea">What can we help you with?</label>
              <textarea
                className="form-control"
                name="details"
                id="textArea"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button
              style={{ width: "fit-content" }}
              type="submit"
              className="btn bg-primary-dark-custom text-light px-4 ms-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const keywords = ["contact", "couponstrom"];

  return (
    <>
      <Helmet>
        <title>{`Contact us-Coupon Strom`}</title>
        <meta
          name="description"
          content={`24/7 contact available for any question and query.`}
        />
        <meta name="keywords" content={keywords} />

        <meta property="og:title" content={`Contact us-Coupon Strom`} />
        <meta
          property="og:description"
          content={`24/7 contact available for any question and query.`}
        />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content={`${window.location.href}`} />
        <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
        <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
      </Helmet>
      <Header />
      <main>{message ? messageElement : mainElement}</main>
      <Footer />
    </>
  );
}
