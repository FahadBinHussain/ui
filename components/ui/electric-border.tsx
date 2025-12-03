"use client";
import React from "react";

interface ElectricBorderProps {
  children?: React.ReactNode;
  title?: string;
  titleVisible?: boolean;
  titleColor?: string;
  description?: string;
  descriptionVisible?: boolean;
  descriptionColor?: string;
  label?: string;
  labelVisible?: boolean;
  labelColor?: string;
  borderColor?: string;
  glowColor?: string;
  backgroundColor?: string;
  gradientColor?: string;
  shadowColor?: string;
  borderRadius?: number;
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  title = "Electric Border",
  titleVisible = true,
  titleColor = "#ffffff",
  description = "In case you'd like to emphasize something very dramatically.",
  descriptionVisible = true,
  descriptionColor = "#ffffff80",
  label = "Dramatic",
  labelVisible = false,
  labelColor = "#ffffff80",
  borderColor = "#dd8448",
  glowColor = "#dd8448",
  backgroundColor = "#252525",
  gradientColor = "#dd8448",
  shadowColor = "rgba(0,0,0,0.5)",
  borderRadius = 24,
  className = "",
  width = "350px",
  height = "500px",
}) => {
  return (
    <main
      className={`main-container ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: height,
        width: "100%",
        minWidth: "350px",
        minHeight: "500px",
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
      }}
    >
      {/* SVG Filters */}
      <svg className="svg-container" style={{ position: "absolute" }}>
        <defs>
          <filter
            id="turbulent-displace"
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise1"
              seed={1}
            />
            <feOffset in="noise1" dx={0} dy={0} result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700;0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise2"
              seed={1}
            />
            <feOffset in="noise2" dx={0} dy={0} result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0;-700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise1"
              seed={2}
            />
            <feOffset in="noise1" dx={0} dy={0} result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490;0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise2"
              seed={2}
            />
            <feOffset in="noise2" dx={0} dy={0} result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0;-490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feComposite
              in="offsetNoise1"
              in2="offsetNoise2"
              result="part1"
            />
            <feComposite
              in="offsetNoise3"
              in2="offsetNoise4"
              result="part2"
            />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      {/* Card Container */}
      <div
        className="card-container"
        style={{
          padding: "2px",
          borderRadius: borderRadius,
          position: "relative",
          background: `linear-gradient(-30deg, ${gradientColor}, transparent, ${gradientColor}), linear-gradient(to bottom, ${backgroundColor}, ${backgroundColor})`,
          boxShadow: `0 20px 40px ${shadowColor}`,
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="inner-container"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {/* Border Outer */}
          <div
            className="border-outer"
            style={{
              border: `2px solid ${borderColor}80`,
              borderRadius: borderRadius,
              paddingRight: "4px",
              paddingBottom: "4px",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              className="main-card"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: borderRadius,
                border: `2px solid ${borderColor}`,
                marginTop: "-4px",
                marginLeft: "-4px",
                filter: "url(#turbulent-displace)",
              }}
            />
          </div>

          {/* Glow Layers */}
          <div
            className="glow-layer-1"
            style={{
              border: `2px solid ${borderColor}99`,
              borderRadius: borderRadius,
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              filter: "blur(5px)",
            }}
          />
          <div
            className="glow-layer-2"
            style={{
              border: `2px solid ${glowColor}`,
              borderRadius: borderRadius,
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              filter: "blur(4px)",
            }}
          />
        </div>

        {/* Overlay Effects */}
        <div
          className="overlay-1"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            borderRadius: borderRadius,
            opacity: 1,
            mixBlendMode: "overlay",
            transform: "scale(1.1)",
            filter: "blur(16px)",
            background: "linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)",
          }}
        />
        <div
          className="overlay-2"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            borderRadius: borderRadius,
            opacity: 0.5,
            mixBlendMode: "overlay",
            transform: "scale(1.1)",
            filter: "blur(16px)",
            background: "linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)",
          }}
        />
        <div
          className="background-glow"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            borderRadius: borderRadius,
            filter: "blur(32px)",
            transform: "scale(1.1)",
            opacity: 0.3,
            zIndex: -1,
            background: `linear-gradient(-30deg, ${glowColor}, transparent, ${borderColor})`,
          }}
        />

        {/* Content Container */}
        <div
          className="content-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          {labelVisible && (
            <div
              className="scrollbar-glass"
              style={{
                background:
                  "radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.04)",
                borderRadius: "14px",
                padding: "8px 16px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "14px",
                color: labelColor,
              }}
            >
              {label}
            </div>
          )}
          {titleVisible && (
            <p
              className="title"
              style={{
                fontSize: "48px",
                lineHeight: 1.2,
                fontWeight: 500,
                color: titleColor,
                marginTop: labelVisible ? "16px" : "0",
              }}
            >
              {title}
            </p>
          )}
          {descriptionVisible && (
            <p
              className="description"
              style={{
                marginTop: "16px",
                fontSize: "16px",
                lineHeight: 1.4,
                fontWeight: 400,
                color: descriptionColor,
              }}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </main>
  );
};
