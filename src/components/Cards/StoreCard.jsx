import React from "react";

export default function StoreCard(props) {
  const { data } = props;
  return (
    <div className="card shadow p-1" style={{ width: "200px" }}>
      <div className="text-center" style={{ height: "98px" }}>
        <img
          style={{ width: "80%", height: "100%" }}
          className="p-2 card-img"
          src={data.images[0].image}
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
            <i className="bi-heart-fill ms-1" style={{ color: "red" }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
