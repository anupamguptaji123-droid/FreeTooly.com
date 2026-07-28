import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

export const metadata = {
  title: "FreeTooly – 100+ Free Online Tools",
  description:
    "Free online tools for text, code, conversion, cryptography, random generators, and everyday tasks. No signup required. Over 100+ tools ready to use.",
  keywords: "free online tools, text tools, code tools, converter, cryptography, random generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}

// Re-compiled
