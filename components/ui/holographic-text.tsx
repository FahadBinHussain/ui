'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HolographicTextProps {
  text: string
  className?: string
  fontSize?: number
  depth?: number
  speed?: number
  colors?: string[]
  glowIntensity?: number
  floating?: boolean
  variant?: 'classic' | 'rainbow' | 'cyber' | 'neon'
}

export const HolographicText: React.FC<HolographicTextProps> = ({
  text,
  className = '',
  fontSize = 48,
  depth = 20,
  speed = 1,
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0000', '#0000ff'],
  glowIntensity = 1,
  floating = true,
  variant = 'classic'
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setMousePosition({ x, y })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Generate color stops for holographic effect
  const getColorStops = () => {
    switch (variant) {
      case 'rainbow':
        return ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080']
      case 'cyber':
        return ['#00ffff', '#ff00ff', '#ffff00', '#00ffff']
      case 'neon':
        return ['#ff0080', '#8000ff', '#0080ff', '#00ff80', '#80ff00', '#ff8000']
      default:
        return colors
    }
  }

  const colorStops = getColorStops()
  const layers = depth

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Multiple text layers for depth effect */}
      {Array.from({ length: layers }, (_, i) => {
        const progress = i / (layers - 1)
        const zOffset = (progress - 0.5) * depth * 2
        const opacity = 0.1 + (progress * 0.9)
        const blur = progress * 2

        // Calculate color based on layer and animation
        const colorIndex = Math.floor((Date.now() * speed * 0.001 + progress * colorStops.length) % colorStops.length)
        const color = colorStops[colorIndex]

        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateZ(${zOffset}px)`,
              filter: `blur(${blur}px)`,
              textShadow: `
                0 0 ${glowIntensity * 10}px ${color},
                0 0 ${glowIntensity * 20}px ${color},
                0 0 ${glowIntensity * 30}px ${color}
              `,
            }}
            animate={floating ? {
              y: [0, -5, 0],
              rotateX: [0, 2, 0],
              rotateY: [0, -2, 0],
            } : {}}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          >
            <span
              className="font-bold select-none"
              style={{
                fontSize: `${fontSize}px`,
                color,
                opacity,
                background: `linear-gradient(45deg, ${colorStops.join(', ')})`,
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `holographic-shift ${2 / speed}s linear infinite`,
              }}
            >
              {text}
            </span>
          </motion.div>
        )
      })}

      {/* Main text layer with interactive effects */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          transform: `rotateX(${mousePosition.y * 10 - 5}deg) rotateY(${mousePosition.x * 10 - 5}deg)`,
        }}
        animate={floating ? {
          y: [0, -3, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span
          className="font-bold select-none relative z-10"
          style={{
            fontSize: `${fontSize}px`,
            background: `linear-gradient(45deg, ${colorStops.join(', ')})`,
            backgroundSize: '400% 400%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: `holographic-shift ${1.5 / speed}s ease-in-out infinite`,
            textShadow: `
              0 0 ${glowIntensity * 5}px rgba(0, 255, 255, 0.5),
              0 0 ${glowIntensity * 10}px rgba(255, 0, 255, 0.3),
              0 0 ${glowIntensity * 15}px rgba(255, 255, 0, 0.2)
            `,
          }}
        >
          {text}
        </span>
      </motion.div>

      {/* Holographic interference patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(${45 + i * 30}deg, transparent 30%, ${colorStops[i % colorStops.length]} 50%, transparent 70%)`,
              mixBlendMode: 'screen',
            }}
            animate={{
              x: [-100, 100],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            background: colorStops[i % colorStops.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${glowIntensity * 4}px ${colorStops[i % colorStops.length]}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* CSS Animation for background shift */}
      <style jsx>{`
        @keyframes holographic-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  )
}

export default HolographicText