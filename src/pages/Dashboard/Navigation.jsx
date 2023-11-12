import React from "react";

export default function Navigation({ setSection, section, sections }) {
  const handleSection = (e) => {
    setSection(e.target.innerHTML.toLowerCase());
  };

  const navElements = sections.map((sect) => {
    return (
      <div
        className={`container btn tab ${
          sect === section ? "bg-primary-custom text-white" : null
        } `}
      >
        <div onClick={handleSection}>{sect.toUpperCase()}</div>
      </div>
    );
  });
  return (
    <div className="d-flex container flex-wrap flex-md-nowrap ps-0 text-center my-5">
      {navElements}
    </div>
  );
}
