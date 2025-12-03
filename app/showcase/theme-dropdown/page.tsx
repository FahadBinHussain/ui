"use client";

import Link from "next/link";
import { ThemeDropdown } from "@/components/ui/theme-dropdown";
import { useState, useEffect } from "react";

export default function ThemeDropdownShowcase() {
  const [currentTheme, setCurrentTheme] = useState("light");

  const handleThemeChange = (theme: string) => {
    console.log("Selected theme:", theme);
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const getThemeStyles = () => {
    switch (currentTheme) {
      case "light":
        return { bg: "bg-white", cardBg: "bg-gray-50", text: "text-gray-900", border: "border-gray-200", gradient: "from-blue-600 to-purple-600" };
      case "dark":
        return { bg: "bg-[#1d232a]", cardBg: "bg-[#191e24]", text: "text-white", border: "border-gray-700", gradient: "from-blue-500 to-purple-500" };
      case "cupcake":
        return { bg: "bg-[#faf7f5]", cardBg: "bg-[#e7e5e4]", text: "text-[#291334]", border: "border-[#e0d7d1]", gradient: "from-[#65c3c8] to-[#ef9fbc]" };
      case "bumblebee":
        return { bg: "bg-[#fef9e7]", cardBg: "bg-[#fcf7d8]", text: "text-[#181830]", border: "border-[#f7e8a1]", gradient: "from-[#f28c18] to-[#e8b931]" };
      case "emerald":
        return { bg: "bg-white", cardBg: "bg-[#ecfdf5]", text: "text-[#065f46]", border: "border-[#a7f3d0]", gradient: "from-[#059669] to-[#10b981]" };
      case "corporate":
        return { bg: "bg-white", cardBg: "bg-[#f3f4f6]", text: "text-[#111827]", border: "border-[#e5e7eb]", gradient: "from-[#4b5563] to-[#6b7280]" };
      case "synthwave":
        return { bg: "bg-[#1a103d]", cardBg: "bg-[#231748]", text: "text-[#f9f0ff]", border: "border-[#5b3a9a]", gradient: "from-[#ff00ff] to-[#00ffff]" };
      case "retro":
        return { bg: "bg-[#e4d8b4]", cardBg: "bg-[#e9d5a1]", text: "text-[#282425]", border: "border-[#c5a572]", gradient: "from-[#ef9995] to-[#cd5c5c]" };
      case "cyberpunk":
        return { bg: "bg-[#ffee00]", cardBg: "bg-[#ff00ff]", text: "text-[#000000]", border: "border-[#00ffff]", gradient: "from-[#ff00ff] to-[#00ffff]" };
      case "valentine":
        return { bg: "bg-[#efe3e7]", cardBg: "bg-[#f2dfe2]", text: "text-[#632c3b]", border: "border-[#e4d4d8]", gradient: "from-[#e96d7b] to-[#ce5a67]" };
      case "halloween":
        return { bg: "bg-[#1b1a29]", cardBg: "bg-[#2a2539]", text: "text-[#f28c18]", border: "border-[#5c4d7d]", gradient: "from-[#f28c18] to-[#ff6d00]" };
      case "garden":
        return { bg: "bg-[#ecf3ed]", cardBg: "bg-[#dde9df]", text: "text-[#2a5934]", border: "border-[#b9d9c3]", gradient: "from-[#5c7f67] to-[#82b094]" };
      case "forest":
        return { bg: "bg-[#171212]", cardBg: "bg-[#1d1a1a]", text: "text-[#e4e0dd]", border: "border-[#3a3331]", gradient: "from-[#1eb854] to-[#00a768]" };
      case "aqua":
        return { bg: "bg-[#d7f5f5]", cardBg: "bg-[#c7e8ea]", text: "text-[#165861]", border: "border-[#a2d9db]", gradient: "from-[#1eb8c4] to-[#2980b9]" };
      case "lofi":
        return { bg: "bg-[#1a1919]", cardBg: "bg-[#0f0f0f]", text: "text-[#e4e0dd]", border: "border-[#4a4545]", gradient: "from-[#808080] to-[#a0a0a0]" };
      case "pastel":
        return { bg: "bg-[#f8f8ff]", cardBg: "bg-[#efefff]", text: "text-[#333355]", border: "border-[#d3d3ff]", gradient: "from-[#d6c6ff] to-[#ffc4e1]" };
      case "fantasy":
        return { bg: "bg-[#f7e4f3]", cardBg: "bg-[#f0d6ea]", text: "text-[#6a1b4d]", border: "border-[#e5b5d8]", gradient: "from-[#c026d3] to-[#db2777]" };
      case "wireframe":
        return { bg: "bg-white", cardBg: "bg-gray-50", text: "text-black", border: "border-black", gradient: "from-gray-600 to-black" };
      case "black":
        return { bg: "bg-black", cardBg: "bg-[#1a1a1a]", text: "text-white", border: "border-gray-800", gradient: "from-gray-500 to-gray-700" };
      case "luxury":
        return { bg: "bg-[#09090b]", cardBg: "bg-[#18181b]", text: "text-[#d4d4d8]", border: "border-[#3f3f46]", gradient: "from-[#ca8a04] to-[#eab308]" };
      case "dracula":
        return { bg: "bg-[#282a36]", cardBg: "bg-[#21222c]", text: "text-[#f8f8f2]", border: "border-[#44475a]", gradient: "from-[#bd93f9] to-[#ff79c6]" };
      case "cmyk":
        return { bg: "bg-white", cardBg: "bg-[#f0f9ff]", text: "text-[#1e3a8a]", border: "border-[#0ea5e9]", gradient: "from-[#06b6d4] to-[#ec4899]" };
      case "autumn":
        return { bg: "bg-[#f5f5f4]", cardBg: "bg-[#e7e5e4]", text: "text-[#78350f]", border: "border-[#d6d3d1]", gradient: "from-[#d97706] to-[#dc2626]" };
      case "business":
        return { bg: "bg-[#e5e7eb]", cardBg: "bg-[#d1d5db]", text: "text-[#1f2937]", border: "border-[#9ca3af]", gradient: "from-[#4b5563] to-[#374151]" };
      case "acid":
        return { bg: "bg-[#fafafa]", cardBg: "bg-[#e5ff00]", text: "text-[#171717]", border: "border-[#ff00ea]", gradient: "from-[#ff00ea] to-[#e5ff00]" };
      case "lemonade":
        return { bg: "bg-[#fafafa]", cardBg: "bg-[#f5f5f5]", text: "text-[#171717]", border: "border-[#d4d4d4]", gradient: "from-[#84cc16] to-[#facc15]" };
      case "night":
        return { bg: "bg-[#0a0e27]", cardBg: "bg-[#060817]", text: "text-[#a6adbb]", border: "border-[#1b2038]", gradient: "from-[#38bdf8] to-[#818cf8]" };
      case "coffee":
        return { bg: "bg-[#1f1f1f]", cardBg: "bg-[#171717]", text: "text-[#e5e7eb]", border: "border-[#404040]", gradient: "from-[#d97706] to-[#92400e]" };
      case "winter":
        return { bg: "bg-[#f0f9ff]", cardBg: "bg-[#e0f2fe]", text: "text-[#075985]", border: "border-[#bae6fd]", gradient: "from-[#0284c7] to-[#0891b2]" };
      case "dim":
        return { bg: "bg-[#1f2937]", cardBg: "bg-[#111827]", text: "text-[#e5e7eb]", border: "border-[#374151]", gradient: "from-[#6366f1] to-[#8b5cf6]" };
      case "nord":
        return { bg: "bg-[#2e3440]", cardBg: "bg-[#3b4252]", text: "text-[#eceff4]", border: "border-[#4c566a]", gradient: "from-[#88c0d0] to-[#81a1c1]" };
      case "sunset":
        return { bg: "bg-[#1a1a2e]", cardBg: "bg-[#16213e]", text: "text-[#e94560]", border: "border-[#0f3460]", gradient: "from-[#e94560] to-[#f97068]" };
      case "caramellatte":
        return { bg: "bg-[#f5ebe0]", cardBg: "bg-[#ede0d4]", text: "text-[#6f4e37]", border: "border-[#dfd3c3]", gradient: "from-[#b08968] to-[#9c6644]" };
      case "abyss":
        return { bg: "bg-[#05080a]", cardBg: "bg-[#0a1117]", text: "text-[#c7d3e3]", border: "border-[#1a2633]", gradient: "from-[#2563eb] to-[#3b82f6]" };
      case "silk":
        return { bg: "bg-[#faf8f5]", cardBg: "bg-[#f3ede4]", text: "text-[#4a3f35]", border: "border-[#e8dfd0]", gradient: "from-[#d4a574] to-[#b8926a]" };
      default:
        return { bg: "bg-white", cardBg: "bg-white", text: "text-black", border: "border-gray-200", gradient: "from-purple-600 to-pink-600" };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent hover:opacity-80 mb-4 inline-block transition-opacity`}
          >
            ← Back to Home
          </Link>
          <h1 className={`text-5xl font-bold mb-4 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            Theme Dropdown
          </h1>
          <p className={`text-xl ${theme.text} opacity-80`}>
            Elegant theme selector with smooth transitions and radio inputs
          </p>
        </div>

        {/* Live Demo */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Live Demo</h2>
          <div className={`${theme.cardBg} border ${theme.border} rounded-lg overflow-hidden p-8 transition-colors duration-500`}>
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Select Your Theme
              </h3>
              <p className={`text-sm ${theme.text} opacity-70 mb-6`}>
                Current: <span className="font-semibold capitalize">{currentTheme}</span>
              </p>
              <ThemeDropdown onThemeChange={handleThemeChange} defaultTheme={currentTheme} />
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Usage</h2>
          <div className="space-y-4">
            <div>
              <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Step 1: Install the Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`import { ThemeDropdown } from "@/components/ui/theme-dropdown";`}</code>
              </pre>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Step 2: Use in Your App</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`export default function MyComponent() {
  const handleThemeChange = (theme: string) => {
    // Apply theme to your app
    console.log("Selected theme:", theme);
  };

  return (
    <ThemeDropdown 
      onThemeChange={handleThemeChange}
      defaultTheme="default"
    />
  );
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Step 3: Custom Themes (Optional)</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`const customThemes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Dracula", value: "dracula" },
  { label: "Nord", value: "nord" },
];

<ThemeDropdown 
  themes={customThemes}
  onThemeChange={handleThemeChange}
/>`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Props</h2>
          <div className="overflow-x-auto">
            <table className={`min-w-full ${theme.cardBg} border ${theme.border} rounded-lg`}>
              <thead className={`${theme.cardBg}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${theme.text}`}>Prop</th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${theme.text}`}>Type</th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${theme.text}`}>Default</th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${theme.text}`}>Description</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme.border}`}>
                <tr className="hover:bg-opacity-50">
                  <td className={`px-6 py-4 text-sm font-mono bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>themes</td>
                  <td className={`px-6 py-4 text-sm ${theme.text}`}>ThemeOption[]</td>
                  <td className={`px-6 py-4 text-sm ${theme.text} opacity-70`}>5 default themes</td>
                  <td className={`px-6 py-4 text-sm ${theme.text} opacity-70`}>Array of theme options with label and value</td>
                </tr>
                <tr className="hover:bg-opacity-50">
                  <td className={`px-6 py-4 text-sm font-mono bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>onThemeChange</td>
                  <td className={`px-6 py-4 text-sm ${theme.text}`}>(theme: string) =&gt; void</td>
                  <td className={`px-6 py-4 text-sm ${theme.text} opacity-70`}>undefined</td>
                  <td className={`px-6 py-4 text-sm ${theme.text} opacity-70`}>Callback when theme is selected</td>
                </tr>
                <tr className="hover:bg-opacity-50">
                  <td className={`px-6 py-4 text-sm font-mono bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>defaultTheme</td>
                  <td className={`px-6 py-4 text-sm ${theme.text}`}>string</td>
                  <td className={`px-6 py-4 text-sm ${theme.text} opacity-70`}>&quot;default&quot;</td>
                  <td className={`px-6 py-4 text-sm ${theme.text} opacity-70`}>Initially selected theme</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`${theme.cardBg} p-6 rounded-lg border ${theme.border} transition-colors duration-500`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Customizable Themes</h3>
              <p className={`${theme.text} opacity-70`}>
                Pass your own theme options with custom labels and values
              </p>
            </div>

            <div className={`${theme.cardBg} p-6 rounded-lg border ${theme.border} transition-colors duration-500`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Radio Input Selection</h3>
              <p className={`${theme.text} opacity-70`}>
                Uses native radio inputs for accessibility and proper form behavior
              </p>
            </div>

            <div className={`${theme.cardBg} p-6 rounded-lg border ${theme.border} transition-colors duration-500`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Smooth Transitions</h3>
              <p className={`${theme.text} opacity-70`}>
                Hover effects and dropdown animations for polished UX
              </p>
            </div>

            <div className={`${theme.cardBg} p-6 rounded-lg border ${theme.border} transition-colors duration-500`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Dark Mode Ready</h3>
              <p className={`${theme.text} opacity-70`}>
                Built-in dark mode styling with Tailwind CSS dark: variants
              </p>
            </div>
          </div>
        </section>

        {/* Files Location */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Files Location</h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
            <p className="mb-2">📁 Component:</p>
            <code className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>components/ui/theme-dropdown.tsx</code>
            <p className="mt-4 mb-2">📁 Demo:</p>
            <code className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>components/marketing/ThemeDropdownDemo.tsx</code>
          </div>
        </section>

        {/* Source Attribution */}
        <section>
          <h2 className={`text-3xl font-bold mb-6 ${theme.text}`}>Source</h2>
          <div className={`${theme.cardBg} border ${theme.border} rounded-lg p-6 transition-colors duration-500`}>
            <p className={`${theme.text} opacity-70 mb-2`}>Component inspired by DaisyUI theme switcher pattern</p>
            <a
              href="https://daisyui.com/components/dropdown/"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent hover:opacity-80 underline transition-opacity`}
            >
              View DaisyUI Documentation →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
