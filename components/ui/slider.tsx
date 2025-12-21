"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
  className?: string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, max = 100, min = 0, step = 1, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        value={value[0]}
        onChange={(e) => onValueChange([parseFloat(e.target.value)])}
        max={max}
        min={min}
        step={step}
        className={cn(
          "w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider",
          className
        )}
        {...props}
      />
    );
  }
);

Slider.displayName = "Slider";

export { Slider };