"use client";

import { useState } from "react";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";

import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceList from "../components/ExperienceList";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);

  const filteredExperiences =
    selectedSkill.length > 0
      ? experiences.filter((exp) =>
          exp.tech_used.some((tech: string) => selectedSkill.includes(tech))
        )
      : experiences;

  const toggleSkill = (skill: string) => {
    setSelectedSkill((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <main className="min-h-screen bg-main text-gray-100 selection:bg-pink-500/20 scroll-smooth">
      <HeroSection />
      <AboutSection />
      <SkillsSection
        skills={skills}
        selectedSkill={selectedSkill}
        toggleSkill={toggleSkill}
        clearSkills={() => setSelectedSkill([])}
      />
      <ExperienceList
        selectedSkill={selectedSkill}
        filteredExperiences={filteredExperiences}
      />
      <ContactSection />
    </main>
  );
}
