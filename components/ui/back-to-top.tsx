"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center opacity-0 pointer-events-auto"
      aria-label="Back to top"
      style={{ opacity: 0, pointerEvents: isVisible ? "auto" : "none" }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
