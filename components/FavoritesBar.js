"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools-registry";

export function toggleFavorite(slug) {
  if (typeof window === "undefined") return [];
  const stored = JSON.parse(localStorage.getItem("freetooly_favs") || "[]");
  let updated;
  if (stored.includes(slug)) {
    updated = stored.filter((s) => s !== slug);
  } else {
    updated = [...stored, slug];
  }
  localStorage.setItem("freetooly_favs", JSON.stringify(updated));
  window.dispatchEvent(new Event("favsUpdated"));
  return updated;
}

export function isFavorite(slug) {
  if (typeof window === "undefined") return false;
  const stored = JSON.parse(localStorage.getItem("freetooly_favs") || "[]");
  return stored.includes(slug);
}

export default function FavoritesBar() {
  const [favSlugs, setFavSlugs] = useState([]);

  useEffect(() => {
    const loadFavs = () => {
      const stored = JSON.parse(localStorage.getItem("freetooly_favs") || "[]");
      setFavSlugs(stored);
    };
    loadFavs();
    window.addEventListener("favsUpdated", loadFavs);
    return () => window.removeEventListener("favsUpdated", loadFavs);
  }, []);

  const favTools = tools.filter((t) => favSlugs.includes(t.slug));

  if (!favTools.length) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200/60 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar text-xs">
        <span className="font-bold text-amber-900 flex items-center gap-1 flex-shrink-0">
          <span>⭐</span> My Favorites ({favTools.length}):
        </span>
        <div className="flex items-center gap-2 flex-nowrap">
          {favTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-2xs"
            >
              <span>{tool.icon || "🔧"}</span>
              <span>{tool.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
