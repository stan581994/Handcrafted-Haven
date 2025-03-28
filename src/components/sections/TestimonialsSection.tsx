"use client";

import React from "react";

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    role: "Customer",
    quote:
      "I absolutely love the handcrafted ceramic mug I purchased. The quality and craftsmanship are exceptional, and it is now my favorite piece in my kitchen.",
    image: "/placeholder.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "David Wilson",
    role: "Customer",
    quote:
      "The macrame wall hanging I ordered is even more beautiful in person. It is clear that the artisan put a lot of care and attention to detail into creating it.",
    image: "/placeholder.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Jennifer Lee",
    role: "Interior Designer",
    quote:
      "I have been recommending Handcrafted Haven to all my clients. The unique, high-quality pieces add so much character to the spaces I design.",
    image: "/placeholder.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Robert Garcia",
    role: "Customer",
    quote:
      "The handmade leather wallet I purchased is not only beautiful but incredibly durable. I appreciate supporting artisans who take pride in their craft.",
    image: "/placeholder.jpg",
    rating: 4,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read testimonials from customers who have discovered unique
            handcrafted treasures and supported talented artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                {/* Star rating */}
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for customer image */}
                  <span className="text-xs text-gray-500">Photo</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
