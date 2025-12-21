"use client";

import {
  VariableFont,
  InteractiveTextBlock,
  WordProximity,
  ScrollSpeedFont,
} from "@/components/ui/variable-font";

export default function VariableFontDemo() {
  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-20">
      {/* Single Text Hover */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400">Mouse Proximity</h2>
        <div className="flex justify-center items-center h-64">
          <VariableFont
            text="HOVER ME"
            minWeight={200}
            maxWeight={900}
            className="text-8xl font-bold"
            distanceThreshold={400}
          />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Move your mouse closer to the text - weight: 200-900
        </p>
      </section>

      {/* Word by Word Proximity */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400">Word Proximity</h2>
        <div className="flex justify-center items-center min-h-64">
          <WordProximity
            text="Every word reacts individually to your mouse position creating an organic dynamic typography experience"
            minWeight={200}
            maxWeight={900}
            className="text-5xl font-bold text-center max-w-4xl"
            wordSpacing="1rem"
          />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Each word responds to mouse proximity independently (200-900 weight)
        </p>
      </section>

      {/* Text Block Lines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400">Line Proximity</h2>
        <div className="flex justify-center items-center min-h-96">
          <InteractiveTextBlock
            text={`DESIGN
IS NOT
JUST WHAT
IT LOOKS
LIKE AND
FEELS LIKE
DESIGN IS
HOW IT
WORKS`}
            minWeight={200}
            maxWeight={900}
            className="text-6xl font-bold text-center leading-tight"
          />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Each line changes weight based on proximity (200-900)
        </p>
      </section>

      {/* Scroll Speed */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400">Scroll Speed</h2>
        <div className="flex justify-center items-center h-screen">
          <ScrollSpeedFont
            text="SCROLL FASTER"
            minWeight={200}
            maxWeight={900}
            minWidth={75}
            maxWidth={125}
            className="text-8xl font-bold"
          />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Scroll speed affects the font weight (200-900) and width (75%-125%)
        </p>
      </section>

      {/* Variable Width Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400">Width Variation</h2>
        <div className="flex justify-center items-center h-64">
          <VariableFont
            text="STRETCH"
            minWeight={500}
            maxWeight={500}
            minWidth={50}
            maxWidth={150}
            className="text-8xl font-bold"
            distanceThreshold={300}
          />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Font width changes with mouse distance (50%-150% stretch, weight fixed at 500)
        </p>
      </section>

      {/* Combined Effect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400">Combined Effects</h2>
        <div className="flex justify-center items-center h-64">
          <VariableFont
            text="TRANSFORM"
            minWeight={200}
            maxWeight={900}
            minWidth={75}
            maxWidth={125}
            className="text-8xl font-bold"
            distanceThreshold={350}
          />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Weight (200-900) and width (75%-125%) change together
        </p>
      </section>

      {/* Paragraph Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400">Paragraph Mode</h2>
        <div className="flex justify-center items-center min-h-96">
          <WordProximity
            text="Variable fonts are font files that contain all variations of a typeface in a single file. This means you can have a single font file that includes all the weights widths and styles of a typeface. The variations are controlled by adjustable axes such as weight width slant and optical size."
            minWeight={300}
            maxWeight={800}
            className="text-2xl max-w-3xl text-center leading-relaxed"
            wordSpacing="0.5rem"
          />
        </div>
        <p className="text-center text-gray-500 text-sm">
          Hover over the paragraph to see individual word reactions (300-800)
        </p>
      </section>
    </div>
  );
}
