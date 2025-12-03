"use client";

import { useEffect, useRef } from "react";
// @ts-ignore - Barba.js doesn't have types
import barba from "@barba/core";

interface BarbaTransitionProps {
  children?: React.ReactNode;
}

export function BarbaTransition({ children }: BarbaTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Barba.js
    barba.init({
      transitions: [
        {
          name: "fade",
          leave(data: any) {
            return new Promise<void>((resolve) => {
              const done = data.current.container;
              done.style.opacity = "1";
              done.style.transition = "opacity 0.5s ease";

              setTimeout(() => {
                done.style.opacity = "0";
              }, 10);

              setTimeout(() => {
                resolve();
              }, 500);
            });
          },
          enter(data: any) {
            return new Promise<void>((resolve) => {
              const done = data.next.container;
              done.style.opacity = "0";
              done.style.transition = "opacity 0.5s ease";

              setTimeout(() => {
                done.style.opacity = "1";
              }, 10);

              setTimeout(() => {
                resolve();
              }, 500);
            });
          },
        },
      ],
    });

    return () => {
      barba.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} data-barba="wrapper">
      <div data-barba="container">{children}</div>
    </div>
  );
}
