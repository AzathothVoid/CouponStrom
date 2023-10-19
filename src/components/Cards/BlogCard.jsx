import React from "react";
import { useState, useEffect } from "react";

export default function (props) {
  const [blog, setBlog] = useState(props.data);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
      padTo2Digits(date.getDate()),
    ].join("/");
  }

  const arr = [];

  return (
    <div
      style={{ maxWidth: "400px" }}
      class="container d-flex justify-content-center"
    >
      <div class="row w-100">
        <div class="">
          <div class="card">
            <img
              style={{ height: "200px" }}
              class="card-img"
              src={blog.img}
              alt=""
            />

            <div class="card-body">
              <div className="blockquote">
                <h4 class="card-title">{blog.title}</h4>
                {/* <p className="blockquote-footer">
                  <span style={{ fontSize: "0.8rem" }}>by</span> {blog.writer}
                </p> */}
              </div>

              <p class="card-text">{blog.description}</p>
              <button
                onClick={() => props.viewBlog(blog.id, setBlog)}
                class="btn-custom rounded  bg-primary-custom"
              >
                Read Now
              </button>
            </div>
            <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
              <div class="views fs-6">{formatDate(blog.date)}</div>
              <div class="stats">
                <i class="bi-eye-fill fs-6"></i> {blog.views}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
