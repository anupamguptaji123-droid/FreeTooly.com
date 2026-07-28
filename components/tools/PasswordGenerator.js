"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");

  function toggle(key) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function generate() {
    const pool = Object.entries(options)
      .filter(([, enabled]) => enabled)
      .map(([key]) => SETS[key])
      .join("");

    if (!pool) {
      setPassword("");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i += 1) {
      result += pool[array[i] % pool.length];
    }
    setPassword(result);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-slate-600">Length</label>
        <input
          type="number"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="border border-slate-200 rounded-lg px-3 py-2 w-24"
        />
      </div>
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        {Object.keys(SETS).map((key) => (
          <label key={key} className="flex items-center gap-2 capitalize">
            <input type="checkbox" checked={options[key]} onChange={() => toggle(key)} />
            {key}
          </label>
        ))}
      </div>
      <button type="button" className="btn-primary text-sm" onClick={generate}>
        Generate Password
      </button>
      {password && (
        <div className="mt-4">
          <input readOnly value={password} className="tool-output w-full" />
          <div className="mt-2">
            <CopyButton text={password} />
          </div>
        </div>
      )}
    </div>
  );
}
