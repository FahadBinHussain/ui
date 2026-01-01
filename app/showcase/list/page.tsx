"use client";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackToTop } from "@/components/ui/back-to-top";
import { useState, useMemo } from "react";
import { componentsDataFull } from "@/lib/components-data";

export default function ComponentsListPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allComponents = componentsDataFull;

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return allComponents;
    const query = searchQuery.toLowerCase();
    return allComponents.filter(
      component =>
        component.title.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const markdownList = filteredComponents
    .map(component => {
      const tags = component.tags && component.tags.length > 0 
        ? ` [${component.tags.join(', ')}]` 
        : '';
      return `- **${component.title}**: ${component.description}${tags}`;
    })
    .join('\n');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownList);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyComponentToClipboard = async (component: typeof allComponents[0], index: number) => {
    try {
      const tags = component.tags && component.tags.length > 0 
        ? ` [${component.tags.join(', ')}]` 
        : '';
      const componentText = `- **${component.title}**: ${component.description}${tags}`;
      await navigator.clipboard.writeText(componentText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <Link href="/showcase/all">
            <Button
              className="bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Button
            onClick={copyToClipboard}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 text-blue-200 hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-400/40 transition-all"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied All!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </>
            )}
          </Button>
        </div>

        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Component Library
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Explore our collection of advanced UI components and effects
          </p>

          {/* Stats Bar */}
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-gray-400">Total Components:</span>
              <span className="text-white font-semibold text-lg">{allComponents.length}</span>
            </div>
            {searchQuery && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-gray-400">Filtered:</span>
                <span className="text-white font-semibold text-lg">{filteredComponents.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Component List */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="divide-y divide-white/5">
            {filteredComponents.map((component, index) => (
              <div
                key={index}
                className="group hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-start gap-4 p-5 md:p-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 flex items-center justify-center text-blue-300 text-sm font-semibold group-hover:border-blue-400/40 transition-all">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-300 transition-colors">
                      {component.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">
                      {component.description}
                    </p>
                    {component.tags && component.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {component.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Copy Button */}
                  <Button
                    onClick={() => copyComponentToClipboard(component, index)}
                    className="flex-shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white p-2 h-9 w-9 opacity-0 group-hover:opacity-100 transition-all"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No components found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Click the copy button next to any component to copy its markdown format</p>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}