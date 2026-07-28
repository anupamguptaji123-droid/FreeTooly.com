"use client";

import { useState, useRef, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";

export default function CropJpg() {
  const [files, setFiles] = useState([]);
  const [aspect, setAspect] = useState("free");
  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [imgSrc, setImgSrc] = useState(null);
  
  // Interactive Image Filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [watermark, setWatermark] = useState("");
  
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

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setBlur(0);
    setGrayscale(0);
    setRotation(0);
    setWatermark("");
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

    // Apply Canvas Filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) grayscale(${grayscale}%)`;

    // Rotate if needed
    if (rotation !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    // Apply Watermark if provided
    if (watermark.trim()) {
      ctx.filter = "none";
      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText(watermark, 20, canvas.height - 20);
    }

    const a = document.createElement("a");
    a.download = `edited-${files[0]?.name || "image.jpg"}`;
    a.href = canvas.toDataURL("image/jpeg", 0.92);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDone(true);
  };

  return (
    <div className="space-y-6">
      {!imgSrc ? (
        <FileDropzone
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          maxSizeMB={50}
          files={files}
          onFilesChange={setFiles}
          hint="Upload up to 20 images to crop & edit simultaneously"
        />
      ) : (
        <div className="space-y-6">
          {/* Top Controls Bar */}
          <div className="flex flex-wrap gap-2 items-center justify-between border-b border-slate-200 pb-3">
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
            <div className="flex gap-2">
              <button onClick={resetFilters} className="text-xs text-slate-500 hover:text-slate-700 font-semibold">
                Reset Filters
              </button>
              <button
                onClick={() => setFiles([])}
                className="text-xs text-red-600 hover:underline font-semibold"
              >
                Change Image
              </button>
            </div>
          </div>

          {/* Image Workspace & Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Canvas Box */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-200 select-none min-h-[350px]">
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop preview"
                className="max-h-[400px] w-auto object-contain block mx-auto transition-all"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) grayscale(${grayscale}%)`,
                  transform: `rotate(${rotation}deg)`,
                }}
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

            {/* Interactive Adjustment Controls Panel */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Image Adjustments</h4>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={200}
                  value={brightness}
                  onChange={(e) => setBrightness(e.target.value)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Contrast</span>
                  <span>{contrast}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={200}
                  value={contrast}
                  onChange={(e) => setContrast(e.target.value)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Blur</span>
                  <span>{blur}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={blur}
                  onChange={(e) => setBlur(e.target.value)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Grayscale</span>
                  <span>{grayscale}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={grayscale}
                  onChange={(e) => setGrayscale(e.target.value)}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Rotation</span>
                  <span>{rotation}°</span>
                </div>
                <div className="flex gap-2">
                  {[0, 90, 180, 270].map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setRotation(deg)}
                      className={`flex-1 py-1 rounded border text-[11px] font-bold ${
                        rotation === deg ? "bg-blue-600 text-white" : "bg-white text-slate-700"
                      }`}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Add Watermark Text</label>
                <input
                  type="text"
                  placeholder="e.g. FreeTooly.com"
                  value={watermark}
                  onChange={(e) => setWatermark(e.target.value)}
                  className="tool-input py-2 text-xs"
                />
              </div>
            </div>
          </div>

          {done && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <span>✅</span>
              <span>Edited image downloaded successfully!</span>
            </div>
          )}

          <button onClick={handleDownload} className="ct-btn-primary w-full py-3">
            Download Edited & Cropped Image
          </button>
        </div>
      )}
    </div>
  );
}
