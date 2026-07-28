import { notFound } from "next/navigation";
import Link from "next/link";
import { tools, getToolBySlug, categoryLabels } from "@/lib/tools-registry";
import ToolRenderer from "@/components/ToolRenderer";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params = {} }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} - Free Online Tool | FreeTooly`,
    description: tool.description,
  };
}

export default function ToolPage({ params = {} }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return notFound();

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to all tools
      </Link>

      {/* Tool Header Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
        <div className="flex items-start gap-4">
          {tool.icon && (
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl flex-shrink-0">
              {tool.icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="ct-tag">
                {categoryLabels?.[tool.category] || tool.category}
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              {tool.name}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Tool Interactive Workplace Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
        <ToolRenderer slug={tool.slug} />
      </div>

      {/* Related tools */}
      {related.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-slate-900">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((relTool) => (
              <Link
                key={relTool.slug}
                href={`/tools/${relTool.slug}`}
                className="ct-card group"
              >
                <div className="flex items-center gap-3">
                  {relTool.icon && <span className="text-xl flex-shrink-0">{relTool.icon}</span>}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {relTool.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{relTool.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
