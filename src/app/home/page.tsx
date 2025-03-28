import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import ArtisanSpotlightSection from "@/components/sections/ArtisanSpotlightSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <ArtisanSpotlightSection />
      <TestimonialsSection />
      <CtaSection />
    </MainLayout>
  );
}
