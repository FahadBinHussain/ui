"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/components/animations/variants";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/**
 * Example marketing hero section with Framer Motion
 * Ready for Aceternity/Magic UI style components
 */
export function HeroSection({ title, subtitle, children }: HeroSectionProps) {
  return (
    <motion.section
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 text-xl text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
