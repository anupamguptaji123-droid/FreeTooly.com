"use client";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import ToolGrid from "@/components/ToolGrid";
import { tools } from "@/lib/tools-registry";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
];

export default function HeroSection() {
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Animated Marquee Hero Component */}
      <AnimatedMarqueeHero
        tagline="Over 100+ Free Online Tools for Daily Needs"
        title={
          <>
            Free Online Tools to Make
            <br />
            Your Work Life Easier
          </>
        }
        description="Simple, accurate, and easy-to-use browser tools ready to use. Convert PDFs, edit images, format code, and process documents with zero sign-up."
        ctaText="Explore All Tools ↓"
        images={DEMO_IMAGES}
        onCtaClick={scrollToTools}
      />

      {/* Tools Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-8 sm:py-12">
        <ToolGrid tools={tools} />
      </section>
    </div>
  );
}
