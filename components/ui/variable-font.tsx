"use client";

import React, { useRef, useState, useEffect } from "react";

// Note: Make sure to load variable fonts in your app
// Add to your layout.tsx or _document.tsx:
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface VariableFontProps {
  text: string;
  font?: string;
  minWeight?: number;
  maxWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  animateOnHover?: boolean;
  animateOnScroll?: boolean;
  className?: string;
  distanceThreshold?: number;
}

export const VariableFont: React.FC<VariableFontProps> = ({
  text,
  font = '"Inter", system-ui, sans-serif',
  minWeight = 100,
  maxWeight = 900,
  minWidth = 75,
  maxWidth = 125,
  animateOnHover = true,
  animateOnScroll = false,
  className = "",
  distanceThreshold = 300,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSettings, setFontSettings] = useState({
    weight: minWeight,
    width: minWidth,
  });
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollPos = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    if (!animateOnHover && !animateOnScroll) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current || !animateOnHover) return;

      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      const normalizedDistance = Math.min(distance / distanceThreshold, 1);
      const weight = maxWeight - normalizedDistance * (maxWeight - minWeight);
      const width = maxWidth - normalizedDistance * (maxWidth - minWidth);

      setFontSettings({ weight, width });
    };

    const handleScroll = () => {
      if (!animateOnScroll) return;

      const currentScrollPos = window.scrollY;
      const currentTime = Date.now();

      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = Math.abs(currentScrollPos - lastScrollPos.current);
      const speed = scrollDiff / (timeDiff || 1);

      setScrollSpeed(speed);

      const normalizedSpeed = Math.min(speed / 2, 1);
      const weight = minWeight + normalizedSpeed * (maxWeight - minWeight);
      const width = minWidth + normalizedSpeed * (maxWidth - minWidth);

      setFontSettings({ weight, width });

      lastScrollPos.current = currentScrollPos;
      lastScrollTime.current = currentTime;
    };

    if (animateOnHover) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    if (animateOnScroll) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animateOnHover, animateOnScroll, minWeight, maxWeight, minWidth, maxWidth, distanceThreshold]);

  return (
    <div
      ref={textRef}
      className={`transition-all duration-100 ${className}`}
      style={{
        fontFamily: font,
        fontWeight: fontSettings.weight,
        fontStretch: `${fontSettings.width}%`,
      }}
    >
      {text}
    </div>
  );
};

// Interactive Text Block variant
interface InteractiveTextBlockProps {
  text: string;
  font?: string;
  minWeight?: number;
  maxWeight?: number;
  className?: string;
}

export const InteractiveTextBlock: React.FC<InteractiveTextBlockProps> = ({
  text,
  font = '"Inter", system-ui, sans-serif',
  minWeight = 100,
  maxWeight = 900,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  const lines = text.split("\n");

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      style={{ fontFamily: font }}
    >
      {lines.map((line, index) => (
        <LineElement
          key={index}
          line={line}
          mousePos={mousePos}
          minWeight={minWeight}
          maxWeight={maxWeight}
        />
      ))}
    </div>
  );
};

interface LineElementProps {
  line: string;
  mousePos: { x: number; y: number };
  minWeight: number;
  maxWeight: number;
}

const LineElement: React.FC<LineElementProps> = ({
  line,
  mousePos,
  minWeight,
  maxWeight,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [weight, setWeight] = useState(minWeight);

  useEffect(() => {
    if (!lineRef.current) return;

    const rect = lineRef.current.getBoundingClientRect();
    const parentRect = lineRef.current.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    const elemCenterX = rect.left - parentRect.left + rect.width / 2;
    const elemCenterY = rect.top - parentRect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - elemCenterX, 2) + Math.pow(mousePos.y - elemCenterY, 2)
    );

    const normalizedDistance = Math.min(distance / 200, 1);
    const calculatedWeight = maxWeight - normalizedDistance * (maxWeight - minWeight);

    setWeight(calculatedWeight);
  }, [mousePos, minWeight, maxWeight]);

  return (
    <div
      ref={lineRef}
      className="transition-all duration-100"
      style={{
        fontWeight: weight,
      }}
    >
      {line}
    </div>
  );
};

// Word-by-Word variant
interface WordProximityProps {
  text: string;
  font?: string;
  minWeight?: number;
  maxWeight?: number;
  className?: string;
  wordSpacing?: string;
}

export const WordProximity: React.FC<WordProximityProps> = ({
  text,
  font = '"Inter", system-ui, sans-serif',
  minWeight = 100,
  maxWeight = 900,
  className = "",
  wordSpacing = "0.5rem",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap ${className}`}
      onMouseMove={handleMouseMove}
      style={{ fontFamily: font, gap: wordSpacing }}
    >
      {words.map((word, index) => (
        <WordElement
          key={index}
          word={word}
          mousePos={mousePos}
          minWeight={minWeight}
          maxWeight={maxWeight}
        />
      ))}
    </div>
  );
};

interface WordElementProps {
  word: string;
  mousePos: { x: number; y: number };
  minWeight: number;
  maxWeight: number;
}

const WordElement: React.FC<WordElementProps> = ({
  word,
  mousePos,
  minWeight,
  maxWeight,
}) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [weight, setWeight] = useState(minWeight);

  useEffect(() => {
    if (!wordRef.current) return;

    const rect = wordRef.current.getBoundingClientRect();
    const parentRect = wordRef.current.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    const elemCenterX = rect.left - parentRect.left + rect.width / 2;
    const elemCenterY = rect.top - parentRect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - elemCenterX, 2) + Math.pow(mousePos.y - elemCenterY, 2)
    );

    const normalizedDistance = Math.min(distance / 150, 1);
    const calculatedWeight = maxWeight - normalizedDistance * (maxWeight - minWeight);

    setWeight(calculatedWeight);
  }, [mousePos, minWeight, maxWeight]);

  return (
    <span
      ref={wordRef}
      className="transition-all duration-100"
      style={{
        fontWeight: weight,
      }}
    >
      {word}
    </span>
  );
};

// Scroll-Speed variant
interface ScrollSpeedFontProps {
  text: string;
  font?: string;
  minWeight?: number;
  maxWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
}

export const ScrollSpeedFont: React.FC<ScrollSpeedFontProps> = ({
  text,
  font = '"Inter", system-ui, sans-serif',
  minWeight = 100,
  maxWeight = 900,
  minWidth = 75,
  maxWidth = 125,
  className = "",
}) => {
  const [fontSettings, setFontSettings] = useState({
    weight: minWeight,
    width: minWidth,
  });

  const lastScrollPos = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const currentTime = Date.now();

      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = Math.abs(currentScrollPos - lastScrollPos.current);
      const speed = scrollDiff / (timeDiff || 1);

      const normalizedSpeed = Math.min(speed / 2, 1);
      const weight = minWeight + normalizedSpeed * (maxWeight - minWeight);
      const width = minWidth + normalizedSpeed * (maxWidth - minWidth);

      setFontSettings({ weight, width });

      lastScrollPos.current = currentScrollPos;
      lastScrollTime.current = currentTime;

      setTimeout(() => {
        setFontSettings({ weight: minWeight, width: minWidth });
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [minWeight, maxWeight, minWidth, maxWidth]);

  return (
    <div
      className={`transition-all duration-150 ${className}`}
      style={{
        fontFamily: font,
        fontWeight: fontSettings.weight,
        fontStretch: `${fontSettings.width}%`,
      }}
    >
      {text}
    </div>
  );
};
