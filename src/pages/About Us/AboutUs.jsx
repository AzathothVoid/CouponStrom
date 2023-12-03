import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet";
import { useDataState } from "../../components/Data/DataContext";
import Loader from "../../components/Loader/Loader";
import ReactMarkdown from "react-markdown";

export default function AboutUs() {
  const keywords = ["about us", "policy", "coupon strom"];
  const useData = useDataState();

  const companyInfo = useData.company;

  return (
    <>
      {companyInfo ? (
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
              <h2
                style={{ width: "fit-content" }}
                className="mb-2 m-auto p-2 border-bottom bg-primary-custom text-white rounded"
              >
                About Us
              </h2>
              <ReactMarkdown>{companyInfo.about_us}</ReactMarkdown>
            </div>
            <div>
              <h2
                style={{ width: "fit-content" }}
                className="mb-2 m-auto p-2 border-bottom bg-primary-custom text-white rounded"
              >
                Policy
              </h2>
              <ReactMarkdown>{companyInfo.policy}</ReactMarkdown>
            </div>
          </main>
          <Footer />{" "}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
