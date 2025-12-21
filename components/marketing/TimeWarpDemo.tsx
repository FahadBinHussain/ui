"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import TimeWarpTransition, { useTimeWarpTransition } from "@/components/ui/time-warp-transition";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Zap } from "lucide-react";

const scenes = [
  {
    id: 'scene1',
    title: 'Welcome',
    content: 'Enter the time warp experience',
    bg: 'from-blue-900 via-purple-900 to-indigo-900',
    textColor: 'text-white'
  },
  {
    id: 'scene2',
    title: 'Time Dilation',
    content: 'Experience the bending of time itself',
    bg: 'from-purple-900 via-pink-900 to-red-900',
    textColor: 'text-white'
  },
  {
    id: 'scene3',
    title: 'Speed Lines',
    content: 'Watch reality streak past at incredible speeds',
    bg: 'from-cyan-900 via-blue-900 to-indigo-900',
    textColor: 'text-white'
  },
  {
    id: 'scene4',
    title: 'Color Shift',
    content: 'Witness the spectrum bend through time',
    bg: 'from-yellow-900 via-orange-900 to-red-900',
    textColor: 'text-white'
  }
];

export default function TimeWarpDemo() {
  const [currentScene, setCurrentScene] = useState(0);
  const { isActive, triggerTransition } = useTimeWarpTransition();

  const nextScene = () => {
    triggerTransition(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    });
  };

  const resetScenes = () => {
    triggerTransition(() => {
      setCurrentScene(0);
    });
  };

  const currentSceneData = scenes[currentScene];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <TimeWarpTransition isActive={isActive}>
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSceneData.bg} transition-all duration-1000`} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {currentSceneData.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
            >
              {currentSceneData.content}
            </motion.p>

            {/* Scene Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex justify-center space-x-2 mb-12"
            >
              {scenes.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentScene
                      ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={nextScene}
                disabled={isActive}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-cyan-500/25 disabled:opacity-50"
              >
                <Play className="w-5 h-5 mr-2" />
                {isActive ? 'Warping...' : 'Next Scene'}
              </Button>

              <Button
                onClick={resetScenes}
                disabled={isActive}
                variant="purple"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-4 rounded-xl disabled:opacity-50 bg-transparent"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </motion.div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-cyan-400 mr-3" />
                <h3 className="text-lg font-semibold text-cyan-400">GSAP Timeline</h3>
              </div>
              <p className="text-gray-300">Advanced animation sequencing with precise timing control</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded mr-3" />
                <h3 className="text-lg font-semibold text-purple-400">Color Shifting</h3>
              </div>
              <p className="text-gray-300">Dynamic hue rotation and color spectrum transitions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mr-3 animate-pulse" />
                <h3 className="text-lg font-semibold text-blue-400">Speed Lines</h3>
              </div>
              <p className="text-gray-300">Motion blur effects simulating high-speed movement</p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-12 text-center text-sm text-gray-400"
          >
            <p>Click "Next Scene" to experience the time warp transition ✨</p>
          </motion.div>
        </div>
      </TimeWarpTransition>
    </div>
  );
}