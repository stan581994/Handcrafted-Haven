"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Mock data for featured artisans
const featuredArtisans = [
  {
    id: 1,
    name: "Emma Johnson",
    specialty: "Basket Weaving",
    location: "Portland, OR",
    bio: "Emma creates beautiful handwoven baskets using traditional techniques passed down through generations. Each piece is unique and tells a story.",
    image: "/placeholder.jpg",
    productCount: 12,
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Ceramics",
    location: "San Francisco, CA",
    bio: "Michael is a ceramic artist who combines traditional Asian pottery techniques with modern design aesthetics to create functional art for everyday use.",
    image: "/placeholder.jpg",
    productCount: 18,
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    specialty: "Macrame & Fiber Arts",
    location: "Austin, TX",
    bio: "Sofia specializes in intricate macrame wall hangings and fiber art installations that add texture and warmth to any space.",
    image: "/placeholder.jpg",
    productCount: 15,
  },
];

const ArtisanSpotlightSection: React.FC = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Meet Our Artisans
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the talented creators behind our handcrafted products and
            learn about their unique stories and crafting processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                {/* Placeholder for artisan image */}
                <div className="bg-gray-200 w-full h-64 flex items-center justify-center">
                  <span className="text-gray-500">Artisan Image</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {artisan.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="mr-3">{artisan.specialty}</span>
                  <span>{artisan.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{artisan.bio}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {artisan.productCount} products
                  </span>
                  <Link href={`/artisans/${artisan.id}`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/artisans">
            <Button variant="accent" size="lg">
              Meet All Artisans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtisanSpotlightSection;
