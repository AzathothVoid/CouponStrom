import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/DateUtils";

export default function (props) {
  const [blog, setBlog] = useState(props.data);

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
              </div>

              <p class="card-text">{blog.description}</p>
              <Link to={`/blogs/${blog.id}`}>
                <button class="btn-custom rounded  bg-primary-custom text-white">
                  Read Now
                </button>
              </Link>
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
