"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BioLuminescentGlow, { BioLuminescentPresets } from "../ui/bio-luminescent-glow";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Sparkles, Waves, Fish, Sun, Flame } from "lucide-react";

const organisms = [
  {
    name: 'Deep Sea Jellyfish',
    preset: BioLuminescentPresets.jellyfish,
    icon: Waves,
    description: 'Gentle pulsing like deep sea creatures'
  },
  {
    name: 'Firefly Swarm',
    preset: BioLuminescentPresets.firefly,
    icon: Sparkles,
    description: 'Rapid, twinkling light patterns'
  },
  {
    name: 'Anglerfish Lure',
    preset: BioLuminescentPresets.anglerfish,
    icon: Flame,
    description: 'Intense, predatory glow'
  },
  {
    name: 'Ocean Plankton',
    preset: BioLuminescentPresets.plankton,
    icon: Fish,
    description: 'Subtle, widespread illumination'
  },
  {
    name: 'Bioluminescent Algae',
    preset: BioLuminescentPresets.deepSea,
    icon: Sun,
    description: 'Widespread cyan glow'
  }
];

export default function BioLuminescentDemo() {
  const [selectedOrganism, setSelectedOrganism] = useState(0);
  const [customIntensity, setCustomIntensity] = useState([1]);
  const [customSpeed, setCustomSpeed] = useState([1]);
  const [customSize, setCustomSize] = useState([200]);
  const [backgroundParticles, setBackgroundParticles] = useState<Array<{
    size: number;
    speed: number;
    left: string;
    top: string;
  }>>([]);

  const currentOrganism = organisms[selectedOrganism];
  const currentPreset = currentOrganism.preset;

  // Generate background particles only on client side
  useEffect(() => {
    const particles = Array.from({ length: 8 }).map(() => ({
      size: 150 + Math.random() * 100,
      speed: 0.5 + Math.random() * 0.5,
      left: `${10 + Math.random() * 80}%`,
      top: `${20 + Math.random() * 60}%`,
    }));
    setBackgroundParticles(particles);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0">
        {backgroundParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          >
            <BioLuminescentGlow
              intensity={0.3}
              color={currentPreset.color}
              size={particle.size}
              speed={particle.speed}
            >
              <div className="w-4 h-4 rounded-full bg-white/20" />
            </BioLuminescentGlow>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Bio-Luminescent Glow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
          >
            Organic glow that pulses like bioluminescent organisms in the deep sea.
            Perfect for nature brands, wellness apps, and ambient lighting effects.
          </motion.p>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-12"
          >
            <div className="flex justify-center mb-8">
              <BioLuminescentGlow
                intensity={customIntensity[0]}
                color={currentPreset.color}
                size={customSize[0]}
                speed={customSpeed[0]}
                className="flex items-center justify-center"
              >
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <currentOrganism.icon className="w-12 h-12 text-white" />
                </div>
              </BioLuminescentGlow>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
                {currentOrganism.name}
              </h3>
              <p className="text-gray-400">{currentOrganism.description}</p>
            </div>
          </motion.div>

          {/* Organism Selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          >
            {organisms.map((organism, index) => (
              <Button
                key={index}
                onClick={() => setSelectedOrganism(index)}
                variant={selectedOrganism === index ? "blue" : "purple"}
                className={`p-4 h-auto flex flex-col items-center gap-2 ${
                  selectedOrganism === index
                    ? 'bg-blue-600 border-blue-400'
                    : 'bg-transparent border-purple-600 hover:bg-purple-900/50'
                }`}
              >
                <organism.icon className="w-6 h-6" />
                <span className="text-sm text-center">{organism.name.split(' ')[0]}</span>
              </Button>
            ))}
          </motion.div>

          {/* Custom Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-6 text-center">
              Customize Glow Effect
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Intensity: {customIntensity[0].toFixed(1)}
                </label>
                <Slider
                  value={customIntensity}
                  onValueChange={setCustomIntensity}
                  max={2}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Speed: {customSpeed[0].toFixed(1)}x
                </label>
                <Slider
                  value={customSpeed}
                  onValueChange={setCustomSpeed}
                  max={3}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Size: {customSize[0]}px
                </label>
                <Slider
                  value={customSize}
                  onValueChange={setCustomSize}
                  max={400}
                  min={50}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-3">
                <Waves className="w-6 h-6 text-cyan-400 mr-3" />
                <h3 className="text-lg font-semibold text-cyan-400">Sine Wave Animation</h3>
              </div>
              <p className="text-gray-300">Organic pulsing using mathematical sine functions for natural rhythm</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-3">
                <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="text-lg font-semibold text-purple-400">CSS Custom Properties</h3>
              </div>
              <p className="text-gray-300">Dynamic values controlled through CSS variables for smooth transitions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-3">
                <Fish className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-semibold text-blue-400">Bioluminescent Behavior</h3>
              </div>
              <p className="text-gray-300">Mimics real deep-sea organisms with layered glow effects and pulsing patterns</p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-12 text-center text-sm text-gray-400"
          >
            <p>✨ Experience the organic glow of deep-sea bioluminescence • Adjust parameters above</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}