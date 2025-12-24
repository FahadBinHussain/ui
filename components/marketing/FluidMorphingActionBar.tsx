"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { 
  Home, 
  Music, 
  ShoppingCart, 
  Settings, 
  Play, 
  Pause,
  SkipForward,
  Volume2,
  X,
  Loader2
} from "lucide-react";

type PillState = "idle" | "menu" | "music" | "cart" | "loading";

interface CartItem {
  id: number;
  name: string;
  price: number;
}

export default function FluidMorphingActionBar() {
  const [state, setState] = useState<PillState>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [cartItems] = useState<CartItem[]>([
    { id: 1, name: "Wireless Headphones", price: 299 },
    { id: 2, name: "Smart Watch", price: 399 },
    { id: 3, name: "USB-C Cable", price: 29 },
  ]);

  // Stiff spring physics for snappy morphing
  const springTransition = {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
  };

  // Pill dimensions based on state
  const dimensions = {
    idle: { width: 60, height: 60, borderRadius: 30 },
    menu: { width: 240, height: 70, borderRadius: 35 },
    music: { width: 380, height: 120, borderRadius: 60 },
    cart: { width: 420, height: 380, borderRadius: 40 },
    loading: { width: 180, height: 70, borderRadius: 35 },
  };

  const handleClose = () => {
    setState("idle");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <MotionConfig transition={springTransition}>
        <motion.div
          layout
          className="relative overflow-hidden bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10"
          animate={{
            width: dimensions[state].width,
            height: dimensions[state].height,
            borderRadius: dimensions[state].borderRadius,
          }}
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <button
                  onClick={() => setState("menu")}
                  className="w-full h-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Settings className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {state === "menu" && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.5, transition: { duration: 0.15 } }}
                className="absolute inset-0 flex items-center justify-around px-6"
              >
                <motion.button
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-xs">Home</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setState("music")}
                  className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
                >
                  <Music className="w-5 h-5" />
                  <span className="text-xs">Music</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setState("cart")}
                  className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-xs">Cart</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setState("loading");
                    setTimeout(() => setState("idle"), 2000);
                  }}
                  className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-xs">Settings</span>
                </motion.button>
              </motion.div>
            )}

            {state === "music" && (
              <motion.div
                key="music"
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.5, transition: { duration: 0.15 } }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white"
              >
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, ...springTransition }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-3 flex items-center justify-center"
                >
                  <Music className="w-8 h-8" />
                </motion.div>

                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-sm font-semibold mb-1"
                >
                  Neon Dreams
                </motion.h3>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="text-xs text-white/60 mb-4"
                >
                  Synthwave Collective
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white text-black rounded-full p-3 hover:bg-white/90 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {state === "cart" && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                className="absolute inset-0 flex flex-col p-6 text-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.h3
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-lg font-bold"
                  >
                    Shopping Cart
                  </motion.h3>
                  <button
                    onClick={handleClose}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="bg-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-white/50">Qty: 1</p>
                      </div>
                      <p className="text-sm font-bold">${item.price}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="border-t border-white/10 pt-4 space-y-3"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="font-medium">
                      ${cartItems.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full py-3 font-semibold hover:shadow-lg transition-shadow"
                  >
                    Checkout
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.5, transition: { duration: 0.15 } }}
                className="absolute inset-0 flex items-center justify-center gap-3 text-white"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <motion.span
                  initial={{ scaleX: 0.5 }}
                  animate={{ scaleX: 1 }}
                  className="text-sm font-medium"
                >
                  Loading...
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </MotionConfig>

      {/* Instructions */}
      <div className="absolute bottom-8 text-center text-white/60 text-sm">
        <p>Click the pill to open the menu</p>
      </div>
    </div>
  );
}
