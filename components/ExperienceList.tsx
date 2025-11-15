"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import TypeDropdown from "./TypeDropdown";
type ExperienceListProps = {
  selectedSkill: string[];
  filteredExperiences: typeof import("../data/experiences.json");
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExperienceList({
  selectedSkill,
  filteredExperiences,
}: ExperienceListProps) {
  const [selectedType, setSelectedType] = useState("All");
  const [open, setOpen] = useState(false);
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

  const allTypes = useMemo(
    () =>
      Array.from(new Set(filteredExperiences.map((exp) => exp.type))).filter(Boolean),
    [filteredExperiences]
  );

  const displayedExperiences = useMemo(() => {
    return selectedType === "All"
      ? filteredExperiences
      : filteredExperiences.filter((exp) => exp.type === selectedType);
  }, [selectedType, filteredExperiences]);

  return (
    <section id="experiences" className="max-w-5xl mx-auto py-12 px-6">
      {/* Header + Dropdown */}
      <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
        <h2 className="text-5xl custom-font font-semibold text-light text-left">
          {selectedSkill.length > 0
            ? `Experiences using ${selectedSkill.join(", ")}`
            : "Experiences"}
        </h2>

        <TypeDropdown
          allTypes={allTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>


      {/* Experiences Grid */}
      {displayedExperiences.length === 0 ? (
        <p className="text-center text-secondary transition-opacity duration-200">
          No experiences found for this selection.
        </p>
      ) : (
        <div
          className="grid gap-8 md:grid-cols-2 transition-all duration-200"
          key={selectedType}
        >
          {displayedExperiences.map((proj, index) => (
            <div
              key={index}
              className="bg-[#111] rounded-2xl p-6 border border-secondary hover:border-accent transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">{proj.role}</h3>
                {proj.type && (
                  <span
                    className={`inline-flex whitespace-nowrap text-xs px-3 py-1 rounded-full border ${
                      proj.type === "Co-op"
                        ? "border-purple-400/40 text-purple-300"
                        : proj.type === "Project"
                        ? "border-orange-400/40 text-orange-300"
                        : proj.type === "Volunteer"
                        ? "border-blue-400/40 text-blue-300"
                        : "border-pink-400/40 text-pink-300"
                    }`}
                  >
                    {proj.type}
                  </span>
                )}
              </div>

              {proj.company.length > 0 ? (
                <p className="text-accent text-sm mb-1 flex justify-between">
                  <span>{proj.company}</span>
                  <span>
                    {formatDate(proj.start_date)}
                    {proj.end_date ? " → " + formatDate(proj.end_date) : ""}
                  </span>
                </p>
              ) : (
                <p className="text-accent text-sm mb-1">
                  {formatDate(proj.start_date)}
                  {proj.end_date ? " → " + formatDate(proj.end_date) : ""}
                </p>
              )}

              <p className="text-secondary mb-4">{proj.description}</p>

              <div className="flex flex-wrap gap-2">
                {proj.tech_used.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="border border-secondary hover:border-light hover:text-primary text-secondary text-xs px-2 py-1 rounded-full transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
