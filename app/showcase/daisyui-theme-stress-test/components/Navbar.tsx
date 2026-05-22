import React from 'react';
import { DAISY_THEMES } from '../constants';

interface NavbarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ThemeStressTest
        </a>
      </div>
      <div className="flex-none gap-2">
        <span className="hidden sm:inline font-medium text-base-content/70">
          Select Theme:
        </span>
        <select 
          className="select select-bordered select-sm w-full max-w-xs capitalize"
          value={currentTheme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          <option disabled>Pick a theme</option>
          {DAISY_THEMES.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
