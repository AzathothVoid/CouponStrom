import React from "react";
import { useState } from "react";
import Coupon from "../../components/Coupon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoSlider from "../../components/LogoSlider";

export default function Home() {
  const [currPage, setCurrPage] = useState("");

  const currStatus = window.location.pathname === "/home";

  if (currStatus && !currPage) {
    setCurrPage("Home");
  } else if (!currStatus && currPage) {
    setCurrPage("");
  }

  return (
    <>
      <Header currPage={currPage} />

      <LogoSlider />

      <Coupon />
      <Footer />
    </>
  );
}
