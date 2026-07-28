"use client";

import { useMemo, useState, useEffect } from "react";
import ToolCard from "@/components/ToolCard";
import { categories, categoryLabels } from "@/lib/tools-registry";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

const INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 24;

export default function ToolGrid({ tools }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Listen for category change events from other components
  useEffect(() => {
    const handleSetCategory = (e) => {
      setCategory(e.detail);
    };
    window.addEventListener("setCategory", handleSetCategory);
    return () => window.removeEventListener("setCategory", handleSetCategory);
  }, []);

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchesCategory = category === "all" || t.category === category;
      const matchesQuery =
        query.trim() === "" ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [tools, query, category]);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [query, category]);

  const visibleTools = filtered.slice(0, visibleCount);

  const clearSearch = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div id="tools" className="space-y-6 sm:space-y-8">
      {/* Search & Category Filter Section */}
      <div className="space-y-4 sm:space-y-6">
        {/* Commontools search bar */}
        <div className="ct-search-box max-w-xl mx-auto relative flex items-center px-3 py-1 sm:py-1.5">
          <span className="pr-2">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search Tools Here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-2.5 text-sm sm:text-base text-slate-900 bg-transparent outline-none pr-8"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
            >
              <XIcon />
            </button>
          )}
        </div>

        {/* Categories Navigation Pills */}
        <div id="categories" className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`ct-cat-tab text-xs sm:text-xs py-1.5 px-3 ${category === c ? "active" : ""}`}
            >
              {categoryLabels[c] || c}
            </button>
          ))}
        </div>
      </div>

      {/* Counter bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3 px-1">
        <div>
          Showing <span className="font-bold text-slate-800">{visibleTools.length}</span> of{" "}
          <span className="font-bold text-slate-800">{filtered.length}</span> free tools
        </div>
        {(query || category !== "all") && (
          <button onClick={clearSearch} className="text-blue-600 hover:underline font-semibold">
            Clear all filters
          </button>
        )}
      </div>

      {/* Responsive Grid: 2 columns on Mobile Phone, 3 on Tablet, 5-6 on Desktop */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto">
          <div className="text-3xl sm:text-4xl mb-3">🔍</div>
          <h4 className="font-bold text-slate-800 mb-1">No tools found</h4>
          <p className="text-xs text-slate-500 mb-4">Try a different search query or reset your category filter.</p>
          <button onClick={clearSearch} className="ct-btn-primary py-2 px-4 text-xs">
            Show All Tools
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
          {visibleTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filtered.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
            className="ct-btn-secondary py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm"
          >
            Load More Tools ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
