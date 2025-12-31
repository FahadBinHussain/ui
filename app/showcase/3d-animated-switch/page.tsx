"use client";
import React from "react";
import { AnimatedSwitch3D } from "@/components/marketing/AnimatedSwitch3D";

export default function AnimatedSwitch3DPage() {
  return (
    <div className="switch-container" style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      padding: '5rem 1rem',
      color: '#ffffff'
    }}>
      <div className="switch-header" style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 className="switch-title" style={{
          fontSize: '4.5rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }}>
          3D Animated Switch
        </h1>
        <p className="switch-description" style={{
          color: '#a3a3a3',
          maxWidth: '42rem',
          margin: '0 auto',
          fontSize: '1.125rem',
          lineHeight: 1.75
        }}>
          An interactive 3D toggle switch powered by Three.js, React Three Fiber, and React Spring. 
          Click the sphere to toggle between states and watch the smooth animations blend DOM and WebGL.
        </p>
      </div>

      <div className="switch-canvas-wrapper" style={{
        width: '100%',
        height: '600px',
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <AnimatedSwitch3D />
      </div>

      <div className="switch-footer" style={{
        marginTop: '4rem',
        textAlign: 'center'
      }}>
        <p className="switch-footer-text" style={{
          color: '#737373',
          fontSize: '0.875rem',
          marginBottom: '0.5rem'
        }}>
          ✨ Click the sphere to toggle • Synchronized DOM and Canvas animations
        </p>
        <p className="switch-footer-subtext" style={{
          color: '#525252',
          fontSize: '0.75rem'
        }}>
          Built with React Three Fiber • React Spring • Three.js • GLTF Models
        </p>
        <p className="switch-footer-subtext" style={{
          color: '#525252',
          fontSize: '0.75rem',
          marginTop: '1rem'
        }}>
          Source:{" "}
          <a
            href="https://www.react-spring.dev/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="switch-footer-link"
            style={{
              color: '#60a5fa',
              textDecoration: 'underline'
            }}
          >
            React Spring Examples
          </a>
        </p>
      </div>
    </div>
  );
}
