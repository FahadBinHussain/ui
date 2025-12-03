"use client";
import { ElectricBorder } from "@/components/ui/electric-border";

export function ElectricBorderDemo() {
  return (
    <div className="flex flex-col gap-8 items-center">
      {/* Default Orange Theme */}
      <ElectricBorder />

      {/* Purple Theme */}
      <ElectricBorder
        title="Purple Energy"
        description="A vibrant purple electric border effect"
        borderColor="#8b5cf6"
        glowColor="#a78bfa"
        gradientColor="#8b5cf6"
        backgroundColor="#1e1b4b"
        labelVisible={true}
        label="Energetic"
      />

      {/* Cyan Theme */}
      <ElectricBorder
        title="Cyber Glow"
        description="Futuristic cyan electric effect"
        borderColor="#06b6d4"
        glowColor="#22d3ee"
        gradientColor="#06b6d4"
        backgroundColor="#0c4a6e"
        labelVisible={true}
        label="Futuristic"
      />
    </div>
  );
}
