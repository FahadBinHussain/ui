"use client";
import { TypeWriter } from "@/components/ui/typewriter"

export function TypeWriterDemo() {
  const StaticTextWithClasses = [
    { text: "We are" },
    { text: "Unizoy", className: "text-green-500" },
  ]
  const DynamicTextWithClasses = [
    { text: "Passionately", className: "text-blue-500" },
    { text: "Eagerly", className: "text-blue-500" },
  ]
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <TypeWriter
        className="text-xl lg:text-5xl font-bold"
        staticText={StaticTextWithClasses}
        textArray={DynamicTextWithClasses}
      />
    </div>
  )
}
