"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import CommandPalette from "@/components/CommandPalette";
import { tools } from "@/lib/tools-registry";

function WrenchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/#tools", label: "All Tools", icon: "🔧" },
  { href: "/#categories", label: "Categories", icon: "📂" },
];

const categoryShortcuts = [
  { label: "PDF Tools", slug: "pdf-tools", icon: "📄" },
  { label: "Word Tools", slug: "word-tools", icon: "📝" },
  { label: "Image Tools", slug: "image-tools", icon: "🖼" },
  { label: "Text Editing", slug: "editing", icon: "✂️" },
  { label: "Programming", slug: "programming", icon: "💻" },
  { label: "Converters", slug: "converter", icon: "🔄" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [favSlugs, setFavSlugs] = useState([]);

  // Load and listen for user favorites saved in browser localStorage
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

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <WrenchIcon />
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-slate-900">
              Free<span className="text-blue-600">Tooly</span>
            </span>
          </Link>

          {/* Search Trigger Button */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            className="flex-1 max-w-md hidden sm:flex items-center justify-between px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-400 text-xs transition-colors"
          >
            <span className="flex items-center gap-2">
              <SearchIcon />
              <span>Search 100+ tools...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Desktop Navigation Links + Favorites */}
          <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* ⭐ Favorites Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setFavOpen(!favOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  favTools.length > 0
                    ? "bg-amber-50 border-amber-300 text-amber-900 font-bold shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>⭐</span>
                <span>Favorites</span>
                {favTools.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {favTools.length}
                  </span>
                )}
              </button>

              {/* Favorites Dropdown Menu */}
              {favOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      <span>⭐</span> Saved Favorites ({favTools.length})
                    </span>
                    <button
                      onClick={() => setFavOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <XIcon />
                    </button>
                  </div>

                  {favTools.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400 space-y-1">
                      <div className="text-2xl mb-1">⭐</div>
                      <p className="font-semibold text-slate-700">No favorites saved yet</p>
                      <p className="text-[11px]">Click the ★ star on any tool card to pin it here!</p>
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {favTools.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/tools/${t.slug}`}
                          onClick={() => setFavOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50 text-xs font-semibold text-slate-800 transition-colors group"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span>{t.icon || "🔧"}</span>
                            <span className="truncate group-hover:text-amber-800">{t.name}</span>
                          </span>
                          <span className="text-[10px] text-amber-700 font-bold">Open →</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Sandwich Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-100 transition-colors active:scale-90"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation drawer"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* Butter-Smooth Mobile Slide-Over Side Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end drawer-backdrop ${
          drawerOpen ? "drawer-open" : "drawer-closed"
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        <div
          className={`w-full max-w-xs sm:w-80 h-full bg-white shadow-2xl flex flex-col justify-between p-5 overflow-y-auto drawer-panel ${
            drawerOpen ? "drawer-panel-open" : "drawer-panel-closed"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6">
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  <WrenchIcon />
                </div>
                <span className="font-heading font-bold text-lg text-slate-900">
                  Free<span className="text-blue-600">Tooly</span>
                </span>
              </Link>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-transform active:scale-90"
              >
                <XIcon />
              </button>
            </div>

            {/* Instant Search Bar Trigger */}
            <button
              onClick={() => {
                setDrawerOpen(false);
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-blue-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <SearchIcon />
                <span>Search 100+ tools...</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border text-[10px] font-bold">⌘K</kbd>
            </button>

            {/* Main Navigation Links */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Navigation</span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Saved Favorites Section */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider px-2 flex items-center justify-between">
                <span>⭐ Saved Favorites</span>
                <span className="font-extrabold text-amber-600">{favTools.length}</span>
              </span>

              {favTools.length === 0 ? (
                <p className="px-2 text-xs text-slate-400">No favorite tools saved yet.</p>
              ) : (
                <div className="space-y-1">
                  {favTools.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors truncate"
                    >
                      <span>{t.icon || "🔧"}</span>
                      <span className="truncate">{t.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tool Categories */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Quick Categories</span>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {categoryShortcuts.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setDrawerOpen(false);
                      document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
                      window.dispatchEvent(new CustomEvent("setCategory", { detail: cat.slug }));
                    }}
                    className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-blue-50 transition-colors text-left"
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links in Side Drawer */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-semibold text-slate-500">
            <div className="flex gap-3 text-[11px]">
              <Link href="/privacy-policy" onClick={() => setDrawerOpen(false)} className="hover:text-blue-600">Privacy</Link>
              <span>•</span>
              <Link href="/terms" onClick={() => setDrawerOpen(false)} className="hover:text-blue-600">Terms</Link>
              <span>•</span>
              <Link href="/legal" onClick={() => setDrawerOpen(false)} className="hover:text-blue-600">Legal</Link>
            </div>
            <p className="text-[10px] text-slate-400">© 2026 FreeTooly. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Command Palette Search Modal */}
      <CommandPalette />
    </>
  );
}
