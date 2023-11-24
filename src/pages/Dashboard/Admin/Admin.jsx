import React, { useState } from "react";
import Header from "../Header";
import AdminStores from "./sections/AdminStores";
import AdminCoupons from "./sections/AdminCoupons";
import AdminCategories from "./sections/AdminCategories";
import AdminBlogs from "./sections/AdminBlogs";
import AdminAdvertisements from "./sections/AdminAdvertisements";

const sections = ["coupons", "stores", "categories", "blogs", "advertisements"];

export default function Admin() {
  const [section, setSection] = useState(sections[0]);

  var element = null;

  if (section === sections[0]) {
    element = (
      <AdminCoupons
        sections={sections}
        setSection={setSection}
        section={section}
      />
    );
  } else if (section === sections[1]) {
    element = (
      <AdminStores
        sections={sections}
        setSection={setSection}
        section={section}
      />
    );
  } else if (section === sections[2]) {
    element = (
      <AdminCategories
        sections={sections}
        setSection={setSection}
        section={section}
      />
    );
  } else if (section === sections[3]) {
    element = (
      <AdminBlogs
        sections={sections}
        setSection={setSection}
        section={section}
      />
    );
  } else {
    element = (
      <AdminAdvertisements
        sections={sections}
        setSection={setSection}
        section={section}
      />
    );
  }

  return (
    <section className="container-fluid p-0">
      <Header admin="true" />
      {element}
    </section>
  );
}
