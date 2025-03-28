"use client";

import React from "react";
import Link from "next/link";

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Home Decor",
    description: "Beautiful handcrafted items to enhance your living space",
    image: "/placeholder.jpg",
    count: 42,
  },
  {
    id: 2,
    name: "Jewelry",
    description: "Unique handmade jewelry pieces crafted with care",
    image: "/placeholder.jpg",
    count: 38,
  },
  {
    id: 3,
    name: "Kitchen & Dining",
    description: "Functional and beautiful items for your kitchen",
    image: "/placeholder.jpg",
    count: 27,
  },
  {
    id: 4,
    name: "Clothing & Accessories",
    description: "Handcrafted wearable art and accessories",
    image: "/placeholder.jpg",
    count: 31,
  },
  {
    id: 5,
    name: "Art & Collectibles",
    description: "One-of-a-kind art pieces and collectibles",
    image: "/placeholder.jpg",
    count: 24,
  },
  {
    id: 6,
    name: "Bath & Beauty",
    description: "Natural handmade bath and beauty products",
    image: "/placeholder.jpg",
    count: 19,
  },
];

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our wide range of handcrafted products organized by category
            to find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                {/* Placeholder for category image */}
                <div className="bg-gray-200 w-full h-48 flex items-center justify-center">
                  <span className="text-gray-500">Category Image</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{category.count} products</span>
                    <span className="text-primary-300 group-hover:text-primary-200 transition-colors">
                      Browse &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
