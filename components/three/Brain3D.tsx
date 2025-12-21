"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BrainNode {
  position: THREE.Vector3;
  connections: number[];
  activation: number;
  layer: number;
}

interface NeuralConnection {
  start: THREE.Vector3;
  end: THREE.Vector3;
  active: boolean;
  strength: number;
}

interface Brain3DProps {
  nodeCount?: number;
  layers?: number;
  complexity?: "simple" | "medium" | "complex";
}

/**
 * 3D Brain visualization with neural network structure
 * Shows interconnected nodes with animated connections and activity
 */
export function Brain3D({
  nodeCount = 8,
  layers = 4,
  complexity = "medium"
}: Brain3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);

  // Adjust parameters based on complexity
  const complexitySettings = {
    simple: { nodeCount: 6, layers: 3, connectionDensity: 0.4 },
    medium: { nodeCount: 8, layers: 4, connectionDensity: 0.3 },
    complex: { nodeCount: 10, layers: 5, connectionDensity: 0.2 },
  };

  const settings = complexitySettings[complexity];
  const actualNodeCount = settings.nodeCount;
  const actualLayers = settings.layers;

  // Generate brain structure
  const { nodes, connections } = useMemo(() => {
    const brainNodes: BrainNode[] = [];
    const brainConnections: NeuralConnection[] = [];

    // Create nodes in a brain-like structure
    for (let layer = 0; layer < actualLayers; layer++) {
      const nodesInLayer = layer === 0 || layer === actualLayers - 1 ? actualNodeCount : Math.max(3, actualNodeCount - layer);
      const layerZ = (layer / (actualLayers - 1)) * 4 - 2; // Spread from -2 to 2

      for (let i = 0; i < nodesInLayer; i++) {
        // Create brain-like positioning with some randomness
        const angle = (i / nodesInLayer) * Math.PI * 2;
        const radius = 1.5 + Math.sin(layer * Math.PI / actualLayers) * 0.5;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;

        brainNodes.push({
          position: new THREE.Vector3(x, y, layerZ),
          connections: [],
          activation: Math.random(),
          layer,
        });
      }
    }

    // Create connections between layers
    for (let layer = 0; layer < actualLayers - 1; layer++) {
      const currentLayerNodes = brainNodes.filter(n => n.layer === layer);
      const nextLayerNodes = brainNodes.filter(n => n.layer === layer + 1);

      currentLayerNodes.forEach((fromNode, fromIndex) => {
        nextLayerNodes.forEach((toNode, toIndex) => {
          // Create connections with some probability and distance-based weighting
          const distance = fromNode.position.distanceTo(toNode.position);
          const connectionProb = Math.max(0.1, 1 - distance / 3) * (1 - settings.connectionDensity);

          if (Math.random() > connectionProb) {
            brainConnections.push({
              start: fromNode.position.clone(),
              end: toNode.position.clone(),
              active: false,
              strength: Math.random() * 0.8 + 0.2,
            });
            fromNode.connections.push(brainNodes.indexOf(toNode));
          }
        });
      });
    }

    return { nodes: brainNodes, connections: brainConnections };
  }, [actualNodeCount, actualLayers, settings.connectionDensity]);

  // Create connection geometry
  const connectionGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    connections.forEach((conn) => {
      positions.push(conn.start.x, conn.start.y, conn.start.z);
      positions.push(conn.end.x, conn.end.y, conn.end.z);

      // Default colors (inactive)
      colors.push(0.3, 0.3, 0.3, 0.3, 0.3, 0.3);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return geometry;
  }, [connections]);

  // Create node geometry
  const nodeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(0.05, 8, 8);
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!connectionsRef.current || !nodesRef.current) return;

    const time = state.clock.elapsedTime;

    // Update node activations and scales
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    nodes.forEach((node, i) => {
      // Update activation with some randomness
      node.activation = Math.max(0, Math.min(1, node.activation + (Math.random() - 0.5) * 0.02));

      // Set node transform
      const scale = 0.8 + node.activation * 0.4;
      matrix.makeScale(scale, scale, scale);
      matrix.setPosition(node.position);
      nodesRef.current!.setMatrixAt(i, matrix);

      // Set node color based on activation
      color.setHSL(0.6 - node.activation * 0.3, 0.8, 0.4 + node.activation * 0.4);
      nodesRef.current!.setColorAt(i, color);
    });

    nodesRef.current.instanceMatrix.needsUpdate = true;
    if (nodesRef.current.instanceColor) {
      nodesRef.current.instanceColor.needsUpdate = true;
    }

    // Update connections
    const colors = connectionsRef.current.geometry.attributes.color;
    connections.forEach((conn, i) => {
      // Randomly activate connections
      if (Math.random() > 0.95) {
        conn.active = !conn.active;
      }

      const colorIndex = i * 6; // 2 vertices per connection, 3 components per color
      if (conn.active) {
        // Active connection - bright color
        const hue = 0.1 + Math.sin(time * 2 + i) * 0.1;
        const sat = 0.9;
        const light = 0.6 + Math.sin(time * 3 + i) * 0.2;

        color.setHSL(hue, sat, light);
        colors.setXYZ(colorIndex, color.r, color.g, color.b);
        colors.setXYZ(colorIndex + 3, color.r, color.g, color.b);
      } else {
        // Inactive connection - dim color
        colors.setXYZ(colorIndex, 0.2, 0.2, 0.2);
        colors.setXYZ(colorIndex + 3, 0.2, 0.2, 0.2);
      }
    });

    colors.needsUpdate = true;

    // Rotate the entire brain slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural connections */}
      <lineSegments ref={connectionsRef} geometry={connectionGeometry}>
        <lineBasicMaterial vertexColors />
      </lineSegments>

      {/* Neural nodes */}
      <instancedMesh
        ref={nodesRef}
        args={[nodeGeometry, undefined, nodes.length]}
        frustumCulled={false}
      >
        <meshBasicMaterial />
      </instancedMesh>
    </group>
  );
}