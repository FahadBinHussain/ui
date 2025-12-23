"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  color?: string;
  content?: React.ReactNode;
}

interface StickyStackingCardsProps {
  cards: Card[];
  className?: string;
  cardHeight?: number;
  gap?: number;
}

export const StickyStackingCards: React.FC<StickyStackingCardsProps> = ({
  cards,
  className = "",
  cardHeight = 500,
  gap = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Kill any existing triggers created by this instance only
    if (triggersRef.current.length) {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    }

    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    cardElements.forEach((card, index) => {
      const isLast = index === cardElements.length - 1;

      const pinTrigger = ScrollTrigger.create({
        trigger: card,
        start: `top ${gap * index}px`,
        end: isLast ? "bottom bottom" : `bottom ${gap * index}px`,
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      triggersRef.current.push(pinTrigger);

      // Scale down previous cards
      if (index > 0) {
        const tween = gsap.to(card, {
          scale: 1 - index * 0.05,
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        if (tween.scrollTrigger) {
          triggersRef.current.push(tween.scrollTrigger as ScrollTrigger);
        }
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, [cards.length, gap]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="sticky w-full"
          style={{
            top: `${gap * index}px`,
            height: `${cardHeight}px`,
            zIndex: cards.length - index,
          }}
        >
          <div
            className={`w-full h-full rounded-3xl overflow-hidden shadow-2xl ${
              card.color || "bg-slate-900"
            }`}
            style={{
              background: card.image
                ? `url(${card.image}) center/cover`
                : card.color,
            }}
          >
            <div className="w-full h-full p-12 flex flex-col justify-center bg-gradient-to-br from-black/50 to-transparent">
              {card.content || (
                <>
                  <h3 className="text-5xl font-bold text-white mb-6">
                    {card.title}
                  </h3>
                  <p className="text-xl text-slate-200 max-w-2xl">
                    {card.description}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface FeatureStackProps {
  className?: string;
}

export const FeatureStack: React.FC<FeatureStackProps> = ({ className = "" }) => {
  const features = [
    {
      id: 1,
      title: "Lightning Fast",
      description: "Optimized performance with millisecond response times and edge caching.",
      color: "bg-gradient-to-br from-cyan-600 to-blue-600",
    },
    {
      id: 2,
      title: "Secure by Default",
      description: "Enterprise-grade security with end-to-end encryption and compliance certifications.",
      color: "bg-gradient-to-br from-purple-600 to-pink-600",
    },
    {
      id: 3,
      title: "Globally Distributed",
      description: "Deploy to 200+ edge locations worldwide for ultra-low latency everywhere.",
      color: "bg-gradient-to-br from-green-600 to-teal-600",
    },
    {
      id: 4,
      title: "Developer First",
      description: "Intuitive APIs, comprehensive docs, and tools that developers actually love to use.",
      color: "bg-gradient-to-br from-orange-600 to-red-600",
    },
  ];

  return <StickyStackingCards cards={features} className={className} />;
};

interface PortfolioStackProps {
  className?: string;
}

export const PortfolioStack: React.FC<PortfolioStackProps> = ({ className = "" }) => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with real-time inventory and personalized recommendations.",
      image: "https://picsum.photos/id/1015/1200/800",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Unified analytics across all platforms with AI-powered insights and automation.",
      image: "https://picsum.photos/id/1018/1200/800",
    },
    {
      id: 3,
      title: "Fitness Tracking App",
      description: "Comprehensive health metrics with workout planning and nutrition tracking.",
      image: "https://picsum.photos/id/1025/1200/800",
    },
    {
      id: 4,
      title: "Video Streaming Service",
      description: "High-quality streaming with adaptive bitrate and offline viewing support.",
      image: "https://picsum.photos/id/1041/1200/800",
    },
  ];

  return <StickyStackingCards cards={projects} className={className} cardHeight={600} />;
};

interface TimelineStackProps {
  className?: string;
}

export const TimelineStack: React.FC<TimelineStackProps> = ({ className = "" }) => {
  const timeline = [
    {
      id: 1,
      title: "2024 - The Future",
      description: "AI-powered features and quantum computing integration on the horizon.",
      color: "bg-gradient-to-br from-purple-900 to-indigo-900",
    },
    {
      id: 2,
      title: "2023 - Global Expansion",
      description: "Launched in 150+ countries with localization for 40 languages.",
      color: "bg-gradient-to-br from-blue-900 to-cyan-900",
    },
    {
      id: 3,
      title: "2022 - Series B",
      description: "Raised $50M to scale infrastructure and expand the engineering team.",
      color: "bg-gradient-to-br from-teal-900 to-green-900",
    },
    {
      id: 4,
      title: "2021 - Launch",
      description: "Released MVP to first 1,000 beta users with overwhelmingly positive feedback.",
      color: "bg-gradient-to-br from-orange-900 to-red-900",
    },
  ];

  return <StickyStackingCards cards={timeline} className={className} cardHeight={450} gap={30} />;
};
