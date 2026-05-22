"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose?: () => void;
}

interface PerspectiveToastProps extends ToastProps {
  onRemove: (id: string) => void;
  index: number;
}

function PerspectiveToast({
  id,
  title,
  description,
  type = "info",
  duration = 5000,
  onClose,
  onRemove,
  index,
}: PerspectiveToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Type-specific colors
  const typeStyles = {
    info: {
      bg: "from-blue-500 to-cyan-500",
      icon: Info,
      color: "#3b82f6",
    },
    success: {
      bg: "from-green-500 to-emerald-500",
      icon: CheckCircle2,
      color: "#10b981",
    },
    warning: {
      bg: "from-yellow-500 to-orange-500",
      icon: AlertTriangle,
      color: "#f59e0b",
    },
    error: {
      bg: "from-red-500 to-rose-500",
      icon: AlertCircle,
      color: "#ef4444",
    },
  };

  const style = typeStyles[type];
  const Icon = style.icon;

  // Entry animation
  useEffect(() => {
    if (!toastRef.current) return;

    // Initial state: rotated flat
    gsap.set(toastRef.current, {
      rotateX: 90,
      opacity: 0,
      y: -50,
      scale: 0.8,
    });

    // Entry animation with spring swing
    const timeline = gsap.timeline();

    timeline.to(toastRef.current, {
      rotateX: 0,
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.5)",
    });

    // Swing effect - damped oscillation
    timeline.to(
      toastRef.current,
      {
        rotateX: -5,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );

    timeline.to(toastRef.current, {
      rotateX: 3,
      duration: 0.25,
      ease: "power2.inOut",
    });

    timeline.to(toastRef.current, {
      rotateX: -1,
      duration: 0.2,
      ease: "power2.inOut",
    });

    timeline.to(toastRef.current, {
      rotateX: 0,
      duration: 0.15,
      ease: "power2.out",
    });

    // Auto-dismiss after duration
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apply 3D rotation based on mouse position
  useEffect(() => {
    if (!toastRef.current) return;

    // Map mouse position to rotation (-15deg to +15deg)
    const rotateY = (mousePos.x - 0.5) * 30; // Horizontal tilt
    const rotateX = -(mousePos.y - 0.5) * 30; // Vertical tilt (inverted)

    gsap.to(toastRef.current, {
      rotateY,
      rotateX,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [mousePos]);

  const handleClose = () => {
    if (!toastRef.current) return;

    // Exit animation
    gsap.to(toastRef.current, {
      rotateX: -90,
      opacity: 0,
      scale: 0.8,
      y: -30,
      duration: 0.4,
      ease: "back.in(1.5)",
      onComplete: () => {
        onClose?.();
        onRemove(id);
      },
    });
  };

  // Calculate sheen position (opposite to rotation)
  const sheenX = 50 - (mousePos.x - 0.5) * 100;
  const sheenY = 50 - (mousePos.y - 0.5) * 100;

  return (
    <div
      ref={toastRef}
      className="relative w-96 pointer-events-auto"
      style={{
        transformStyle: "preserve-3d",
        marginBottom: "1rem",
      }}
    >
      {/* Main toast card */}
      <div
        className={`relative overflow-hidden rounded-xl shadow-2xl backdrop-blur-sm border border-white/20`}
        style={{
          background: `linear-gradient(135deg, ${style.color}dd, ${style.color}aa)`,
          boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${style.color}40`,
        }}
      >
        {/* Glossy sheen overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-4 flex items-start gap-3">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-base mb-1">
              {title}
            </h3>
            {description && (
              <p className="text-white/80 text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Progress bar (if duration is set) */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-white/50"
              style={{
                animation: `shrink ${duration}ms linear`,
              }}
            />
          </div>
        )}
      </div>

      {/* 3D shadow plane */}
      <div
        className="absolute inset-0 -z-10 rounded-xl opacity-30"
        style={{
          background: "black",
          transform: "translateZ(-20px)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}

export function PerspectiveToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Add toast function
  const addToast = (toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  // Remove toast function
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Expose toast function globally
  useEffect(() => {
    (window as any).toast = addToast;
    return () => {
      delete (window as any).toast;
    };
  }, []);

  return (
    <>
      {children}

      {/* Toast container */}
      <div
        className="fixed top-8 right-8 z-[9999] pointer-events-none"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center center",
        }}
      >
        {toasts.map((toast, index) => (
          <PerspectiveToast
            key={toast.id}
            {...toast}
            index={index}
            onRemove={removeToast}
          />
        ))}
      </div>

      {/* Progress bar animation */}
      <style jsx global>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </>
  );
}

// Utility function to show toasts (can be used anywhere in the app)
export const toast = {
  info: (title: string, description?: string) => {
    if (typeof window !== "undefined" && (window as any).toast) {
      (window as any).toast({ title, description, type: "info" });
    }
  },
  success: (title: string, description?: string) => {
    if (typeof window !== "undefined" && (window as any).toast) {
      (window as any).toast({ title, description, type: "success" });
    }
  },
  warning: (title: string, description?: string) => {
    if (typeof window !== "undefined" && (window as any).toast) {
      (window as any).toast({ title, description, type: "warning" });
    }
  },
  error: (title: string, description?: string) => {
    if (typeof window !== "undefined" && (window as any).toast) {
      (window as any).toast({ title, description, type: "error" });
    }
  },
};
