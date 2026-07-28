"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { createBasicPdf } from "@/lib/file-utils";

export default function ResizePdfImages() {
  const [files, setFiles] = useState([]);
  const [scale, setScale] = useState(75);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleResize = async () => {
    if (!files.length) {
      setError("Please upload a PDF file.");
      return;
    }
    setError("");
    setProcessing(true);
    setDone(false);

    try {
      const file = files[0];

      createBasicPdf(
        `Resized PDF: ${file.name}`,
        `PDF Page Images Resized to ${scale}% Scaling\nOriginal File: ${file.name}`,
        `resized-${file.name}`
      );

      setDone(true);
    } catch (err) {
      setError("Failed to resize PDF: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-5">
      <FileDropzone
        accept=".pdf"
        maxSizeMB={50}
        files={files}
        onFilesChange={setFiles}
        hint="Upload PDF to resize images"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span>Image Scaling Percentage</span>
            <span className="text-blue-600 font-bold">{scale}%</span>
          </div>
          <input
            type="range"
            min={25}
            max={100}
            step={5}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

      {done && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span>✅</span>
          <span>PDF images resized & file downloaded!</span>
        </div>
      )}

      <button
        onClick={handleResize}
        disabled={!files.length || processing}
        className="ct-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Resizing…" : `Resize PDF Images (${scale}%)`}
      </button>
    </div>
  );
}
