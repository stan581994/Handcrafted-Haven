import React, { useEffect, useRef } from "react";
import Image from "next/image";

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Import Bootstrap JS only on client-side
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Initialize all carousels
    if (carouselRef.current) {
      new bootstrap.Carousel(carouselRef.current, {
        interval: 3000, // Change slide every 3 seconds
        pause: "hover", // Pause on mouse hover
        wrap: true, // Cycle continuously
      });
    }

    // Cleanup function
    return () => {
      if (carouselRef.current) {
        const carousel = bootstrap.Carousel.getInstance(carouselRef.current);
        if (carousel) {
          carousel.dispose();
        }
      }
    };
  }, []);

  return (
    <div
      id="featuredCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#featuredCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#featuredCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#featuredCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Carousel items */}
      <div className="carousel-inner rounded">
        <div className="carousel-item active">
          <div className="carousel-image-container">
            <Image
              src="/carousel_1.jpg"
              alt="Handcrafted item 1"
              width={600}
              height={400}
              className="d-block w-100"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-image-container">
            <Image
              src="/carousel_2.jpg"
              alt="Handcrafted item 2"
              width={600}
              height={400}
              className="d-block w-100"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-image-container">
            <Image
              src="/carousel_3.jpg"
              alt="Handcrafted item 3"
              width={600}
              height={400}
              className="d-block w-100"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#featuredCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#featuredCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
