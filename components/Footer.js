import Link from "next/link";

function WrenchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

const footerLinks = {
  "Popular Tools": [
    { label: "Word to PDF", href: "/tools/word-to-pdf" },
    { label: "PDF to Word", href: "/tools/pdf-to-word" },
    { label: "Merge PDF", href: "/tools/merge-pdf" },
    { label: "Compress PDF", href: "/tools/compress-pdf" },
    { label: "Word Counter", href: "/tools/word-counter" },
  ],
  "Categories": [
    { label: "PDF Tools", href: "/#tools" },
    { label: "Word Tools", href: "/#tools" },
    { label: "Image Tools", href: "/#tools" },
    { label: "Text Editing", href: "/#tools" },
    { label: "Programming", href: "/#tools" },
  ],
  "Company & Legal": [
    { label: "Legal Information", href: "/legal" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <WrenchIcon />
              </div>
              <span className="font-heading font-bold text-xl text-slate-900">
                Free<span className="text-blue-600">Tooly</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              FreeTooly provides simple, accurate, and easy to use online utilities for text, PDF, Word,
              converters, and daily productivity needs. 100% free with no login required.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">{title}</div>
              <ul className="space-y-2 text-xs">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-blue-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} FreeTooly. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/legal" className="hover:text-blue-600">Legal</Link>
            <Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
