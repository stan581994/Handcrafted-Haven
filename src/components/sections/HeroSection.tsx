"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
              Discover Unique{" "}
              <span className="text-primary-600">Handcrafted</span> Treasures
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              Connect with talented artisans and shop one-of-a-kind handmade
              products that tell a story. Support local craftsmanship and bring
              unique character to your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/artisans">
                <Button variant="outline" size="lg">
                  Meet Our Artisans
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
              {/* Placeholder for hero image */}
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Hero Image</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-100 rounded-full z-0"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-100 rounded-full z-0"></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-100 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-100 rounded-full translate-y-1/3 -translate-x-1/4 opacity-50"></div>
    </section>
  );
};

export default HeroSection;
