"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Reusable Action Button
const ActionButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 sm:mt-8 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer text-xs sm:text-base"
  >
    {children}
  </button>
);

// Compact, responsive hero-3 component optimized for mobile phone & desktop views
export const AnimatedMarqueeHero = ({
  tagline,
  title,
  description,
  ctaText,
  images = [],
  onCtaClick,
  className,
}) => {
  // Duplicate images for seamless 360 loop
  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full py-8 sm:py-14 md:py-20 overflow-hidden bg-white flex flex-col items-center justify-center text-center px-4 border-b border-slate-200",
        className
      )}
    >
      <div className="z-10 flex flex-col items-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {/* Tagline */}
        <div className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[11px] sm:text-xs md:text-sm font-semibold text-blue-700 backdrop-blur-sm">
          {tagline}
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading max-w-3xl">
          {title}
        </h1>

        {/* Description */}
        <p className="max-w-xl text-xs sm:text-base md:text-lg text-slate-600 leading-relaxed px-2">
          {description}
        </p>

        {/* Call to Action Button */}
        <div>
          <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
        </div>
      </div>

      {/* Animated Image Marquee Carousel */}
      <div className="w-full mt-6 sm:mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee gap-3 sm:gap-4 px-2">
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] h-28 sm:h-40 md:h-48 flex-shrink-0 transition-transform hover:scale-105"
              style={{
                transform: `rotate(${index % 2 === 0 ? -1.5 : 3}deg)`,
              }}
            >
              <img
                src={src}
                alt={`Showcase tool image ${index + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80";
                }}
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-md border border-slate-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
