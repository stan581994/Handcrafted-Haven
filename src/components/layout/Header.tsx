"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-primary-700">
              Handcrafted Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/home"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/product"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Products
            </Link>
            <Link
              href="/order"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Orders
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/artisans"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Artisans
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 mt-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/home"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/product"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Products
              </Link>
              <Link
                href="/order"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Orders
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Categories
              </Link>
              <Link
                href="/artisans"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Artisans
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Sign Up</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
