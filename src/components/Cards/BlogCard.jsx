import React from "react";

export default function (props) {
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

  return (
    <div class="container">
      <div class="row w-100">
        <div class="">
          <div class="card">
            <img class="card-img" src={props.data.img} alt="" />

            <div class="card-body">
              <h4 class="card-title">{props.data.title}</h4>

              <p class="card-text">{props.data.description}</p>
              <a href="#" class="btn-custom rounded  bg-primary-custom">
                Read Now
              </a>
            </div>
            <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
              <div class="views fs-6">{formatDate(props.data.date)}</div>
              <div class="stats">
                <i class="bi-eye-fill fs-6"></i> {props.data.views}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
