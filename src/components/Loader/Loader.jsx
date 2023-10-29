import React from "react";
import ReactLoading from "react-loading";

export default function Loader() {
  return (
    <section
      style={{ height: "100vh" }}
      className="w-100 d-flex flex-column flex-wrap justify-content-center align-items-center bg-white"
    >
      <h1>Please Wait a minute</h1>
      <article className="d-flex w-25 h4 my-4 align-items-center justify-content-center flex-column flex-wrap">
        <ReactLoading type={"spin"} color="#000" />
      </article>
    </section>
  );
}
