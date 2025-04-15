import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { addToCart } from "../../utils/cart";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const { artisan, category } = router.query;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(
    category ? Number(category) : null
  );

  // Check if user is admin
  const isAdmin = (session?.user as any)?.role === "admin";

  // State for product modal
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image_url: "",
    stock_quantity: 0,
    category_id: 1,
    artisan_id: 1,
  });

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

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" ||
        name === "stock_quantity" ||
        name === "category_id" ||
        name === "artisan_id"
          ? Number(value)
          : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingProduct
        ? `/api/products?id=${editingProduct.id}`
        : "/api/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          editingProduct
            ? "Product updated successfully"
            : "Product added successfully"
        );
        setShowModal(false);
        fetchProducts(); // Refresh the product list
      } else {
        toast.error(result.message || "An error occurred");
      }
    } catch (error) {
      toast.error("Failed to save product");
      console.error("Error saving product:", error);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Product deleted successfully");
        fetchProducts(); // Refresh the product list
      } else {
        toast.error(result.message || "An error occurred");
      }
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
    }
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Handcrafted Products</h1>
          {isAdmin && (
            <button
              className="btn btn-success"
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: "",
                  description: "",
                  price: 0,
                  image_url: "",
                  stock_quantity: 0,
                  category_id: categories[0]?.id || 1,
                  artisan_id: 1,
                });
                setShowModal(true);
              }}
            >
              <i className="bi bi-plus-circle me-2"></i> Add New Product
            </button>
          )}
        </div>

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
                          <div className="d-flex gap-2 flex-wrap">
                            <button className="btn btn-sm btn-outline-primary">
                              View Details
                            </button>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  image_url: product.image_url,
                                  artisan_name: product.artisan_name,
                                });
                                toast.success(`${product.name} added to cart!`);
                              }}
                            >
                              Add to Cart
                            </button>

                            {isAdmin && (
                              <>
                                <button
                                  className="btn btn-sm btn-warning"
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setFormData({
                                      name: product.name,
                                      description: product.description,
                                      price: product.price,
                                      image_url: product.image_url || "",
                                      stock_quantity: product.stock_quantity,
                                      category_id: product.category_id,
                                      artisan_id: product.artisan_id,
                                    });
                                    setShowModal(true);
                                  }}
                                >
                                  <i className="bi bi-pencil me-1"></i> Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Are you sure you want to delete "${product.name}"?`
                                      )
                                    ) {
                                      handleDeleteProduct(product.id);
                                    }
                                  }}
                                >
                                  <i className="bi bi-trash me-1"></i> Delete
                                </button>
                              </>
                            )}
                          </div>
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

      {/* Product Modal */}
      {showModal && (
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="stock_quantity" className="form-label">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock_quantity"
                          name="stock_quantity"
                          min="0"
                          value={formData.stock_quantity}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image_url" className="form-label">
                        Image URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                      />
                      <small className="text-muted">
                        Leave empty if no image is available
                      </small>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="category_id" className="form-label">
                          Category
                        </label>
                        <select
                          className="form-select"
                          id="category_id"
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleInputChange}
                          required
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="artisan_id" className="form-label">
                          Artisan ID
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="artisan_id"
                          name="artisan_id"
                          min="1"
                          value={formData.artisan_id}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
