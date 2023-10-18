import React from "react";

export default function StoreCard(props) {
  const { data } = props;
  return (
    <div className="card shadow p-1" style={{ width: "200px" }}>
      <div style={{ height: "98px" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          className="ps-2 pe-2 card-img"
          src={`/${data.img}`}
          alt=""
        />
      </div>

      <div className="card-body pb-2  pt-1">
        <div class="row mb-2">
          <div className="col-8">
            <h3 className="fs-6">{data.name}</h3>
          </div>
          <div className="col-4 d-flex justify-content-center">
            {data.likes}{" "}
            <i className="bi-heart-fill" style={{ color: "red" }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
