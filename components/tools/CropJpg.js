"use client";

import { useState, useRef, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";

export default function CropJpg() {
  const [files, setFiles] = useState([]);
  const [aspect, setAspect] = useState("free"); // free, 1:1, 4:3, 16:9
  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [imgSrc, setImgSrc] = useState(null);
  const imgRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImgSrc(url);
      setDone(false);
      return () => URL.revokeObjectURL(url);
    } else {
      setImgSrc(null);
      setDone(false);
    }
  }, [files]);

  const handleAspectChange = (ratio) => {
    setAspect(ratio);
    if (ratio === "1:1") {
      setCrop({ x: 20, y: 20, width: 60, height: 60 });
    } else if (ratio === "4:3") {
      setCrop({ x: 10, y: 20, width: 80, height: 60 });
    } else if (ratio === "16:9") {
      setCrop({ x: 10, y: 25, width: 80, height: 45 });
    } else {
      setCrop({ x: 10, y: 10, width: 80, height: 80 });
    }
  };

  const handleDownload = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const canvas = document.createElement("canvas");

    const cropX = (crop.x / 100) * img.naturalWidth;
    const cropY = (crop.y / 100) * img.naturalHeight;
    const cropW = (crop.width / 100) * img.naturalWidth;
    const cropH = (crop.height / 100) * img.naturalHeight;

    canvas.width = Math.max(1, cropW);
    canvas.height = Math.max(1, cropH);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const a = document.createElement("a");
    a.download = `cropped-${files[0]?.name || "image.jpg"}`;
    a.href = canvas.toDataURL("image/jpeg", 0.92);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDone(true);
  };

  return (
    <div className="space-y-5">
      {!imgSrc ? (
        <FileDropzone
          accept=".jpg,.jpeg,.png,.webp"
          maxSizeMB={20}
          files={files}
          onFilesChange={setFiles}
          hint="Upload JPG, PNG, or WebP image to crop"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2">
              {["free", "1:1", "4:3", "16:9"].map((r) => (
                <button
                  key={r}
                  onClick={() => handleAspectChange(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                    aspect === r
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFiles([])}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold"
            >
              Choose Different Image
            </button>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center border border-slate-200 select-none max-h-[450px]">
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop preview"
              className="max-h-[420px] w-auto object-contain block mx-auto"
            />
            <div
              className="absolute border-2 border-blue-500 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move"
              style={{
                left: `${crop.x}%`,
                top: `${crop.y}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
              }}
            />
          </div>

          {done && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <span>✅</span>
              <span>Cropped JPG downloaded successfully!</span>
            </div>
          )}

          <button onClick={handleDownload} className="ct-btn-primary w-full py-3">
            Download Cropped Image
          </button>
        </div>
      )}
    </div>
  );
}
