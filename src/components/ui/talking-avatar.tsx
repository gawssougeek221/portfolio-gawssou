"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { WordRotate } from "@/components/ui/word-rotate";
import { cn } from "@/lib/utils";

interface TalkingAvatarProps {
  messages?: string[];
  avatarUrl?: string;
  className?: string;
}

export function TalkingAvatar({
  messages = [
    "Besoin d'un développeur ?",
    "Discutons de votre projet !",
    "IA & Automation是我的 passion",
    "Contactez-moi sur WhatsApp",
  ],
  avatarUrl,
  className,
}: TalkingAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", className)}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative bg-neutral-900 border border-white/15 rounded-2xl p-4 shadow-2xl max-w-[260px] backdrop-blur-md"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                GT
              </div>
              <span className="text-xs font-semibold text-white">Gawssou Thiam</span>
            </div>
            <div className="min-h-[28px]">
              <WordRotate
                duration={3000}
                words={messages}
                className="text-sm font-medium text-neutral-200"
                framerProps={{
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 10 },
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              />
            </div>
            <a
              href="https://wa.me/221701056707"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              Discuter sur WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
        aria-label="Avatar IA"
      >
        <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-lg font-bold text-white">GT</span>
          )}
        </div>
        {/* Online Pulse */}
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-neutral-950 animate-pulse" />
      </motion.button>
    </div>
  );
}
