"use client";
import { cn } from "@/lib/utils";
import React, { useState, ReactNode } from "react";
import { Search, X, Clock, TrendingUp, Hash, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchInterfaceProps extends React.HTMLProps<HTMLDivElement> {
    children?: ReactNode;
}

export const SearchInterface = ({
    className,
    children,
    ...props
}: SearchInterfaceProps) => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [recentSearches] = useState([
        "React components",
        "TypeScript tips",
        "Next.js 16 features",
        "Tailwind CSS tricks"
    ]);

    const [trendingTopics] = useState([
        { term: "AI", count: "2.1M" },
        { term: "Web3", count: "1.8M" },
        { term: "React", count: "3.2M" },
        { term: "TypeScript", count: "2.7M" }
    ]);

    const [suggestions] = useState([
        { type: "component", title: "Button Variants", description: "Modern button styles and animations" },
        { type: "tutorial", title: "Framer Motion Guide", description: "Complete animation tutorial" },
        { type: "user", title: "John Doe", description: "UI/UX Designer" }
    ]);

    return (
        <div
            className={cn(
                "relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4",
                className
            )}
            {...props}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                                    radial-gradient(circle at 75% 75%, #6366f1 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Search Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-2xl mx-auto"
            >
                {/* Main Search Input */}
                <div className="relative mb-8">
                    <motion.div
                        animate={{
                            scale: isFocused ? 1.02 : 1,
                            boxShadow: isFocused
                                ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                                : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                    >
                        <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                            <div className="flex items-center px-6 py-4">
                                <Search className="w-6 h-6 text-slate-400 mr-4" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Search for components, tutorials, users..."
                                    className="flex-1 bg-transparent text-lg text-slate-700 placeholder-slate-400 outline-none"
                                />
                                <AnimatePresence>
                                    {query && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => setQuery("")}
                                            className="ml-4 p-1 rounded-full hover:bg-slate-100 transition-colors"
                                        >
                                            <X className="w-5 h-5 text-slate-400" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Animated border */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                                initial={{ width: 0 }}
                                animate={{ width: isFocused ? "100%" : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Search Results/Suggestions */}
                <AnimatePresence>
                    {isFocused && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Recent Searches */}
                            {query === "" && (
                                <div className="p-6 border-b border-slate-100">
                                    <div className="flex items-center mb-4">
                                        <Clock className="w-5 h-5 text-slate-400 mr-2" />
                                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Recent Searches</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {recentSearches.map((search, index) => (
                                            <motion.button
                                                key={search}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => setQuery(search)}
                                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
                                            >
                                                {search}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Trending Topics */}
                            {query === "" && (
                                <div className="p-6 border-b border-slate-100">
                                    <div className="flex items-center mb-4">
                                        <TrendingUp className="w-5 h-5 text-slate-400 mr-2" />
                                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Trending Topics</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {trendingTopics.map((topic, index) => (
                                            <motion.button
                                                key={topic.term}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                onClick={() => setQuery(topic.term)}
                                                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all"
                                            >
                                                <Hash className="w-3 h-3 inline mr-1" />
                                                {topic.term}
                                                <span className="ml-2 text-xs text-blue-500">{topic.count}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search Suggestions */}
                            {query !== "" && (
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Search className="w-5 h-5 text-slate-400 mr-2" />
                                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Suggestions</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {suggestions
                                            .filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
                                            .map((suggestion, index) => (
                                                <motion.div
                                                    key={suggestion.title}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                                                >
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                                        {suggestion.type === 'component' && <div className="w-5 h-5 bg-blue-500 rounded"></div>}
                                                        {suggestion.type === 'tutorial' && <div className="w-5 h-5 bg-green-500 rounded"></div>}
                                                        {suggestion.type === 'user' && <User className="w-5 h-5 text-indigo-500" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-slate-700">{suggestion.title}</div>
                                                        <div className="text-sm text-slate-500">{suggestion.description}</div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Search Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-slate-500 text-sm mt-8"
                >
                    Search across 10,000+ components, tutorials, and community members
                </motion.div>
            </motion.div>

            {children}
        </div>
    );
};