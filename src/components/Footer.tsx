import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Handcrafted Haven</h5>
            <p className="text-light">
              Connecting artisans with customers who appreciate handcrafted
              quality.
            </p>
            <p className="text-light">
              &copy; {new Date().getFullYear()} Handcrafted Haven. All rights
              reserved.
            </p>
          </div>

          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/shop/products"
                  className="text-decoration-none text-light"
                >
                  All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/shop/categories"
                  className="text-decoration-none text-light"
                >
                  Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/artisans/pages"
                  className="text-decoration-none text-light"
                >
                  Artisans
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Information</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/about" className="text-decoration-none text-light">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-decoration-none text-light">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-decoration-none text-light">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-2">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="mailto:info@handcraftedhaven.com"
                  className="text-decoration-none text-light"
                >
                  customer_service@handcraftedhaven.com
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="tel:+1234567890"
                  className="text-decoration-none text-light"
                >
                  (456) 124-9985
                </a>
              </li>
              <li className="mb-2 d-flex gap-3">
                <a href="#" className="text-decoration-none text-light">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-decoration-none text-light">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-decoration-none text-light">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
