"use client";
import { cn } from "@/lib/utils";
import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Search,
    Settings,
    User,
    Bell,
    MessageSquare,
    Calendar,
    BarChart3,
    FileText,
    Image,
    Music,
    Video,
    ChevronLeft,
    ChevronRight,
    Menu,
    X
} from "lucide-react";

interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
    children?: ReactNode;
}

export const Sidebar = ({
    className,
    children,
    ...props
}: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navigationItems = [
        { icon: Home, label: "Dashboard", href: "#", active: true },
        { icon: Search, label: "Search", href: "#" },
        { icon: BarChart3, label: "Analytics", href: "#" },
        { icon: Calendar, label: "Calendar", href: "#" },
        { icon: MessageSquare, label: "Messages", href: "#" },
        { icon: Bell, label: "Notifications", href: "#" },
        { icon: FileText, label: "Documents", href: "#" },
        { icon: Image, label: "Gallery", href: "#" },
        { icon: Music, label: "Music", href: "#" },
        { icon: Video, label: "Videos", href: "#" },
        { icon: User, label: "Profile", href: "#" },
        { icon: Settings, label: "Settings", href: "#" },
    ];

    const sidebarVariants = {
        expanded: {
            width: 280,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.05,
                delayChildren: 0.1,
            }
        },
        collapsed: {
            width: 80,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.02,
                staggerDirection: -1,
            }
        }
    };

    const itemVariants = {
        expanded: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.2 }
        },
        collapsed: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.2 }
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed top-4 left-4 z-50 md:hidden bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                whileTap={{ scale: 0.95 }}
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>

            {/* Backdrop for mobile */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                className={cn(
                    "fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl z-50",
                    "md:relative md:z-auto",
                    className
                )}
                animate={{
                    width: isCollapsed ? 80 : 280,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">UI</span>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-slate-800">Design System</h2>
                                    <p className="text-xs text-slate-500">2026</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Collapse Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg items-center justify-center transition-colors"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                        ) : (
                            <ChevronLeft className="w-4 h-4 text-slate-600" />
                        )}
                    </motion.button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigationItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                variants={itemVariants}
                                className="relative"
                            >
                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                        backgroundColor: item.active ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 0, 0, 0.05)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200",
                                        item.active && "bg-blue-50 text-blue-700 border border-blue-200/50"
                                    )}
                                >
                                    <div className={cn(
                                        "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                                        item.active ? "bg-blue-100" : "bg-slate-100"
                                    )}>
                                        <IconComponent className={cn(
                                            "w-4 h-4",
                                            item.active ? "text-blue-600" : "text-slate-600"
                                        )} />
                                    </div>

                                    <AnimatePresence>
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="text-sm font-medium text-slate-700 whitespace-nowrap overflow-hidden"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {item.active && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/20">
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4"
                            >
                                <h3 className="font-semibold text-slate-800 mb-2">Pro Tip</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Use keyboard shortcuts for faster navigation. Press <kbd className="px-1 py-0.5 bg-white rounded text-xs">⌘K</kbd> to search.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Mobile overlay adjustment */}
            <motion.div
                animate={{
                    marginLeft: isMobileOpen ? 280 : 0,
                    filter: isMobileOpen ? "blur(4px)" : "blur(0px)"
                }}
                transition={{ duration: 0.3 }}
                className="flex-1"
            >
                {children}
            </motion.div>
        </>
    );
};