"use client";

import Link from "next/link";

export default function ToolCard({ tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="ct-card group">
      {/* Tool Title & Icon */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
          {tool.name}
        </h3>
        {tool.icon && (
          <span className="text-xl flex-shrink-0 opacity-80 group-hover:scale-110 transition-transform">
            {tool.icon}
          </span>
        )}
      </div>

      {/* Tool Description */}
      <p className="text-xs text-slate-600 leading-relaxed flex-1 line-clamp-3 mb-4">
        {tool.description}
      </p>

      {/* Category Tag & Date/Status */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] mt-auto">
        <span className="ct-tag">
          {tool.category}
        </span>
        <span className="text-slate-400 font-medium group-hover:text-blue-600 transition-colors inline-flex items-center gap-1">
          Open Tool →
        </span>
      </div>
    </Link>
  );
}
