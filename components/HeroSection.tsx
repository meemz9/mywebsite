"use client";

import { motion } from "framer-motion";
import ConnectIcons from "./ConnectIcons";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h1 className="text-7xl font-bold mb-3 custom-font">
          Hey, I’m <span className="text-accent">Meem</span>
        </h1>
        <p className="text-lg text-secondary mb-8">
          Computer Engineering @ University of Waterloo
        </p>
        <ConnectIcons />
      </motion.div>
    </section>
  );
}
