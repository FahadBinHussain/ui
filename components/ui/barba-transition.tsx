"use client";

import { useEffect, useRef } from "react";
// @ts-ignore - Barba.js doesn't have types
import barba from "@barba/core";

interface BarbaTransitionProps {
  children?: React.ReactNode;
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

export function BarbaTransition({ 
  children,
  onTransitionStart,
  onTransitionEnd
}: BarbaTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Barba.js with advanced options
    barba.init({
      debug: false,
      logLevel: "error",
      cacheFirstPage: true,
      preventRunning: true,
      timeout: 5000,
      
      // Multiple transitions with different effects
      transitions: [
        {
          name: "fade",
          leave(data: any) {
            return new Promise<void>((resolve) => {
              const current = data.current.container;
              current.style.opacity = "1";
              current.style.transition = "opacity 0.5s ease";

              setTimeout(() => {
                current.style.opacity = "0";
              }, 10);

              setTimeout(resolve, 500);
            });
          },
          enter(data: any) {
            return new Promise<void>((resolve) => {
              const next = data.next.container;
              next.style.opacity = "0";
              next.style.transition = "opacity 0.5s ease";

              setTimeout(() => {
                next.style.opacity = "1";
              }, 10);

              setTimeout(resolve, 500);
            });
          },
        },
        {
          name: "slide",
          from: { namespace: ["about"] },
          to: { namespace: ["contact"] },
          leave(data: any) {
            return new Promise<void>((resolve) => {
              const current = data.current.container;
              current.style.transition = "transform 0.5s ease";
              current.style.transform = "translateX(-100%)";
              setTimeout(resolve, 500);
            });
          },
          enter(data: any) {
            return new Promise<void>((resolve) => {
              const next = data.next.container;
              next.style.transform = "translateX(100%)";
              next.style.transition = "transform 0.5s ease";

              setTimeout(() => {
                next.style.transform = "translateX(0)";
              }, 10);

              setTimeout(resolve, 500);
            });
          },
        },
        {
          name: "scale",
          from: { namespace: ["services"] },
          leave(data: any) {
            return new Promise<void>((resolve) => {
              const current = data.current.container;
              current.style.transition = "transform 0.5s ease, opacity 0.5s ease";
              current.style.transform = "scale(0.8)";
              current.style.opacity = "0";
              setTimeout(resolve, 500);
            });
          },
          enter(data: any) {
            return new Promise<void>((resolve) => {
              const next = data.next.container;
              next.style.transform = "scale(1.2)";
              next.style.opacity = "0";
              next.style.transition = "transform 0.5s ease, opacity 0.5s ease";

              setTimeout(() => {
                next.style.transform = "scale(1)";
                next.style.opacity = "1";
              }, 10);

              setTimeout(resolve, 500);
            });
          },
        },
      ],

      // Views for specific pages
      views: [
        {
          namespace: "home",
          beforeEnter() {
            console.log("Entering Home");
          },
          afterEnter() {
            console.log("Home loaded");
          },
        },
        {
          namespace: "about",
          beforeEnter() {
            console.log("Entering About");
          },
        },
      ],
    });

    // Global hooks
    barba.hooks.before(() => {
      onTransitionStart?.();
      console.log("Transition starting...");
    });

    barba.hooks.after(() => {
      onTransitionEnd?.();
      console.log("Transition completed!");
    });

    barba.hooks.enter(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      barba.destroy();
    };
  }, [onTransitionStart, onTransitionEnd]);

  return (
    <div ref={containerRef} data-barba="wrapper">
      <div data-barba="container">{children}</div>
    </div>
  );
}

