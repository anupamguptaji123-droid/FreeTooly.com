"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToolIllustration from "@/components/ToolIllustration";
import { isFavorite, toggleFavorite } from "@/components/FavoritesBar";

function StarIcon({ filled }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#f59e0b" : "none"}
      stroke={filled ? "#f59e0b" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-150"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function ToolCard({ tool }) {
  const [starred, setStarred] = useState(false);

  useEffect(() => {
    setStarred(isFavorite(tool.slug));
    const handleUpdate = () => setStarred(isFavorite(tool.slug));
    window.addEventListener("favsUpdated", handleUpdate);
    return () => window.removeEventListener("favsUpdated", handleUpdate);
  }, [tool.slug]);

  const handleStar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.slug);
  };

  return (
    <div className="ct-card group flex flex-col justify-between p-3 sm:p-4 relative">
      <Link href={`/tools/${tool.slug}`} className="block flex-1">
        {/* Vector Picture Illustration Banner */}
        <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-2.5 border border-slate-100 bg-slate-50 group-hover:scale-[1.02] transition-transform duration-200 relative">
          <ToolIllustration slug={tool.slug} name={tool.name} category={tool.category} />

          {/* Clean SVG Star Favorite Button */}
          <button
            onClick={handleStar}
            className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-2xs ${
              starred
                ? "bg-amber-100/90 text-amber-500 border border-amber-300"
                : "bg-white/80 text-slate-400 hover:text-amber-500 hover:bg-white border border-slate-200/60"
            }`}
            title={starred ? "Remove from Favorites" : "Add to Favorites"}
          >
            <StarIcon filled={starred} />
          </button>
        </div>

        {/* Tool Title */}
        <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1 line-clamp-1">
          {tool.name}
        </h3>

        {/* Tool Description */}
        <p className="text-[11px] sm:text-xs text-slate-500 leading-normal line-clamp-2 mb-2">
          {tool.description}
        </p>

        {/* Metadata string */}
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mb-2 truncate">
          FreeTooly | October 2026
        </p>
      </Link>

      {/* Category Tag Badge Pill */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
        <span className="ct-tag text-[10px] sm:text-xs py-0.5 px-2">
          {tool.category}
        </span>
        <Link href={`/tools/${tool.slug}`} className="text-[10px] sm:text-xs font-semibold text-blue-600 group-hover:underline flex-shrink-0">
          Open →
        </Link>
      </div>
    </div>
  );
}
