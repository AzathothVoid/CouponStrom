import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet";

export default function AboutUs() {
  const keywords = ["about us", "policy", "coupon strom"];
  return (
    <>
      <Helmet>
        <title>{`About us-Coupon Strom`}</title>
        <meta
          name="description"
          content={`Find out more about us and our policies. We are dedicated to you and your needs.`}
        />
        <meta name="keywords" content={keywords} />

        <meta property="og:title" content={`About us-Coupon Strom`} />
        <meta
          property="og:description"
          content={`Find out more about us and our policies. 24/7 contact available.`}
        />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content={`${window.location.href}`} />
        <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
        <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
      </Helmet>
      <Header />
      <main className="container my-4">
        <div>
          <h2 className="mb-2">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem officiis aliquid minima adipisci est ab veritatis
            quas nemo eos fugit.
          </p>
        </div>
        <div>
          <h2 className="mb-2">Our Policy</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            praesentium fuga quidem cupiditate. Amet perspiciatis, laboriosam
            facilis explicabo minus alias quaerat maxime! Magnam pariatur
            incidunt id, aliquid tempora dicta corporis laudantium qui dolores
            praesentium excepturi doloribus ab rem aperiam deleniti officiis
            minima voluptatem alias unde nostrum. Tenetur possimus ea dolor
            culpa. Deleniti, esse distinctio. Perspiciatis quasi fugit ipsum
            incidunt excepturi quo maxime illum! Ullam quia eos expedita ea
            placeat ipsam temporibus laudantium similique laborum alias vitae
            harum non, at ad enim repellendus eveniet quos sed velit aliquid
            corporis quis quasi possimus et! Vero corrupti eos alias similique
            quia nihil. Aperiam.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
