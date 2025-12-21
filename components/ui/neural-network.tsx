"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  layer: number;
  activation: number;
  connections: number[];
}

interface Connection {
  from: number;
  to: number;
  weight: number;
  active: boolean;
}

interface NeuralNetworkVisualizerProps {
  className?: string;
  nodeCount?: number;
  layers?: number;
  animationSpeed?: number;
  colors?: {
    node: string;
    connection: string;
    active: string;
  };
}

/**
 * Interactive neural network visualizer with animated nodes and connections
 * Shows data flow through the network with pulsing effects
 */
export function NeuralNetworkVisualizer({
  className = "",
  nodeCount = 8,
  layers = 4,
  animationSpeed = 1,
  colors = {
    node: "#3b82f6",
    connection: "#64748b",
    active: "#10b981",
  }
}: NeuralNetworkVisualizerProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activePath, setActivePath] = useState<number[]>([]);

  // Initialize network
  useEffect(() => {
    const newNodes: Node[] = [];
    const newConnections: Connection[] = [];

    // Create nodes for each layer
    for (let layer = 0; layer < layers; layer++) {
      const nodesInLayer = layer === 0 || layer === layers - 1 ? nodeCount : Math.max(3, nodeCount - layer);
      const layerX = (layer / (layers - 1)) * 100;

      for (let i = 0; i < nodesInLayer; i++) {
        const layerY = (i / (nodesInLayer - 1)) * 100;
        newNodes.push({
          id: newNodes.length,
          x: layerX,
          y: layerY,
          layer,
          activation: Math.random(),
          connections: [],
        });
      }
    }

    // Create connections between layers
    for (let layer = 0; layer < layers - 1; layer++) {
      const currentLayerNodes = newNodes.filter(n => n.layer === layer);
      const nextLayerNodes = newNodes.filter(n => n.layer === layer + 1);

      currentLayerNodes.forEach(fromNode => {
        nextLayerNodes.forEach(toNode => {
          if (Math.random() > 0.3) { // 70% connection probability
            newConnections.push({
              from: fromNode.id,
              to: toNode.id,
              weight: Math.random() * 2 - 1, // -1 to 1
              active: false,
            });
            fromNode.connections.push(toNode.id);
          }
        });
      });
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, [nodeCount, layers]);

  // Animate network activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly activate connections
      setConnections(prev =>
        prev.map(conn => ({
          ...conn,
          active: Math.random() > 0.8,
        }))
      );

      // Update node activations
      setNodes(prev =>
        prev.map(node => ({
          ...node,
          activation: Math.max(0, Math.min(1, node.activation + (Math.random() - 0.5) * 0.2)),
        }))
      );

      // Create active path
      if (Math.random() > 0.7) {
        const path: number[] = [];
        let currentNode = nodes.find(n => n.layer === 0);
        if (currentNode) {
          path.push(currentNode.id);
          for (let layer = 1; layer < layers; layer++) {
            const nextNodes = nodes.filter(n => n.layer === layer && currentNode!.connections.includes(n.id));
            if (nextNodes.length > 0) {
              currentNode = nextNodes[Math.floor(Math.random() * nextNodes.length)];
              path.push(currentNode.id);
            }
          }
          setActivePath(path);
          setTimeout(() => setActivePath([]), 2000);
        }
      }
    }, 1000 / animationSpeed);

    return () => clearInterval(interval);
  }, [nodes, layers, animationSpeed]);

  return (
    <div className={`w-full h-full ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;

          const isActive = conn.active || activePath.includes(conn.from) || activePath.includes(conn.to);

          return (
            <motion.line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={isActive ? colors.active : colors.connection}
              strokeWidth={isActive ? "2" : "1"}
              opacity={isActive ? 0.8 : 0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: i * 0.01 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.layer === 0 ? "3" : node.layer === layers - 1 ? "3" : "2"}
            fill={activePath.includes(node.id) ? colors.active : colors.node}
            opacity={node.activation * 0.8 + 0.2}
            initial={{ scale: 0 }}
            animate={{
              scale: activePath.includes(node.id) ? 1.5 : 1,
              opacity: node.activation * 0.8 + 0.2,
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.05,
            }}
          />
        ))}

        {/* Data flow particles */}
        {activePath.length > 1 && activePath.map((nodeId, pathIndex) => {
          if (pathIndex === activePath.length - 1) return null;

          const fromNode = nodes[nodeId];
          const toNode = nodes[activePath[pathIndex + 1]];
          if (!fromNode || !toNode) return null;

          return (
            <motion.circle
              key={`particle-${nodeId}-${pathIndex}`}
              r="1"
              fill={colors.active}
              initial={{
                cx: `${fromNode.x}%`,
                cy: `${fromNode.y}%`,
              }}
              animate={{
                cx: `${toNode.x}%`,
                cy: `${toNode.y}%`,
              }}
              transition={{
                duration: 1,
                delay: pathIndex * 0.2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

interface BrainVisualizerProps {
  className?: string;
  complexity?: "simple" | "medium" | "complex";
}

/**
 * 3D-style brain visualization with layered networks
 */
export function BrainVisualizer({
  className = "",
  complexity = "medium"
}: BrainVisualizerProps) {
  const complexitySettings = {
    simple: { layers: 3, nodes: 6 },
    medium: { layers: 4, nodes: 8 },
    complex: { layers: 5, nodes: 10 },
  };

  const settings = complexitySettings[complexity];

  return (
    <div className={`relative ${className}`}>
      {/* Multiple network layers for depth */}
      <div className="absolute inset-0">
        <NeuralNetworkVisualizer
          layers={settings.layers}
          nodeCount={settings.nodes}
          animationSpeed={0.5}
          colors={{
            node: "#8b5cf6",
            connection: "#a78bfa",
            active: "#10b981",
          }}
        />
      </div>

      {/* Overlay with different opacity for depth */}
      <div className="absolute inset-0 opacity-60">
        <NeuralNetworkVisualizer
          layers={settings.layers}
          nodeCount={settings.nodes}
          animationSpeed={0.3}
          colors={{
            node: "#06b6d4",
            connection: "#67e8f9",
            active: "#f59e0b",
          }}
        />
      </div>

      {/* Active layer */}
      <div className="absolute inset-0 opacity-80">
        <NeuralNetworkVisualizer
          layers={settings.layers}
          nodeCount={settings.nodes}
          animationSpeed={1}
          colors={{
            node: "#3b82f6",
            connection: "#64748b",
            active: "#ef4444",
          }}
        />
      </div>
    </div>
  );
}

interface SynapsePulseProps {
  className?: string;
  pulseCount?: number;
  colors?: string[];
}

/**
 * Pulsing synapse effects showing neural communication
 */
export function SynapsePulse({
  className = "",
  pulseCount = 5,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]
}: SynapsePulseProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {Array.from({ length: pulseCount }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              borderColor: colors[i % colors.length],
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [1, 0.5, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Central node */}
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}