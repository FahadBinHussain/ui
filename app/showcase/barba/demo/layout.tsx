"use client";

import { useEffect } from "react";

export default function BarbaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Dynamically import and initialize Barba.js
    const initBarba = async () => {
      const barba = (await import("@barba/core")).default;

      barba.init({
        debug: true,
        logLevel: "error",
        preventRunning: true,
        timeout: 5000,
        
        transitions: [
          {
            name: "fade",
            leave(data: any) {
              return new Promise<void>((resolve) => {
                const current = data.current.container;
                current.style.transition = "opacity 0.5s ease";
                current.style.opacity = "0";
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

        views: [
          {
            namespace: "home",
            beforeEnter() {
              console.log("Entering Home");
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

      barba.hooks.before(() => {
        console.log("Transition starting...");
      });

      barba.hooks.after(() => {
        console.log("Transition completed!");
      });

      barba.hooks.enter(() => {
        window.scrollTo(0, 0);
      });
    };

    initBarba();

    return () => {
      // Cleanup
      if (typeof window !== "undefined" && (window as any).barba) {
        (window as any).barba.destroy();
      }
    };
  }, []);

  return (
    <div data-barba="wrapper">
      {children}
    </div>
  );
}
