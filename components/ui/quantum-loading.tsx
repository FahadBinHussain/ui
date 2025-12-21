'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Electron {
  id: number
  orbit: number
  angle: number
  speed: number
  size: number
  color: string
}

interface QuantumLoadingProps {
  className?: string
  size?: number
  progress?: number
  showProgress?: boolean
  variant?: 'orbital' | 'probability' | 'wave'
  electronCount?: number
  colors?: string[]
}

export const QuantumLoading: React.FC<QuantumLoadingProps> = ({
  className = '',
  size = 200,
  progress = 0,
  showProgress = true,
  variant = 'orbital',
  electronCount = 6,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [electrons, setElectrons] = useState<Electron[]>([])
  const animationRef = useRef<number | null>(null)

  // Initialize electrons
  useEffect(() => {
    const newElectrons: Electron[] = []
    const orbits = [1, 2, 3] // Energy levels

    for (let i = 0; i < electronCount; i++) {
      const orbit = orbits[Math.floor(i / 2) % orbits.length]
      newElectrons.push({
        id: i,
        orbit,
        angle: (i * 360) / electronCount,
        speed: 0.5 + Math.random() * 0.5, // Vary speed slightly
        size: 3 + Math.random() * 2,
        color: colors[i % colors.length]
      })
    }

    setElectrons(newElectrons)
  }, [electronCount, colors])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setElectrons(prevElectrons =>
        prevElectrons.map(electron => ({
          ...electron,
          angle: (electron.angle + electron.speed) % 360
        }))
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const drawOrbital = (ctx: CanvasRenderingContext2D) => {
    const centerX = size / 2
    const centerY = size / 2

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw nucleus
    const nucleusGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 15
    )
    nucleusGradient.addColorStop(0, '#fbbf24')
    nucleusGradient.addColorStop(0.7, '#f59e0b')
    nucleusGradient.addColorStop(1, '#d97706')

    ctx.fillStyle = nucleusGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2)
    ctx.fill()

    // Draw nucleus glow
    const glowGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 25
    )
    glowGradient.addColorStop(0, 'rgba(251, 191, 36, 0.3)')
    glowGradient.addColorStop(1, 'rgba(251, 191, 36, 0)')

    ctx.fillStyle = glowGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2)
    ctx.fill()

    // Draw orbital paths
    const orbits = [40, 65, 90]
    orbits.forEach((radius, index) => {
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - index * 0.05})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw orbital probability cloud (for probability variant)
      if (variant === 'probability') {
        const cloudGradient = ctx.createRadialGradient(
          centerX, centerY, radius - 10,
          centerX, centerY, radius + 10
        )
        cloudGradient.addColorStop(0, 'rgba(59, 130, 246, 0)')
        cloudGradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.1 - index * 0.02})`)
        cloudGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

        ctx.fillStyle = cloudGradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Draw electrons
    electrons.forEach(electron => {
      const radius = orbits[electron.orbit - 1]
      const angleRad = (electron.angle * Math.PI) / 180
      const x = centerX + Math.cos(angleRad) * radius
      const y = centerY + Math.sin(angleRad) * radius

      // Electron glow
      const electronGlow = ctx.createRadialGradient(
        x, y, 0,
        x, y, electron.size * 3
      )
      electronGlow.addColorStop(0, electron.color)
      electronGlow.addColorStop(1, 'rgba(59, 130, 246, 0)')

      ctx.fillStyle = electronGlow
      ctx.beginPath()
      ctx.arc(x, y, electron.size * 3, 0, Math.PI * 2)
      ctx.fill()

      // Electron core
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(x, y, electron.size, 0, Math.PI * 2)
      ctx.fill()

      // Electron trail (for wave variant)
      if (variant === 'wave') {
        ctx.strokeStyle = electron.color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        for (let i = 0; i < 20; i++) {
          const trailAngle = angleRad - (i * 0.1)
          const trailX = centerX + Math.cos(trailAngle) * radius
          const trailY = centerY + Math.sin(trailAngle) * radius
          if (i === 0) ctx.moveTo(trailX, trailY)
          else ctx.lineTo(trailX, trailY)
        }
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    })

    // Draw progress arc
    if (showProgress && progress > 0) {
      const progressAngle = (progress / 100) * Math.PI * 2
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, 110, -Math.PI / 2, -Math.PI / 2 + progressAngle)
      ctx.stroke()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawOrbital(ctx)
  }, [electrons, size, progress, showProgress, variant])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      {/* Progress text */}
      {showProgress && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-gray-400">
              {variant === 'orbital' && 'Calculating orbitals...'}
              {variant === 'probability' && 'Computing probabilities...'}
              {variant === 'wave' && 'Processing wave functions...'}
            </div>
          </div>
        </div>
      )}

      {/* Floating quantum particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
            animate={{
              x: [0, Math.random() * size, Math.random() * size],
              y: [0, Math.random() * size, Math.random() * size],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default QuantumLoading