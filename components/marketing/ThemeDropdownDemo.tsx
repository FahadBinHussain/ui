"use client";

import { ThemeDropdown } from "@/components/ui/theme-dropdown";
import { useEffect, useState } from "react";

export default function ThemeDropdownDemo() {
  const [currentTheme, setCurrentTheme] = useState("default");

  const handleThemeChange = (theme: string) => {
    console.log("Selected theme:", theme);
    setCurrentTheme(theme);
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const getThemeColors = () => {
    switch (currentTheme) {
      case "retro":
        return "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-800";
      case "cyberpunk":
        return "bg-gradient-to-br from-fuchsia-50 to-cyan-100 dark:from-fuchsia-900 dark:to-cyan-800";
      case "valentine":
        return "bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900 dark:to-rose-800";
      case "aqua":
        return "bg-gradient-to-br from-blue-50 to-teal-100 dark:from-blue-900 dark:to-teal-800";
      default:
        return "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800";
    }
  };

  return (
    <div className={`min-h-[400px] flex items-center justify-center ${getThemeColors()} p-8 transition-colors duration-500`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Select Your Theme
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Current: <span className="font-semibold capitalize">{currentTheme}</span>
        </p>
        <ThemeDropdown onThemeChange={handleThemeChange} defaultTheme={currentTheme} />
      </div>
    </div>
  );
}
