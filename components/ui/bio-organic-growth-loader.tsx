"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface Point {
  x: number
  y: number
}

interface BioOrganicGrowthLoaderProps {
  className?: string
  size?: number
  growthSpeed?: number
  maxIterations?: number
  colors?: string[]
}

export const BioOrganicGrowthLoader: React.FC<BioOrganicGrowthLoaderProps> = ({
  className = '',
  size = 200,
  growthSpeed = 0.02,
  maxIterations = 100,
  colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b']
}) => {
  const [pathData, setPathData] = useState<string>('')
  const [isGrowing, setIsGrowing] = useState(true)
  const pointsRef = useRef<Point[]>([])
  const iterationRef = useRef(0)

  // Initialize with a simple shape
  useEffect(() => {
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.1

    // Start with a small circle
    const initialPoints: Point[] = []
    const numPoints = 8
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      initialPoints.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      })
    }

    pointsRef.current = initialPoints
    updatePath(initialPoints)
  }, [size])

  // Differential growth algorithm
  useEffect(() => {
    if (!isGrowing) return

    const grow = () => {
      if (iterationRef.current >= maxIterations) {
        setIsGrowing(false)
        return
      }

      const points = pointsRef.current
      const newPoints: Point[] = []

      // Add new points between existing ones for growth
      for (let i = 0; i < points.length; i++) {
        const current = points[i]
        const next = points[(i + 1) % points.length]

        newPoints.push(current)

        // Add a new point between current and next
        const midX = (current.x + next.x) / 2
        const midY = (current.y + next.y) / 2

        // Calculate normal vector for outward growth
        const dx = next.x - current.x
        const dy = next.y - current.y
        const length = Math.sqrt(dx * dx + dy * dy)
        const nx = -dy / length
        const ny = dx / length

        // Add some randomness and growth
        const growthAmount = growthSpeed * size * (0.5 + Math.random() * 0.5)
        const newPoint: Point = {
          x: midX + nx * growthAmount,
          y: midY + ny * growthAmount
        }

        newPoints.push(newPoint)
      }

      // Limit points to prevent performance issues
      if (newPoints.length > 200) {
        // Subsample points
        const subsampled: Point[] = []
        for (let i = 0; i < newPoints.length; i += 2) {
          subsampled.push(newPoints[i])
        }
        pointsRef.current = subsampled
      } else {
        pointsRef.current = newPoints
      }

      updatePath(pointsRef.current)
      iterationRef.current++
    }

    const interval = setInterval(grow, 100)
    return () => clearInterval(interval)
  }, [isGrowing, growthSpeed, size, maxIterations])

  const updatePath = (points: Point[]) => {
    if (points.length < 3) return

    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`
    }
    path += ' Z'
    setPathData(path)
  }

  const resetGrowth = () => {
    iterationRef.current = 0
    setIsGrowing(true)
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.1

    const initialPoints: Point[] = []
    const numPoints = 8
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      initialPoints.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      })
    }

    pointsRef.current = initialPoints
    updatePath(initialPoints)
  }

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>

        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#growthGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
        />

        {/* Animated dots at growth points */}
        {pointsRef.current.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill={colors[index % colors.length]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.01, duration: 0.3 }}
          />
        ))}
      </motion.svg>

      <button
        onClick={resetGrowth}
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-700 text-white text-xs rounded hover:bg-slate-600 transition-colors"
      >
        Reset
      </button>
    </div>
  )
}