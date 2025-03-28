"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Join Our Community of Artisans and Craft Enthusiasts
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Whether you are a talented artisan looking to showcase your
            creations or a customer seeking unique handcrafted items,
            Handcrafted Haven is the perfect place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-700 hover:bg-primary-50"
              >
                Join as an Artisan
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-400">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-primary-500 opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-primary-500 opacity-20 rounded-full translate-x-1/3 translate-y-1/3"></div>
    </section>
  );
};

export default CtaSection;
