"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-[100] transform-gpu"
    />
  );
}
