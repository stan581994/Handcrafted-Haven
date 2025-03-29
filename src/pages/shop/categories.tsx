import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

const CategoriesPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Categories | Handcrafted Haven</title>
        <meta
          name="description"
          content="Browse handcrafted products by category."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <h1>Categories</h1>
        <p>
          Browse our handcrafted products by category to find exactly what
          you're looking for.
        </p>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Jewelry</h5>
                <p className="card-text">
                  Handcrafted necklaces, bracelets, earrings, and more.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Home Decor</h5>
                <p className="card-text">
                  Beautiful items to decorate your living space.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Clothing</h5>
                <p className="card-text">
                  Handmade clothing items crafted with care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
