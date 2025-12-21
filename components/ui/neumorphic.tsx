"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface NeumorphicCardProps {
  children: ReactNode;
  className?: string;
  inset?: boolean;
  intensity?: "soft" | "medium" | "strong";
  rounded?: boolean;
  onClick?: () => void;
}

/**
 * Neumorphic card component with soft shadows and highlights
 * Creates the classic soft UI neumorphic effect
 */
export function NeumorphicCard({
  children,
  className = "",
  inset = false,
  intensity = "medium",
  rounded = true,
  onClick
}: NeumorphicCardProps) {
  const intensityClasses = {
    soft: inset
      ? "shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]"
      : "shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)]",
    medium: inset
      ? "shadow-[inset_3px_3px_6px_rgba(255,255,255,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.15)]"
      : "shadow-[3px_3px_6px_rgba(0,0,0,0.15),-3px_-3px_6px_rgba(255,255,255,0.8)]",
    strong: inset
      ? "shadow-[inset_5px_5px_10px_rgba(255,255,255,0.1),inset_-5px_-5px_10px_rgba(0,0,0,0.2)]"
      : "shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.7)]"
  };

  const baseClasses = `
    bg-gradient-to-br from-gray-100 to-gray-200
    border border-gray-300/50
    ${intensityClasses[intensity]}
    ${rounded ? "rounded-2xl" : "rounded-lg"}
    transition-all duration-200
    ${onClick ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : ""}
    ${className}
  `;

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {children}
    </Component>
  );
}

interface NeumorphicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "raised" | "pressed" | "flat";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Neumorphic button with different variants
 */
export function NeumorphicButton({
  children,
  onClick,
  variant = "raised",
  size = "md",
  className = ""
}: NeumorphicButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    raised: "shadow-[3px_3px_6px_rgba(0,0,0,0.15),-3px_-3px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.7)]",
    pressed: "shadow-[inset_3px_3px_6px_rgba(255,255,255,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.15)]",
    flat: "shadow-none hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)]"
  };

  return (
    <motion.button
      className={`
        bg-gradient-to-br from-gray-100 to-gray-200
        border border-gray-300/50
        rounded-full font-medium text-gray-700
        transition-all duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

interface NeumorphicInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
}

/**
 * Neumorphic input field
 */
export function NeumorphicInput({
  placeholder,
  value,
  onChange,
  type = "text",
  className = ""
}: NeumorphicInputProps) {
  return (
    <div className={`
      bg-gradient-to-br from-gray-100 to-gray-200
      shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]
      border border-gray-300/50
      rounded-xl px-4 py-3
      transition-all duration-200
      focus:shadow-[inset_3px_3px_6px_rgba(255,255,255,0.1),inset_-3px_-3px_6px_rgba(0,0,0,0.15)]
      focus:outline-none
      ${className}
    `}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
      />
    </div>
  );
}