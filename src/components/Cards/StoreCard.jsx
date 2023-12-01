import React from "react";

export default function StoreCard(props) {
  const { data } = props;
  return (
    <div className="card shadow p-1" style={{ width: "200px" }}>
      <a href={`/stores/${data.name}/${data.id}`} target="_blank" key={data.id}>
        <div
          className="d-flex align-items-center justify-content-center mb-2 border m-3 hover-image"
          style={{ height: "98px" }}
        >
          <img
            style={{ maxWidth: "60%", maxHeight: "100%" }}
            className="p-2 card-img"
            src={data.images[0].image}
            alt=""
          />
        </div>
      </a>

      <div className="card-body pb-2  pt-1">
        <div class="row mb-2">
          <div className="col-8">
            <h3 className="fs-6">{data.name}</h3>
          </div>
          <div className="col-4 d-flex justify-content-center">
            {data.likes}{" "}
            <i className="bi-heart-fill ms-1" style={{ color: "red" }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
