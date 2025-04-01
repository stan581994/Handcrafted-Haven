import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

// Define types
interface Artisan {
  id: number;
  name: string;
  specialty: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  category_id: number;
  artisan_id: number;
  category_name: string;
  artisan_name: string;
  artisan_specialty: string;
}

const ArtisanProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch artisan data
  const fetchArtisan = async (artisanId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/artisan/${artisanId}`);
      const data = await response.json();

      if (data.success) {
        setArtisan(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch artisan's products
  const fetchArtisanProducts = async (artisanId: string) => {
    try {
      setProductsLoading(true);
      const response = await fetch(`/api/products?artisan_id=${artisanId}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setProductsLoading(false);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Effect to run when the ID is available
  useEffect(() => {
    if (id && typeof id === "string") {
      fetchArtisan(id);
      fetchArtisanProducts(id);
    }
  }, [id]);

  return (
    <div>
      <Head>
        <title>
          {artisan
            ? `${artisan.name} | Handcrafted Haven`
            : "Artisan Profile | Handcrafted Haven"}
        </title>
        <meta
          name="description"
          content={
            artisan
              ? `Learn more about ${artisan.name}, a talented ${artisan.specialty} at Handcrafted Haven.`
              : "Discover the talented artisans behind our handcrafted products."
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        {/* Error message */}
        {error && (
          <div className="alert alert-danger mb-4">
            <strong>Error:</strong> {error}
            <div className="mt-3">
              <Link href="/artisans/pages" className="btn btn-primary">
                Back to Artisans
              </Link>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading artisan profile...</p>
          </div>
        ) : artisan ? (
          <>
            <div className="row">
              <div className="col-md-4 mb-4">
                {artisan.image_url ? (
                  <img
                    src={artisan.image_url}
                    alt={`${artisan.name} - ${artisan.specialty}`}
                    className="img-fluid rounded shadow"
                    style={{
                      maxHeight: "400px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="bg-light p-5 text-center rounded">
                    <p className="mb-0">No image available</p>
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <h1 className="mb-2">{artisan.name}</h1>
                <h5 className="text-muted mb-4">{artisan.specialty}</h5>

                <div className="card mb-4">
                  <div className="card-header">
                    <h4 className="mb-0">About the Artisan</h4>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{artisan.description}</p>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-header">
                    <h4 className="mb-0">Contact & Shop</h4>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      Interested in {artisan.name}'s work? Browse their products
                      or get in touch.
                    </p>
                    <Link
                      href={`/shop/products?artisan=${artisan.id}`}
                      className="btn btn-primary me-2"
                    >
                      View Products
                    </Link>
                    <button className="btn btn-outline-secondary">
                      Contact Artisan
                    </button>
                  </div>
                </div>

                <Link
                  href="/artisans/pages"
                  className="btn btn-outline-primary"
                >
                  Back to All Artisans
                </Link>
              </div>
            </div>

            {/* Products section */}
            <div className="mt-5">
              <h2 className="mb-4">Products by {artisan.name}</h2>

              {productsLoading ? (
                <div className="text-center my-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading products...</span>
                  </div>
                  <p className="mt-2">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="alert alert-info">
                  No products available from this artisan yet.
                </div>
              ) : (
                <div className="row">
                  {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                      <div className="card h-100">
                        <div
                          className="position-relative"
                          style={{ height: "180px", overflow: "hidden" }}
                        >
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="card-img-top"
                              style={{
                                objectFit: "cover",
                                height: "100%",
                                width: "100%",
                              }}
                            />
                          ) : (
                            <div
                              className="bg-light d-flex align-items-center justify-content-center"
                              style={{ height: "100%" }}
                            >
                              <p className="text-muted">No image available</p>
                            </div>
                          )}
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text text-truncate">
                            {product.description}
                          </p>
                          <div className="mt-auto">
                            <p className="card-text">
                              <span className="badge bg-primary me-2">
                                {product.category_name}
                              </span>
                              <span className="fw-bold">
                                {formatPrice(product.price)}
                              </span>
                            </p>
                            <Link
                              href={`/shop/products?category=${product.category_id}`}
                              className="btn btn-sm btn-outline-secondary me-2"
                            >
                              Similar Products
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center mt-4">
                <Link
                  href={`/shop/products?artisan=${artisan.id}`}
                  className="btn btn-primary"
                >
                  View All Products by {artisan.name}
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center my-5">
            <h2>Artisan Not Found</h2>
            <p>
              The artisan you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/artisans/pages" className="btn btn-primary">
              View All Artisans
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ArtisanProfile;
