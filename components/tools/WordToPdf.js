"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { createBasicPdf } from "@/lib/file-utils";

export default function WordToPdf() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleConvert = async () => {
    if (!files.length) {
      setError("Please upload a Word (.docx or .doc) document.");
      return;
    }
    setError("");
    setProcessing(true);
    setDone(false);

    try {
      const file = files[0];
      const text = await file.text();

      let extractedText = text.replace(/<[^>]+>/g, " ");
      try {
        const mName = "mammoth";
        const mammoth = await import(mName);
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value;
      } catch {
        // Fallback plain text extraction
      }

      createBasicPdf(
        `Word Document: ${file.name}`,
        extractedText || "Document Content Converted",
        `${file.name.replace(/\.[^/.]+$/, "")}.pdf`
      );

      setDone(true);
    } catch (err) {
      setError("Failed to convert Word to PDF: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-5">
      <FileDropzone
        accept=".docx,.doc"
        maxSizeMB={50}
        files={files}
        onFilesChange={setFiles}
        hint="Upload Word document (.docx, .doc)"
      />

      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

      {done && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span>✅</span>
          <span>Word document converted & PDF downloaded!</span>
        </div>
      )}

      <button
        onClick={handleConvert}
        disabled={!files.length || processing}
        className="ct-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Converting…" : "Convert Word to PDF"}
      </button>
    </div>
  );
}
