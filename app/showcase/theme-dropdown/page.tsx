import Link from "next/link";
import ThemeDropdownDemo from "@/components/marketing/ThemeDropdownDemo";

export default function ThemeDropdownShowcase() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Theme Dropdown
          </h1>
          <p className="text-xl text-gray-600">
            Elegant theme selector with smooth transitions and radio inputs
          </p>
        </div>

        {/* Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Live Demo</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <ThemeDropdownDemo />
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Usage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Step 1: Install the Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`import { ThemeDropdown } from "@/components/ui/theme-dropdown";`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Step 2: Use in Your App</h3>
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
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Step 3: Custom Themes (Optional)</h3>
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
          <h2 className="text-3xl font-bold mb-6 text-black">Props</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Prop</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Default</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-purple-600">themes</td>
                  <td className="px-6 py-4 text-sm text-gray-900">ThemeOption[]</td>
                  <td className="px-6 py-4 text-sm text-gray-600">5 default themes</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Array of theme options with label and value</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-purple-600">onThemeChange</td>
                  <td className="px-6 py-4 text-sm text-gray-900">(theme: string) =&gt; void</td>
                  <td className="px-6 py-4 text-sm text-gray-600">undefined</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Callback when theme is selected</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-purple-600">defaultTheme</td>
                  <td className="px-6 py-4 text-sm text-gray-900">string</td>
                  <td className="px-6 py-4 text-sm text-gray-600">&quot;default&quot;</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Initially selected theme</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Customizable Themes</h3>
              <p className="text-gray-600">
                Pass your own theme options with custom labels and values
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-lg border border-pink-200">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pink-600">Radio Input Selection</h3>
              <p className="text-gray-600">
                Uses native radio inputs for accessibility and proper form behavior
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Smooth Transitions</h3>
              <p className="text-gray-600">
                Hover effects and dropdown animations for polished UX
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-lg border border-pink-200">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-pink-600">Dark Mode Ready</h3>
              <p className="text-gray-600">
                Built-in dark mode styling with Tailwind CSS dark: variants
              </p>
            </div>
          </div>
        </section>

        {/* Files Location */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Files Location</h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
            <p className="mb-2">📁 Component:</p>
            <code className="text-purple-400">components/ui/theme-dropdown.tsx</code>
            <p className="mt-4 mb-2">📁 Demo:</p>
            <code className="text-pink-400">components/marketing/ThemeDropdownDemo.tsx</code>
          </div>
        </section>

        {/* Source Attribution */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-black">Source</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-2">Component inspired by DaisyUI theme switcher pattern</p>
            <a
              href="https://daisyui.com/components/dropdown/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 underline transition-colors"
            >
              View DaisyUI Documentation →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
