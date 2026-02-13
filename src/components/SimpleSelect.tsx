// Simplified Select Component
import React from 'react';

interface SimpleSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function SimpleSelect({ label, value, onChange, options }: SimpleSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    console.log(`SimpleSelect ${label}: changing from "${value}" to "${newValue}"`);
    onChange(newValue);
  };

  return (
    <div>
      <label className="block mb-[8px] text-[13px] text-[#9e9e9d]">
        {label}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f1f0eb] px-4 py-3 text-[13px] focus:outline-none focus:border-[#11ff49] transition-colors"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
