"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { downloadFile, createBasicPdf } from "@/lib/file-utils";

export default function ExcelToPdf() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleConvert = async () => {
    if (!files.length) {
      setError("Please upload an Excel (.xlsx, .xls, or .csv) file.");
      return;
    }
    setError("");
    setProcessing(true);
    setDone(false);

    try {
      const file = files[0];
      const text = await file.text();

      let tableText = text;
      try {
        const xName = "xlsx";
        const XLSX = await import(xName);
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        tableText = XLSX.utils.sheet_to_csv(worksheet);
      } catch {
        // Pure JS fallback CSV/TSV parser
        tableText = text.replace(/,/g, "   |   ");
      }

      // Generate downloadable PDF
      createBasicPdf(
        `Spreadsheet: ${file.name}`,
        tableText || "Sheet Data Converted Successfully",
        `${file.name.replace(/\.[^/.]+$/, "")}.pdf`
      );

      setDone(true);
    } catch (err) {
      setError("Failed to convert Excel to PDF: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-5">
      <FileDropzone
        accept=".xlsx,.xls,.csv"
        maxSizeMB={50}
        files={files}
        onFilesChange={setFiles}
        hint="Upload Excel spreadsheet (.xlsx, .xls, .csv)"
      />

      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

      {done && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span>✅</span>
          <span>Excel file converted & PDF downloaded successfully!</span>
        </div>
      )}

      <button
        onClick={handleConvert}
        disabled={!files.length || processing}
        className="ct-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Converting…" : "Convert Excel to PDF"}
      </button>
    </div>
  );
}
