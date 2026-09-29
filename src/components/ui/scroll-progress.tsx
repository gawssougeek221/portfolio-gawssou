"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-[100]"
      />
      {/* subtle glow under the bar */}
      <motion.div
        style={{ scaleX, opacity: 0.4 }}
        className="fixed top-[3px] left-0 right-0 h-[8px] origin-left bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 blur-md z-[99] pointer-events-none"
      />
    </>
  );
}
