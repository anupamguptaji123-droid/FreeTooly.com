"use client";

import Link from "next/link";
import ToolGrid from "@/components/ToolGrid";
import { tools } from "@/lib/tools-registry";

const FEATURED_CATEGORIES = [
  { label: "PDF Tools", slug: "pdf-tools", icon: "📄" },
  { label: "Word Tools", slug: "word-tools", icon: "📝" },
  { label: "Image Tools", slug: "image-tools", icon: "🖼" },
  { label: "Text Editing", slug: "editing", icon: "✂️" },
  { label: "Programming", slug: "programming", icon: "💻" },
  { label: "Converters", slug: "converter", icon: "🔄" },
];

export default function HeroSection() {
  return (
    <div>
      {/* Commontools Hero Section */}
      <section className="bg-white border-b border-slate-200 py-16 px-5 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
            Free Online Tools For Daily Needs
          </p>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Free Online Tools to Make Your Work Life Easier
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Over 100+ simple, accurate, and easy-to-use browser tools ready to use. No sign-up required.
          </p>

          {/* Quick Category Badges Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {FEATURED_CATEGORIES.map(({ label, slug, icon }) => (
              <button
                key={slug}
                onClick={() => {
                  document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
                  window.dispatchEvent(new CustomEvent("setCategory", { detail: slug }));
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold border border-slate-200 transition-colors inline-flex items-center gap-1.5"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="max-w-7xl mx-auto px-5 py-12">
        <ToolGrid tools={tools} />
      </section>
    </div>
  );
}
