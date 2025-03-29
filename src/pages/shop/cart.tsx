import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const CartPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Shopping Cart | Handcrafted Haven</title>
        <meta
          name="description"
          content="View and manage your shopping cart on Handcrafted Haven."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <h1>Your Shopping Cart</h1>
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Cart Items (3)</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3 pb-3 border-bottom">
                  <div className="col-md-3">
                    <div className="bg-light p-2 text-center">
                      Product Image
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Handcrafted Wooden Bowl</h6>
                    <p className="text-muted small">By: Michael Chen</p>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Quantity:</span>
                      <select className="form-select form-select-sm w-auto">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 text-end">
                    <p className="fw-bold">$45.00</p>
                    <button className="btn btn-sm btn-outline-danger">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="row mb-3 pb-3 border-bottom">
                  <div className="col-md-3">
                    <div className="bg-light p-2 text-center">
                      Product Image
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Handmade Silver Earrings</h6>
                    <p className="text-muted small">By: Emma Johnson</p>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Quantity:</span>
                      <select className="form-select form-select-sm w-auto">
                        <option value="1">1</option>
                        <option value="2" selected>
                          2
                        </option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 text-end">
                    <p className="fw-bold">$60.00</p>
                    <button className="btn btn-sm btn-outline-danger">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="bg-light p-2 text-center">
                      Product Image
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Hand-knit Scarf</h6>
                    <p className="text-muted small">By: Sophia Martinez</p>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Quantity:</span>
                      <select className="form-select form-select-sm w-auto">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 text-end">
                    <p className="fw-bold">$35.00</p>
                    <button className="btn btn-sm btn-outline-danger">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>$140.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>$12.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>$11.20</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>$163.20</span>
                </div>
                <button className="btn btn-primary w-100 mt-3">
                  Proceed to Checkout
                </button>
                <Link
                  href="/shop/products"
                  className="btn btn-outline-secondary w-100 mt-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
