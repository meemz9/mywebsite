import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SkillsSectionProps = {
  skills: string[];
  selectedSkill: string[];
  toggleSkill: (skill: string) => void;
  clearSkills: () => void;
};

export default function SkillsSection({
  skills,
  selectedSkill,
  toggleSkill,
  clearSkills,
}: SkillsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [skillsPerRow, setSkillsPerRow] = useState(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setSkillsPerRow(2);
      else if (window.innerWidth < 768) setSkillsPerRow(3);
      else setSkillsPerRow(4);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxVisible = skillsPerRow * 2; 
  const displayedSkills = showAll ? skills : skills.slice(0, maxVisible);

  return (
    <section id="skills" className="max-w-5xl mx-auto py-12 px-6">
      <h2 className="text-5xl custom-font font-semibold mb-10 text-light">
        Skills
      </h2>

      {selectedSkill.length > 0 && (
        <div className="flex justify-center mb-6">
          <button
            onClick={clearSkills}
            className="flex items-center gap-2 border cursor-pointer border-accent text-accent px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors"
          >
            <X className="h-4 w-4" /> Clear Filters
          </button>
        </div>
      )}

      <motion.div layout transition={{ duration: 0.5, ease: "easeInOut" }}>
        <motion.div
          layout
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center"
        >
          <AnimatePresence>
            {displayedSkills.map((skill) => (
              <motion.button
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  color: selectedSkill.includes(skill) ? "var(--text-accent)" : "var(--text-primary)",
                  borderColor: selectedSkill.includes(skill) ? "var(--border-accent)" : "var(--border-secondary)",
                }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => toggleSkill(skill)}
                whileHover={{borderColor: "var(--border-accent)"}}
                className="border rounded-xl py-3 text-sm cursor-pointer"
              >
                {skill}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {skills.length > maxVisible && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center cursor-pointer gap-2 text-secondary transition-colors"
            >
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <ChevronDown className="h-10 w-10" />
              </motion.div>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
