import React, { useState } from "react";
import Header from "../Header";

import DECategories from "./sections/DECategories";
import DECoupons from "./sections/DECoupons";
import DEStores from "./sections/DEStores";

const sections = ["coupons", "stores", "categories"];

export default function DataEntry() {
  const [section, setSection] = useState(sections[0]);

  var element = null;

  if (section === sections[0]) {
    element = (
      <DECoupons
        sections={sections}
        setSection={setSection}
        section={section}
      />
    );
  } else if (section === sections[1]) {
    element = (
      <DEStores sections={sections} setSection={setSection} section={section} />
    );
  } else if (section === sections[2]) {
    element = (
      <DECategories
        sections={sections}
        setSection={setSection}
        section={section}
      />
    );
  }

  return (
    <section className="container-fluid p-0">
      <Header />
      {element}
    </section>
  );
}
