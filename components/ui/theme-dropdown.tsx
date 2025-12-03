"use client";

import { useState } from "react";

interface ThemeOption {
  label: string;
  value: string;
}

interface ThemeDropdownProps {
  themes?: ThemeOption[];
  onThemeChange?: (theme: string) => void;
  defaultTheme?: string;
}

export function ThemeDropdown({ 
  themes = [
    { label: "Default", value: "default" },
    { label: "Retro", value: "retro" },
    { label: "Cyberpunk", value: "cyberpunk" },
    { label: "Valentine", value: "valentine" },
    { label: "Aqua", value: "aqua" },
  ],
  onThemeChange,
  defaultTheme = "default"
}: ThemeDropdownProps) {
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    onThemeChange?.(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block mb-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Theme</span>
        <svg
          width="12px"
          height="12px"
          className={`fill-current opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <ul className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-20 p-2">
            {themes.map((theme) => (
              <li key={theme.value}>
                <label className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="theme-dropdown"
                    value={theme.value}
                    checked={selectedTheme === theme.value}
                    onChange={() => handleThemeChange(theme.value)}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200">{theme.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
