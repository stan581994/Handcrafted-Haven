import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";

const About: React.FC = () => {
  return (
    <div>
      <Head>
        <title>About Us | Handcrafted Haven</title>
        <meta
          name="description"
          content="Learn about Handcrafted Haven's mission to support artisans and promote handcrafted goods."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="mb-4">About Handcrafted Haven</h1>
            <p className="lead">
              Handcrafted Haven is an innovative marketplace dedicated to
              connecting talented artisans with customers who appreciate the
              beauty and quality of handmade products.
            </p>
            <h2 className="mt-5 mb-3">Our Mission</h2>
            <p>
              Our mission is to provide a platform where artisans can showcase
              their unique creations and reach a wider audience, while offering
              customers access to one-of-a-kind handcrafted items that cannot be
              found in mass-market retail stores.
            </p>
            <p>
              We believe in supporting local craftspeople, promoting sustainable
              consumption, and preserving traditional crafting techniques that
              might otherwise be lost in our fast-paced, mass-produced world.
            </p>
            <h2 className="mt-5 mb-3">Our Values</h2>
            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Authenticity</h5>
                    <p className="card-text">
                      We celebrate the unique story behind each handcrafted item
                      and the artisan who created it.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Sustainability</h5>
                    <p className="card-text">
                      We promote environmentally conscious practices and
                      materials in the creation of handcrafted goods.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Community</h5>
                    <p className="card-text">
                      We foster connections between artisans and customers,
                      creating a supportive community of creators and
                      appreciators.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Quality</h5>
                    <p className="card-text">
                      We value craftsmanship and attention to detail in every
                      product featured on our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
