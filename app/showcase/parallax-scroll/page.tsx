"use client";
import React from "react";
import { ParallaxScroll } from "@/components/marketing/ParallaxScroll";

export default function ParallaxScrollPage() {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <ParallaxScroll />
      <div className="absolute bottom-4 left-0 right-0 text-center z-50">
        <p className="text-xs text-white/70">
          Source:{" "}
          <a
            href="https://www.react-spring.dev/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 underline"
          >
            React Spring Examples
          </a>
        </p>
      </div>
    </div>
  );
}
