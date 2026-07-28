"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function decode(str) {
  return decodeURIComponent(escape(atob(str)));
}

export default function Base64EncodeDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEncode() {
    setOutput(encode(input));
    setError("");
  }

  function handleDecode() {
    try {
      setOutput(decode(input));
      setError("");
    } catch (e) {
      setError("Invalid Base64 input.");
      setOutput("");
    }
  }

  return (
    <div>
      <textarea
        className="tool-input"
        rows={6}
        placeholder="Enter text or Base64 string..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-2 mt-3">
        <button type="button" className="btn-primary text-sm" onClick={handleEncode}>
          Encode
        </button>
        <button type="button" className="btn-secondary text-sm" onClick={handleDecode}>
          Decode
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      {output && (
        <div className="mt-4">
          <textarea className="tool-output" rows={6} readOnly value={output} />
          <div className="mt-2">
            <CopyButton text={output} />
          </div>
        </div>
      )}
    </div>
  );
}
