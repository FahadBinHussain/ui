"use client";
import React from "react";
import { SVGLoaders } from "@/components/marketing/SVGLoaders";

export default function SVGLoadersPage() {
  return (
    <div className="min-h-screen bg-[#e74c3c] text-white text-center font-['Comfortaa',cursive]">
      <h1 className="m-0 mb-[100px] text-[34px] font-light uppercase bg-[#da3d2e] p-5">
        Pure <b className="font-bold">SVG</b> Loader
      </h1>

      <SVGLoaders />

      <div className="mt-5 p-2.5 text-[10px] font-[arial]">
        Made with <span className="not-italic text-sm relative top-0.5">♥</span> by{" "}
        <a href="https://codepen.io/nikhil8krishnan" target="_blank" rel="noopener noreferrer" className="text-white no-underline hover:underline">
          Nikhil Krishnan
        </a>
      </div>
    </div>
  );
}
