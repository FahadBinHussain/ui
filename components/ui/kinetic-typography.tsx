"use client";

import React, { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

interface KineticTypographyProps {
  text?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  stiffness?: number;
  anchorStiffness?: number;
  className?: string;
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text = "KINETIC",
  fontSize = 72,
  fontWeight = 700,
  color = "#000000",
  stiffness = 0.4,
  anchorStiffness = 0.02,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const letterBodiesRef = useRef<Matter.Body[]>([]);
  const letterElementsRef = useRef<HTMLSpanElement[]>([]);
  const constraintsRef = useRef<Matter.Constraint[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.5 },
    });
    engineRef.current = engine;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Calculate letter spacing
    const letters = text.split("");
    const letterSpacing = width / (letters.length + 1);
    const startY = height / 2;

    // Create letter bodies
    const bodies: Matter.Body[] = [];
    const elements: HTMLSpanElement[] = [];
    const anchorConstraints: Matter.Constraint[] = [];

    letters.forEach((letter, index) => {
      const x = (index + 1) * letterSpacing;
      const y = startY;

      // Create physics body for letter
      const body = Matter.Bodies.circle(x, y, fontSize / 3, {
        friction: 0.3,
        frictionAir: 0.08,
        restitution: 0.2,
        density: 0.04,
      });

      // Create HTML element for letter
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.position = "absolute";
      span.style.fontSize = `${fontSize}px`;
      span.style.fontWeight = `${fontWeight}`;
      span.style.color = color;
      span.style.userSelect = "none";
      span.style.pointerEvents = "none";
      span.style.transformOrigin = "center center";
      span.style.fontFamily = "system-ui, -apple-system, sans-serif";
      container.appendChild(span);

      bodies.push(body);
      elements.push(span);

      // Create anchor constraint to home position
      const anchor = Matter.Constraint.create({
        bodyA: body,
        pointB: { x, y },
        stiffness: anchorStiffness,
        damping: 0.1,
        length: 0,
      });
      anchorConstraints.push(anchor);
    });

    letterBodiesRef.current = bodies;
    letterElementsRef.current = elements;

    // Create spring constraints between letters
    const springConstraints: Matter.Constraint[] = [];
    for (let i = 0; i < bodies.length - 1; i++) {
      const constraint = Matter.Constraint.create({
        bodyA: bodies[i],
        bodyB: bodies[i + 1],
        stiffness: stiffness,
        damping: 0.15,
        length: letterSpacing * 0.8,
      });
      springConstraints.push(constraint);
    }

    constraintsRef.current = [...springConstraints, ...anchorConstraints];

    // Add bodies and constraints to world
    Matter.World.add(engine.world, [...bodies, ...constraintsRef.current]);

    // Add mouse control
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8,
        render: {
          visible: false,
        },
      },
    });
    mouseConstraintRef.current = mouseConstraint;
    Matter.World.add(engine.world, mouseConstraint);

    // Run engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Animation loop to sync DOM with physics
    const animate = () => {
      bodies.forEach((body, index) => {
        const element = elements[index];
        const { x, y } = body.position;
        const angle = body.angle;

        // Update element position and rotation
        element.style.transform = `translate(${x - fontSize / 2}px, ${y - fontSize / 2}px) rotate(${angle}rad)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      if (mouseConstraintRef.current) {
        Matter.World.remove(engine.world, mouseConstraintRef.current);
      }
      elements.forEach((el) => el.remove());
      letterBodiesRef.current = [];
      letterElementsRef.current = [];
      constraintsRef.current = [];
    };
  }, [text, fontSize, fontWeight, color, stiffness, anchorStiffness]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ minHeight: "200px" }}
    />
  );
};

interface RopeTextProps {
  text?: string;
  fontSize?: number;
  className?: string;
}

export const RopeText: React.FC<RopeTextProps> = ({
  text = "DRAG ME",
  fontSize = 64,
  className = "",
}) => {
  return (
    <KineticTypography
      text={text}
      fontSize={fontSize}
      fontWeight={900}
      color="#ffffff"
      stiffness={0.3}
      anchorStiffness={0.015}
      className={className}
    />
  );
};

interface ElasticHeadlineProps {
  text?: string;
  className?: string;
}

export const ElasticHeadline: React.FC<ElasticHeadlineProps> = ({
  text = "ELASTIC",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const letterBodiesRef = useRef<Matter.Body[]>([]);
  const letterElementsRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 },
    });
    engineRef.current = engine;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const letters = text.split("");
    const letterWidth = 60;
    const totalWidth = letters.length * letterWidth;
    const startX = (width - totalWidth) / 2;

    const bodies: Matter.Body[] = [];
    const elements: HTMLDivElement[] = [];
    const constraints: Matter.Constraint[] = [];

    letters.forEach((letter, index) => {
      const x = startX + index * letterWidth + letterWidth / 2;
      const y = height / 2;

      const body = Matter.Bodies.circle(x, y, letterWidth / 2.5, {
        friction: 0.5,
        frictionAir: 0.1,
        restitution: 0.6,
        density: 0.02,
      });

      const div = document.createElement("div");
      div.textContent = letter;
      div.style.position = "absolute";
      div.style.fontSize = "48px";
      div.style.fontWeight = "900";
      div.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      div.style.webkitBackgroundClip = "text";
      div.style.webkitTextFillColor = "transparent";
      div.style.backgroundClip = "text";
      div.style.userSelect = "none";
      div.style.pointerEvents = "none";
      div.style.transformOrigin = "center center";
      div.style.fontFamily = "system-ui, -apple-system, sans-serif";
      container.appendChild(div);

      bodies.push(body);
      elements.push(div);

      // Elastic rope constraints
      if (index > 0) {
        const rope = Matter.Constraint.create({
          bodyA: bodies[index - 1],
          bodyB: body,
          stiffness: 0.35,
          damping: 0.2,
          length: letterWidth * 0.9,
        });
        constraints.push(rope);
      }

      // Anchor to home
      const anchor = Matter.Constraint.create({
        bodyA: body,
        pointB: { x, y },
        stiffness: 0.01,
        damping: 0.05,
        length: 0,
      });
      constraints.push(anchor);
    });

    letterBodiesRef.current = bodies;
    letterElementsRef.current = elements;

    Matter.World.add(engine.world, [...bodies, ...constraints]);

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,
        render: { visible: false },
      },
    });
    Matter.World.add(engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const animate = () => {
      bodies.forEach((body, index) => {
        const element = elements[index];
        const { x, y } = body.position;
        const angle = body.angle;
        element.style.transform = `translate(${x - 24}px, ${y - 24}px) rotate(${angle}rad)`;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      elements.forEach((el) => el.remove());
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}
      style={{ minHeight: "300px" }}
    />
  );
};

interface ChainReactionTextProps {
  text?: string;
  className?: string;
}

export const ChainReactionText: React.FC<ChainReactionTextProps> = ({
  text = "CHAIN",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.3 },
    });

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const letters = text.split("");
    const spacing = 70;
    const startX = (width - letters.length * spacing) / 2;
    const startY = height / 2;

    const bodies: Matter.Body[] = [];
    const elements: HTMLSpanElement[] = [];
    const constraints: Matter.Constraint[] = [];

    letters.forEach((letter, index) => {
      const x = startX + index * spacing;
      const body = Matter.Bodies.rectangle(x, startY, 50, 60, {
        friction: 0.2,
        frictionAir: 0.05,
        restitution: 0.4,
        density: 0.03,
        chamfer: { radius: 5 },
      });

      const span = document.createElement("span");
      span.textContent = letter;
      span.style.position = "absolute";
      span.style.fontSize = "56px";
      span.style.fontWeight = "800";
      span.style.color = "#10b981";
      span.style.userSelect = "none";
      span.style.pointerEvents = "none";
      span.style.transformOrigin = "center";
      span.style.textShadow = "0 0 20px rgba(16, 185, 129, 0.5)";
      container.appendChild(span);

      bodies.push(body);
      elements.push(span);

      // Chain constraints
      if (index > 0) {
        const chain = Matter.Constraint.create({
          bodyA: bodies[index - 1],
          bodyB: body,
          stiffness: 0.5,
          damping: 0.1,
          length: spacing * 0.7,
        });
        constraints.push(chain);
      }

      // Home anchor
      const anchor = Matter.Constraint.create({
        bodyA: body,
        pointB: { x, y: startY },
        stiffness: 0.008,
        damping: 0.08,
        length: 0,
      });
      constraints.push(anchor);
    });

    Matter.World.add(engine.world, [...bodies, ...constraints]);

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 1, render: { visible: false } },
    });
    Matter.World.add(engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const animate = () => {
      bodies.forEach((body, i) => {
        const { x, y } = body.position;
        const angle = body.angle;
        elements[i].style.transform = `translate(${x - 25}px, ${y - 30}px) rotate(${angle}rad)`;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      elements.forEach((el) => el.remove());
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-slate-900 ${className}`}
      style={{ minHeight: "250px" }}
    />
  );
};

interface StiffRopeProps {
  text?: string;
  className?: string;
}

export const StiffRope: React.FC<StiffRopeProps> = ({
  text = "STIFF",
  className = "",
}) => {
  return (
    <KineticTypography
      text={text}
      fontSize={60}
      fontWeight={800}
      color="#f59e0b"
      stiffness={0.8}
      anchorStiffness={0.03}
      className={className}
    />
  );
};

interface LooseRopeProps {
  text?: string;
  className?: string;
}

export const LooseRope: React.FC<LooseRopeProps> = ({
  text = "LOOSE",
  className = "",
}) => {
  return (
    <KineticTypography
      text={text}
      fontSize={60}
      fontWeight={800}
      color="#ec4899"
      stiffness={0.15}
      anchorStiffness={0.005}
      className={className}
    />
  );
};
