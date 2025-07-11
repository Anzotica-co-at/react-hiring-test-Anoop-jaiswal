"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const baseSlides = [
  {
    mainImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    title: "The Ritz-Carlton Rabat, Dar Es Salam",
    description:
      "Set within a palm grove, this palatial oasis brings exclusivity to Morocco’s cultural capital.",
    position: "top-right",
  },
  {
    mainImage:
      "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=1200",
    title: "The Ritz-Carlton Kyoto",
    description: "A tranquil luxury escape blending nature and tradition.",
    position: "bottom-left",
  },
  {
    mainImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
    title: "The Ritz-Carlton Maldives",
    description: "A circular paradise floating in the Indian Ocean.",
    position: "bottom-right",
  },
];

const slides = [...baseSlides, ...baseSlides]; // Needed for infinite loop

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getPositionStyles = (position: string, isActive: boolean) => {
    const base =
      "absolute bg-white shadow-xl border border-gray-200 p-6 max-w-[360px] transition-all duration-700 ease-in-out";
    const opacity = isActive
      ? "opacity-100 translate-x-0 delay-200"
      : "opacity-0 translate-x-10 pointer-events-none";

    const posMap: Record<string, string> = {
      "top-right": "top-4 right-4",
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "top-left": "top-4 left-4",
    };

    return `${base} ${posMap[position] || "bottom-right"} ${opacity}`;
  };

  return (
    <div className="relative bg-[#e6eff9] py-10 px-4 md:px-10">
      <Swiper
        modules={[Navigation]}
        loop
        centeredSlides
        speed={700}
        spaceBetween={30}
        slidesPerView={"auto"}
        navigation={{
          prevEl: ".swiper-prev-btn",
          nextEl: ".swiper-next-btn",
        }}
        onSlideChange={(swiper) =>
          setCurrentIndex(swiper.realIndex % baseSlides.length)
        }
        className="pb-12 overflow-visible"
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="!w-[80%] md:!w-[60%] transition-transform duration-700 ease-in-out"
          >
            {({ isActive }) => (
              <div
                className={`relative rounded-xl overflow-visible ${
                  isActive ? "scale-100" : "scale-[0.95] opacity-60"
                } transition-all duration-700 ease-in-out`}
              >
                {/* Image card */}
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={slide.mainImage}
                    alt={slide.title}
                    className="w-full h-[600px] object-cover"
                  />
                </div>

                {/* Floating Description */}
                <div className={getPositionStyles(slide.position, isActive)}>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Now Open
                  </p>
                  <h2 className="text-xl font-serif font-semibold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {slide.description}
                  </p>
                  <button className="text-sm font-semibold border-b-2 border-black">
                    Explore More
                  </button>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation & Progress */}
      <div className="flex justify-center items-center mt-6 space-x-8">
        <button className="swiper-prev-btn flex items-center space-x-1">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Previous</span>
        </button>

        <div className="h-[2px] w-32 bg-gray-300 relative">
          <div
            className="absolute h-full bg-yellow-600 transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / baseSlides.length) * 100}%`,
            }}
          />
        </div>

        <button className="swiper-next-btn flex items-center space-x-1">
          <span className="text-sm">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        {currentIndex + 1} / {baseSlides.length}
      </p>
    </div>
  );
}
