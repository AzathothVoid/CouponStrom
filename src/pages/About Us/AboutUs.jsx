import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function AboutUs() {
  return (
    <>
      <Header />
      <main className="container my-4">
        <div>
          <h2 className="mb-1">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem officiis aliquid minima adipisci est ab veritatis
            quas nemo eos fugit.
          </p>
        </div>
        <div>
          <h2 className="mb-1">Our Policy</h2>
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
