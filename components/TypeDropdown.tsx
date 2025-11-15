"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

type TypeDropdownProps = {
  allTypes: string[];
  selectedType: string;
  setSelectedType: (type: string) => void;
};

export default function TypeDropdown({
  allTypes,
  selectedType,
  setSelectedType,
}: TypeDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 bg-[#111] hover:cursor-pointer border border-secondary text-light text-sm px-4 py-2 rounded-lg hover:border-accent transition-colors duration-200"
      >
        <span>{selectedType === "All" ? "All Types" : selectedType}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[#111] border border-secondary rounded-lg shadow-lg z-20 animate-fadeIn">
          {["All", ...allTypes].map(type => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:cursor-pointer rounded-md transition-colors duration-150 ${
                selectedType === type ? "bg-accent/20 text-accent" : "text-light hover:bg-white/10"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
