"use client";

export default function ToolIllustration({ slug, name, category }) {
  // Return tailored SVG illustration based on tool slug or category
  switch (slug) {
    case "morse-code-converter":
      return (
        <img
          src="/Mors_Code.png"
          alt="Morse Code Converter"
          className="h-full w-full object-contain"
        />
      );

    case "base64-encode-decode":
      return (
        <img
          src="/Base64_encode_and_decoder.png"
          alt="Base64 Encode and Decode"
          className="h-full w-full object-contain"
        />
      );

    case "case-converter":
      return (
        <img
          src="/Case_convertor.png"
          alt="Case Converter"
          className="h-full w-full object-contain"
        />
      );

    case "pdf-to-word":
      return (
        <img
          src="/PDF_To_Word.png"
          alt="PDF To Word"
          className="h-full w-full object-contain"
        />
      );

    case "word-counter":
      return (
        <img
          src="/Word_Counter.png"
          alt="Word Counter"
          className="h-full w-full object-contain"
        />
      );

    case "weight-converter":
    case "kg-to-lbs":
      return (
        <img
          src="/KG_to_Lbs.png"
          alt="kg to lbs Converter"
          className="h-full w-full object-contain"
        />
      );

    case "merge-word":
      return (
        <img
          src="/Merge_Word_file.png"
          alt="Merge Word Files"
          className="h-full w-full object-contain"
        />
      );

    case "protect-pdf":
      return (
        <img
          src="/Protect_pdf.png"
          alt="Protect PDF"
          className="h-full w-full object-contain"
        />
      );

    case "remove-punctuation":
      return (
        <img
          src="/Remove_punctuation.png"
          alt="Remove Punctuation"
          className="h-full w-full object-contain"
        />
      );

    case "word-to-pdf":
      return (
        <img
          src="/Word_to_pdf_converter.png"
          alt="Word to PDF Converter"
          className="h-full w-full object-contain"
        />
      );

    case "image-to-pdf":
      return (
        <img
          src="/Image_to_pdf.png"
          alt="Image to PDF"
          className="h-full w-full object-contain"
        />
      );

    case "text-reverser":
    case "reverse-text":
      return (
        <img
          src="/Reverse_text.png"
          alt="Reverse Text"
          className="h-full w-full object-contain"
        />
      );

    case "base64-encode-decode-old":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#0C4A6E" />
          <circle cx="100" cy="80" r="65" fill="#0284C7" opacity="0.25" />

          {/* Inner card container */}
          <rect x="30" y="16" width="140" height="128" rx="16" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />

          {/* Circular arrows loop */}
          <path d="M72 50C78 44 88 42 100 42C116 42 128 50 128 64" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M123 59L128 64L133 59" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="100" y="37" fill="#7DD3FC" fontSize="7.5" fontWeight="bold" textAnchor="middle">ENCODE</text>

          <path d="M128 78C122 84 112 86 100 86C84 86 72 78 72 64" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M77 69L72 64L67 69" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="100" y="94" fill="#7DD3FC" fontSize="7.5" fontWeight="bold" textAnchor="middle">DECODE</text>

          {/* Middle badges */}
          <g transform="translate(43, 54)">
            {/* Input Badge */}
            <rect x="0" y="0" width="46" height="20" rx="5" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <text x="23" y="13" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">010101</text>

            {/* Swap Arrow Icon */}
            <path d="M50 10H64M61 7L64 10L61 13M53 7L50 10L53 13" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Output Badge */}
            <rect x="68" y="0" width="46" height="20" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="91" y="13" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SGVsbG8=</text>
          </g>

          {/* Title Text */}
          <text x="100" y="122" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1">BASE64</text>
          <text x="100" y="133" fill="#94A3B8" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">ENCODE / DECODE</text>
        </svg>
      );

    case "text-to-handwriting":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#FEF9C3" />
          <circle cx="100" cy="80" r="55" fill="#FEF08A" />
          {/* Paper */}
          <rect x="65" y="45" width="70" height="80" rx="6" fill="#FFFFFF" stroke="#EAB308" strokeWidth="2" />
          <line x1="75" y1="65" x2="120" y2="65" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="75" y1="80" x2="125" y2="80" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="75" y1="95" x2="110" y2="95" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
          {/* Hand holding pen */}
          <path d="M125 45L145 25C148 22 153 22 156 25L157 26C160 29 160 34 157 37L137 57L125 45Z" fill="#F59E0B" />
          <path d="M125 45L118 64L137 57L125 45Z" fill="#D97706" />
          <circle cx="118" cy="64" r="2" fill="#000000" />
        </svg>
      );

    case "merge-pdf":
    case "compress-pdf":
    case "edit-pdf-text":
    case "resize-pdf-images":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#EFF6FF" />
          <circle cx="100" cy="80" r="55" fill="#DBEAFE" />
          {/* Blue Word Doc */}
          <rect x="50" y="45" width="50" height="65" rx="6" fill="#2563EB" />
          <text x="60" y="80" fill="#FFFFFF" fontSize="16" fontWeight="bold">W</text>
          {/* Arrow */}
          <path d="M102 75L114 75M114 75L108 69M114 75L108 81" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Red PDF Doc */}
          <rect x="118" y="45" width="50" height="65" rx="6" fill="#DC2626" />
          <text x="125" y="80" fill="#FFFFFF" fontSize="14" fontWeight="bold">PDF</text>
        </svg>
      );

    case "resize-image":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#ECFDF5" />
          <circle cx="100" cy="80" r="55" fill="#D1FAE5" />
          {/* Photo frame */}
          <rect x="55" y="40" width="90" height="75" rx="8" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
          {/* Sun & Mountains */}
          <circle cx="75" cy="58" r="7" fill="#F59E0B" />
          <path d="M60 100L85 68L105 88L120 75L140 100H60Z" fill="#10B981" opacity="0.8" />
          {/* Crop handles */}
          <path d="M48 40H60M48 40V52" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <path d="M152 115H140M152 115V103" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "crop-jpg":
      return (
        <img
          src="/Crop_JPG_Image.png"
          alt="Crop JPG Image"
          className="h-full w-full object-contain"
        />
      );

    case "sql-beautifier":
    case "sql-formatter":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#FFF1F2" />
          <circle cx="100" cy="80" r="55" fill="#FFE4E6" />
          {/* SQL Database cylinders */}
          <rect x="65" y="45" width="70" height="70" rx="12" fill="#E11D48" />
          <ellipse cx="100" cy="60" rx="25" ry="8" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="100" cy="80" rx="25" ry="8" fill="#FFFFFF" opacity="0.7" />
          <ellipse cx="100" cy="100" rx="25" ry="8" fill="#FFFFFF" opacity="0.9" />
          <text x="82" y="74" fill="#E11D48" fontSize="12" fontWeight="bold">SQL</text>
        </svg>
      );

    case "html-beautifier":
    case "css-beautifier":
    case "js-beautifier":
    case "code-formatter":
    case "json-formatter":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#F0F9FF" />
          <circle cx="100" cy="80" r="55" fill="#E0F2FE" />
          {/* Monitor */}
          <rect x="50" y="40" width="100" height="65" rx="6" fill="#0284C7" />
          <rect x="56" y="46" width="88" height="53" rx="4" fill="#0F172A" />
          {/* Code symbol < /> */}
          <text x="76" y="80" fill="#38BDF8" fontSize="20" fontWeight="bold">&lt;/&gt;</text>
          {/* Monitor Stand */}
          <path d="M90 105L85 120H115L110 105H90Z" fill="#0284C7" />
        </svg>
      );

    case "latex-compiler":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#0C4A6E" />
          <circle cx="100" cy="80" r="55" fill="#0369A1" opacity="0.4" />
          {/* Card board */}
          <rect x="35" y="32" width="130" height="96" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          {/* LaTeX equation text */}
          <text x="100" y="65" fill="#7DD3FC" fontSize="13" fontFamily="serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">
            ∫ e^(-x²) dx = √π
          </text>
          <line x1="50" y1="80" x2="150" y2="80" stroke="#1E293B" strokeWidth="1.5" />
          {/* Badge */}
          <rect x="68" y="90" width="64" height="22" rx="6" fill="#0284C7" />
          <text x="100" y="105" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            LaTeX
          </text>
        </svg>
      );

    case "text-cleaner":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#FDF4FF" />
          <circle cx="100" cy="80" r="55" fill="#FAE8FF" />
          {/* Document clip */}
          <rect x="65" y="45" width="70" height="75" rx="8" fill="#FFFFFF" stroke="#C084FC" strokeWidth="2.5" />
          <rect x="80" y="38" width="40" height="12" rx="4" fill="#A855F7" />
          <line x1="78" y1="65" x2="122" y2="65" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="80" x2="115" y2="80" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="95" x2="105" y2="95" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sparkle Clean Badge */}
          <path d="M135 45L138 35L141 45L151 48L141 51L138 61L135 51L125 48Z" fill="#F59E0B" />
        </svg>
      );

    case "text-compare":
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#FDF4FF" />
          <circle cx="100" cy="80" r="55" fill="#FAE8FF" />
          {/* Document clip */}
          <rect x="65" y="45" width="70" height="75" rx="8" fill="#FFFFFF" stroke="#C084FC" strokeWidth="2.5" />
          <rect x="80" y="38" width="40" height="12" rx="4" fill="#A855F7" />
          <line x1="78" y1="65" x2="122" y2="65" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="80" x2="115" y2="80" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="95" x2="105" y2="95" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "word-frequency-counter":
      return (
        <img
          src="/Word_Frequency_Counter.png"
          alt="Word Frequency Counter"
          className="h-full w-full object-contain"
        />
      );

    default:
      // Category fallback illustration
      if (category === "pdf-tools" || category === "word-tools") {
        return (
          <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
            <rect width="200" height="160" rx="16" fill="#EFF6FF" />
            <circle cx="100" cy="80" r="55" fill="#DBEAFE" />
            <rect x="65" y="45" width="70" height="75" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
            <path d="M78 65H122M78 80H115M78 95H105" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      }
      if (category === "image-tools") {
        return (
          <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
            <rect width="200" height="160" rx="16" fill="#ECFDF5" />
            <circle cx="100" cy="80" r="55" fill="#D1FAE5" />
            <rect x="55" y="42" width="90" height="70" rx="8" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="75" cy="60" r="6" fill="#F59E0B" />
            <path d="M60 98L85 70L105 88L120 78L140 98H60Z" fill="#10B981" />
          </svg>
        );
      }
      if (category === "programming" || category === "converter") {
        return (
          <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
            <rect width="200" height="160" rx="16" fill="#F0F9FF" />
            <circle cx="100" cy="80" r="55" fill="#E0F2FE" />
            <rect x="55" y="45" width="90" height="60" rx="6" fill="#0F172A" />
            <text x="80" y="82" fill="#38BDF8" fontSize="18" fontWeight="bold">&lt;/&gt;</text>
          </svg>
        );
      }
      // General fallback
      return (
        <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
          <rect width="200" height="160" rx="16" fill="#FEF3C7" />
          <circle cx="100" cy="80" r="55" fill="#FDE68A" />
          <rect x="65" y="45" width="70" height="75" rx="8" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
          <line x1="78" y1="65" x2="122" y2="65" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="80" x2="115" y2="80" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
