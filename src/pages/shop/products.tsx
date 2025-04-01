import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Define types
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

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { artisan, category } = router.query;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(
    category ? Number(category) : null
  );

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams();
      if (artisan) params.append("artisan_id", String(artisan));
      if (activeCategory) params.append("category_id", String(activeCategory));

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const response = await fetch(`/api/products${queryString}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Effect to run when component mounts or filters change
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [artisan, activeCategory]);

  // Handle category filter change
  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);

    // Update URL without full page reload
    const params = new URLSearchParams(window.location.search);
    if (categoryId) {
      params.set("category", String(categoryId));
    } else {
      params.delete("category");
    }

    const newUrl = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    window.history.pushState({}, "", newUrl);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

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
        <h1>Handcrafted Products</h1>

        {artisan && (
          <div className="alert alert-info mb-4">
            Showing products by artisan:{" "}
            <strong>{products[0]?.artisan_name || "Loading..."}</strong>
            <Link
              href="/shop/products"
              className="btn btn-sm btn-outline-primary ms-3"
            >
              View All Products
            </Link>
          </div>
        )}

        {/* Category filters */}
        <div className="mb-4">
          <h5>Filter by Category:</h5>
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn ${
                activeCategory === null ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => handleCategoryChange(null)}
            >
              All Categories
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className={`btn ${
                  activeCategory === category.id
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Loading indicator */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading products...</p>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="alert alert-warning">
                No products found. Please try a different filter.
              </div>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <div
                        className="position-relative"
                        style={{ height: "200px", overflow: "hidden" }}
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
                          <p className="card-text small text-muted">
                            By{" "}
                            <Link href={`/artisans/${product.artisan_id}`}>
                              {product.artisan_name}
                            </Link>
                          </p>
                          <button className="btn btn-sm btn-outline-primary">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
