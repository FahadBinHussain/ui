"use client";
import Link from "next/link";
import { Box, Sparkles, Palette, Layers, MessageSquareQuote, Eye, Zap, MousePointer2, ImageIcon, ScrollText, Type, Users, Pencil, Palette as PaletteIcon, ArrowRightLeft, Diamond, Menu, Search, Layout, Activity, Code, Cloud, Cpu, Database, Flag, Globe, Atom, Star, Rocket, Wand2, Target, Play, ChevronRight, Github, ExternalLink, ArrowLeft, Filter, Grid3X3, List, Droplets, Terminal, Boxes, Move, Shirt, Compass, Film, BookOpen, Infinity, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackToTop } from "@/components/ui/back-to-top";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import { componentsDataFull } from "@/lib/components-data";

export default function AllComponentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                  <ArrowLeft size={18} />
                </div>
                <span className="text-sm font-medium">Back</span>
              </Link>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Component Library
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Explore {allComponents.length} cutting-edge UI components
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/showcase/list"
                className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-white/5"
              >
                List View
              </Link>
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar - Enhanced */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
            <div className="relative flex items-center gap-4 bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search components by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-gray-900">
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills - Enhanced */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {category.name}
                  <span className={`text-xs ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {category.count}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12 relative z-10">
        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
            <div>
              <p className="text-white font-medium">
                {filteredComponents.length} {filteredComponents.length === 1 ? 'Component' : 'Components'}
              </p>
              <p className="text-sm text-gray-400">
                {selectedCategory === 'all' ? 'All categories' : categories.find(c => c.id === selectedCategory)?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Components Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component, index) => {
              const Icon = getIcon(component.icon);
              // Extract demo file name and component name from href
              const pathParts = component.href.split('/');
              const demoFileName = pathParts[pathParts.length - 1] || 'page';
              const componentName = demoFileName.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join('');
              
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.03,
                    ease: [0.21, 0.45, 0.27, 0.9]
                  }}
                  className="h-full"
                >
                  <Link href={component.href} className="block h-full group relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-blue-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 overflow-hidden">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Content */}
                      <div className="relative p-6 h-full flex flex-col">
                        {/* Header with Icon */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${component.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                            <div className={`relative rounded-xl bg-gradient-to-br ${component.color} p-3 group-hover:scale-110 transition-transform duration-500`}>
                              <Icon className="h-6 w-6 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 group-hover:translate-x-1 transition-all duration-300">
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {component.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow group-hover:text-gray-300 transition-colors">
                          {component.description}
                        </p>

                        {/* File Names */}
                        <div className="space-y-3 mt-auto">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-purple-500/50 transition-colors font-mono">
                              <Terminal className="w-3 h-3 text-purple-400" />
                              <span className="text-gray-300">{demoFileName}.tsx</span>
                            </div>
                            <div className="text-gray-600">→</div>
                            <div className="px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-500/50 transition-colors font-mono">
                              <span className="text-gray-300">{componentName}</span>
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs font-medium text-gray-300 capitalize">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${component.color}`} />
                              {component.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Glow Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
              // Extract demo file name and component name from href
              const pathParts = component.href.split('/');
              const demoFileName = pathParts[pathParts.length - 1] || 'page';
              const componentName = demoFileName.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join('');
              
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.02,
                    ease: [0.21, 0.45, 0.27, 0.9]
                  }}
                >
                  <Link href={component.href} className="block group">
                    <div className="relative bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 overflow-hidden">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                      
                      <div className="relative p-6">
                        <div className="flex items-center gap-6">
                          {/* Icon */}
                          <div className="relative flex-shrink-0">
                            <div className={`absolute inset-0 bg-gradient-to-br ${component.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                            <div className={`relative rounded-xl bg-gradient-to-br ${component.color} p-4 group-hover:scale-110 transition-transform duration-500`}>
                              <Icon className="h-7 w-7 text-white drop-shadow-lg" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                              {component.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-3 group-hover:text-gray-300 transition-colors">
                              {component.description}
                            </p>
                            
                            {/* File Names and Category */}
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex items-center gap-2 text-xs">
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-purple-500/50 transition-colors font-mono">
                                  <Terminal className="w-3 h-3 text-purple-400" />
                                  <span className="text-gray-300">{demoFileName}.tsx</span>
                                </div>
                                <div className="text-gray-600">→</div>
                                <div className="px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-500/50 transition-colors font-mono">
                                  <span className="text-gray-300">{componentName}</span>
                                </div>
                              </div>
                              
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs font-medium text-gray-300 capitalize">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${component.color}`} />
                                {component.category}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex-shrink-0 p-3 rounded-xl bg-white/5 group-hover:bg-white/10 group-hover:translate-x-2 transition-all duration-300">
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Glow Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                <Search size={64} className="text-gray-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No components found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              We couldn't find any components matching your search. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}