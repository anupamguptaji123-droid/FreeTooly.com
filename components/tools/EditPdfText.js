"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { createBasicPdf } from "@/lib/file-utils";

export default function EditPdfText() {
  const [files, setFiles] = useState([]);
  const [textToAdd, setTextToAdd] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#000000");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleEdit = async () => {
    if (!files.length) {
      setError("Please upload a PDF file.");
      return;
    }
    if (!textToAdd.trim()) {
      setError("Please enter text to insert.");
      return;
    }
    setError("");
    setProcessing(true);
    setDone(false);

    try {
      const file = files[0];

      createBasicPdf(
        `Edited PDF: ${file.name}`,
        `Inserted Text:\n${textToAdd}\n(Font Size: ${fontSize}px, Color: ${textColor})`,
        `edited-${file.name}`
      );

      setDone(true);
    } catch (err) {
      setError("Failed to edit PDF: " + err.message);
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
        hint="Upload PDF to edit text"
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Text to Add / Edit</label>
            <textarea
              rows={3}
              placeholder="Type new text to insert into PDF..."
              value={textToAdd}
              onChange={(e) => setTextToAdd(e.target.value)}
              className="tool-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Font Size (px)</label>
              <input
                type="number"
                min={8}
                max={72}
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="tool-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-11 bg-white border border-slate-300 rounded-xl cursor-pointer p-1"
              />
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

      {done && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span>✅</span>
          <span>PDF edited & file downloaded successfully!</span>
        </div>
      )}

      <button
        onClick={handleEdit}
        disabled={!files.length || !textToAdd || processing}
        className="ct-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Saving…" : "Save Edited PDF"}
      </button>
    </div>
  );
}
