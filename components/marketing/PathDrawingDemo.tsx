"use client";
import { PathDrawing } from "@/components/ui/path-drawing"

export function PathDrawingDemo() {
  return (
    <div className="flex items-center justify-center min-h-[700px] bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <PathDrawing />
    </div>
  )
}
