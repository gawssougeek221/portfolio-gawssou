"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Parallax : enveloppe qui déplace son contenu à une vitesse donnée  */
/*  speed > 0 → descend plus vite, speed < 0 → effet profondeur inverse */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drift : translation horizontale liée au scroll (titres géants)     */
/* ------------------------------------------------------------------ */
export function Drift({
  children,
  from = "8%",
  to = "-8%",
  className,
}: {
  children: ReactNode;
  from?: string | number;
  to?: string | number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ x }} className="will-change-transform whitespace-nowrap">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal : apparition fluide au scroll (fade + rise + blur)          */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ScaleOnScroll : zoom doux d'une carte / image au scroll            */
/* ------------------------------------------------------------------ */
export function ScaleOnScroll({
  children,
  className,
  from = 0.92,
  to = 1,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export type ParallaxY = MotionValue<number>;
