import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";

const SellersPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Artisans | Handcrafted Haven</title>
        <meta
          name="description"
          content="Meet the talented artisans behind our handcrafted products."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <h1>Our Artisans</h1>
        <p>
          Discover the talented creators behind our unique handcrafted products.
        </p>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Emma Johnson</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Jewelry Designer
                </h6>
                <p className="card-text">
                  Emma creates beautiful handcrafted jewelry using sustainable
                  materials.
                </p>
                <a href="#" className="card-link">
                  View Profile
                </a>
                <a href="#" className="card-link">
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Michael Chen</h5>
                <h6 className="card-subtitle mb-2 text-muted">Woodworker</h6>
                <p className="card-text">
                  Michael specializes in handcrafted wooden home decor and
                  furniture.
                </p>
                <a href="#" className="card-link">
                  View Profile
                </a>
                <a href="#" className="card-link">
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sophia Martinez</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Textile Artist
                </h6>
                <p className="card-text">
                  Sophia creates handwoven textiles and clothing using
                  traditional techniques.
                </p>
                <a href="#" className="card-link">
                  View Profile
                </a>
                <a href="#" className="card-link">
                  View Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellersPage;
