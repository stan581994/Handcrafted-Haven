import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Handcrafted Haven | Artisan Marketplace</title>
        <meta
          name="description"
          content="Discover unique handcrafted items from talented artisans at Handcrafted Haven."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4">Welcome to Handcrafted Haven</h1>
              <p className="lead">
                Discover unique handcrafted treasures created by talented
                artisans from around the world.
              </p>
              <p>
                Our marketplace connects you directly with skilled creators,
                ensuring each purchase supports independent craftspeople and
                sustainable practices.
              </p>
              <div className="mt-4">
                <Link href="/shop/products" className="btn btn-primary me-2">
                  Browse Products
                </Link>
                <Link href="/sellers" className="btn btn-outline-secondary">
                  Meet Our Artisans
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-light p-5 text-center rounded">
                <p className="mb-0">Featured Product Image</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <h2 className="text-center mb-4">Featured Categories</h2>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Jewelry</h5>
                  <p className="card-text">
                    Handcrafted necklaces, bracelets, earrings, and more.
                  </p>
                  <Link
                    href="/shop/categories"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Category
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Home Decor</h5>
                  <p className="card-text">
                    Beautiful items to decorate your living space.
                  </p>
                  <Link
                    href="/shop/categories"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Category
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Clothing</h5>
                  <p className="card-text">
                    Handmade clothing items crafted with care.
                  </p>
                  <Link
                    href="/shop/categories"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Category
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
