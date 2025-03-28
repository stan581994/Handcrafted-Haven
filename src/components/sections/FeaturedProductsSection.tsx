"use client";

import React from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Handwoven Basket",
    artisan: "Emma Johnson",
    price: 45.99,
    category: "Home Decor",
    image: "/placeholder.jpg",
  },
  {
    id: 2,
    name: "Ceramic Coffee Mug",
    artisan: "Michael Chen",
    price: 24.99,
    category: "Kitchen",
    image: "/placeholder.jpg",
  },
  {
    id: 3,
    name: "Macrame Wall Hanging",
    artisan: "Sofia Rodriguez",
    price: 89.99,
    category: "Home Decor",
    image: "/placeholder.jpg",
  },
  {
    id: 4,
    name: "Wooden Cutting Board",
    artisan: "James Wilson",
    price: 59.99,
    category: "Kitchen",
    image: "/placeholder.jpg",
  },
];

const FeaturedProductsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Featured Handcrafted Items
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our curated selection of unique handcrafted products made
            with passion and skill by talented artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <div className="aspect-w-1 aspect-h-1 w-full">
                {/* Placeholder for product image */}
                <div className="bg-gray-200 w-full h-64 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
              </div>
              <CardBody>
                <div className="mb-2">
                  <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  by {product.artisan}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="secondary">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
