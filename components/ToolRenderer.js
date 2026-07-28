"use client";

import { Suspense, lazy } from "react";

// Lazy load all tool components
const componentMap = {
  // Existing tools
  "word-counter": lazy(() => import("@/components/tools/WordCounter")),
  "case-converter": lazy(() => import("@/components/tools/CaseConverter")),
  "json-formatter": lazy(() => import("@/components/tools/JsonFormatter")),
  "text-reverser": lazy(() => import("@/components/tools/TextReverser")),
  "remove-extra-spaces": lazy(() => import("@/components/tools/RemoveExtraSpaces")),
  "remove-duplicate-lines": lazy(() => import("@/components/tools/RemoveDuplicateLines")),
  "remove-punctuation": lazy(() => import("@/components/tools/RemovePunctuation")),
  "uuid-generator": lazy(() => import("@/components/tools/UuidGenerator")),
  "password-generator": lazy(() => import("@/components/tools/PasswordGenerator")),
  "md5-hash": lazy(() => import("@/components/tools/Md5Hash")),
  "sha256-hash": lazy(() => import("@/components/tools/Sha256Hash")),
  "base64-encode-decode": lazy(() => import("@/components/tools/Base64EncodeDecode")),
  "url-encode-decode": lazy(() => import("@/components/tools/UrlEncodeDecode")),
  "text-binary-hex": lazy(() => import("@/components/tools/TextBinaryHex")),
  "length-converter": lazy(() => import("@/components/tools/LengthConverter")),
  "weight-converter": lazy(() => import("@/components/tools/WeightConverter")),
  "random-team-generator": lazy(() => import("@/components/tools/RandomTeamGenerator")),
  "add-line-numbers": lazy(() => import("@/components/tools/AddLineNumbers")),
  "sort-text-lines": lazy(() => import("@/components/tools/SortTextLines")),
  "css-beautifier": lazy(() => import("@/components/tools/CssBeautifier")),

  // PDF Tools
  "word-to-pdf": lazy(() => import("@/components/tools/WordToPdf")),
  "pdf-to-word": lazy(() => import("@/components/tools/PdfToWord")),
  "merge-pdf": lazy(() => import("@/components/tools/MergePdf")),
  "protect-pdf": lazy(() => import("@/components/tools/ProtectPdf")),
  "compress-pdf": lazy(() => import("@/components/tools/CompressPdf")),
  "edit-pdf-text": lazy(() => import("@/components/tools/EditPdfText")),
  "resize-pdf-images": lazy(() => import("@/components/tools/ResizePdfImages")),
  "image-to-pdf": lazy(() => import("@/components/tools/ImageToPdf")),
  "excel-to-pdf": lazy(() => import("@/components/tools/ExcelToPdf")),
  "ppt-to-pdf": lazy(() => import("@/components/tools/PptToPdf")),

  // Word Tools
  "merge-word": lazy(() => import("@/components/tools/MergeWord")),

  // Image Tools
  "crop-jpg": lazy(() => import("@/components/tools/CropJpg")),
};

function ToolLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-32 rounded-xl bg-white/5 shimmer" />
      <div className="h-10 w-32 rounded-lg bg-white/5 shimmer" />
      <div className="h-24 rounded-xl bg-white/5 shimmer" />
    </div>
  );
}

export default function ToolRenderer({ slug }) {
  const Component = componentMap[slug];

  if (!Component) {
    return (
      <div className="py-12 text-center">
        <div className="text-4xl mb-4">🔧</div>
        <p className="text-slate-400 text-sm">
          This tool is coming soon. Check back later!
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<ToolLoading />}>
      <Component />
    </Suspense>
  );
}
