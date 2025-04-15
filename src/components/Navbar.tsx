import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCartItemCount } from "../utils/cart";
import { useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCartCount(getCartItemCount());

    // Update cart count when local storage changes
    const handleStorageChange = () => {
      setCartCount(getCartItemCount());
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically for changes
    const interval = setInterval(() => {
      setCartCount(getCartItemCount());
    }, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          <Image
            src="/logo-no-background.png"
            alt="Handcrafted Haven Logo"
            width={180}
            height={40}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/shop/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/shop/categories" className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artisans/pages" className="nav-link">
                Artisans
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {session ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {session.user.name || session.user.email}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link href="/shop/orders" className="dropdown-item">
                        My Orders
                      </Link>
                    </li>
                    {(session.user as any).role === "admin" && (
                      <li>
                        <Link href="/admin/dashboard" className="dropdown-item">
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleSignOut}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/auth/login" className="nav-link">
                  Login / Register
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link href="/shop/my-cart" className="nav-link">
                <i className="bi bi-cart"></i> Cart
                {isClient && cartCount > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
