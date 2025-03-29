import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

const ProductsPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Products | Handcrafted Haven</title>
        <meta
          name="description"
          content="Browse handcrafted products from talented artisans."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <h1>Products</h1>
        <p>
          This is the products page where you can browse all handcrafted items.
        </p>
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-info">
              This page will display a catalog of handcrafted products from
              various artisans.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
