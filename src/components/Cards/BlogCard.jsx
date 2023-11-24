import React from "react";

import { Link } from "react-router-dom";

export default function (props) {
  const blog = props.data;

  return (
    <div
      style={{ width: "350px" }}
      class="container d-flex justify-content-center"
    >
      <div class="row w-100">
        <div class="1-100">
          <div class="card w-100">
            <img
              style={{ height: "233px" }}
              class="card-img"
              src={blog.images ? blog.images[0].image : null}
              alt=""
            />

            <div class="card-body">
              <div className="blockquote">
                <h4 class="card-title text-truncate">{blog.title}</h4>
              </div>

              <p class="card-text text-truncate">{blog.description}</p>
              <Link to={`/blogs/${blog.id}`}>
                <button class="btn-custom rounded  bg-primary-custom text-white">
                  Read Now
                </button>
              </Link>
            </div>
            <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
              <div class="views fs-6">
                {new Date(blog.created_at).toDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
