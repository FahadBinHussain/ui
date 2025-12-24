"use client";
import Link from "next/link";
import { Box, Sparkles, Palette, Layers, MessageSquareQuote, Eye, Zap, MousePointer2, ImageIcon, ScrollText, Type, Users, Pencil, Palette as PaletteIcon, ArrowRightLeft, Diamond, Menu, Search, Layout, Activity, Code, Cloud, Cpu, Database, Flag, Globe, Atom, Star, Rocket, Wand2, Target, Play, ChevronRight, Github, ExternalLink, ArrowLeft, Filter, Grid3X3, List, Droplets, Terminal, Boxes, Move, Shirt, Compass, Film, BookOpen, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { componentsDataFull } from "@/lib/components-data";

export default function AllComponentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Map icon names to actual icon components
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Sparkles, Box, MessageSquareQuote, Users, Terminal, ArrowRightLeft,
      Layers, Activity, Search, Zap, ImageIcon, Shirt, Type, Cloud, Globe,
      ScrollText, Compass, Grid3X3, Droplets, Film, MousePointer2, Atom,
      Boxes, Layout, Eye, Move, Cpu, Pencil, Diamond, Infinity, BookOpen,
      Palette, Wand2, Play
    };
    return icons[iconName] || Box;
  };

  const allComponents = componentsDataFull;

  const categories = [
    { id: 'all', name: 'All Components', count: allComponents.length },
    { id: 'ui', name: 'UI Components', count: allComponents.filter(c => c.category === 'ui').length },
    { id: 'animation', name: 'Animations', count: allComponents.filter(c => c.category === 'animation').length },
    { id: 'interactive', name: 'Interactive', count: allComponents.filter(c => c.category === 'interactive').length },
    { id: '3d', name: '3D Effects', count: allComponents.filter(c => c.category === '3d').length },
    { id: 'effects', name: 'Visual Effects', count: allComponents.filter(c => c.category === 'effects').length },
    { id: 'scientific', name: 'Scientific', count: allComponents.filter(c => c.category === 'scientific').length },
    { id: 'background', name: 'Backgrounds', count: allComponents.filter(c => c.category === 'background').length },
    { id: 'layout', name: 'Layout', count: allComponents.filter(c => c.category === 'layout').length },
    { id: 'text', name: 'Text Effects', count: allComponents.filter(c => c.category === 'text').length },
  ];

  const filteredComponents = useMemo(() => {
    return allComponents
      .filter(component => {
        const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             component.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [allComponents, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                All Components
              </h1>
              <Link
                href="/showcase/list"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                View as List
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredComponents.length} of {allComponents.length} components
          </p>
        </div>

        {/* Components Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component, index) => {
              const Icon = getIcon(component.icon);
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={component.href} className="block group">
                    <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-white/20 to-white/5 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300">
                      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm p-6 rounded-xl h-full group-hover:from-gray-800/90 group-hover:to-gray-900/90 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`rounded-xl bg-gradient-to-br ${component.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {component.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm leading-relaxed mb-3">
                          {component.description}
                        </p>
                        <div>
                          <span className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full capitalize">
                            {component.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComponents.map((component, index) => {
              const Icon = getIcon(component.icon);
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={component.href} className="block group">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`rounded-lg bg-gradient-to-br ${component.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {component.title}
                          </h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm mb-2">
                            {component.description}
                          </p>
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full capitalize">
                              {component.category}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No components found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}