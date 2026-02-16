"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RubikCore() {
  const group = useRef<THREE.Group>(null);
  const [solving, setSolving] = useState(false);

  useFrame((_, delta) => {
    if (!group.current) return;

    // idle floating
    group.current.position.y = Math.sin(Date.now() * 0.001) * 0.15;

    // solving animation
    if (solving) {
      group.current.rotation.x += delta * 3;
      group.current.rotation.y += delta * 3.5;
    } else {
      group.current.rotation.y += delta * 0.5;
    }
  });

  const cubeMaterials = [
    new THREE.MeshStandardMaterial({ color: "#ff3b30" }),
    new THREE.MeshStandardMaterial({ color: "#34c759" }),
    new THREE.MeshStandardMaterial({ color: "#ffcc00" }),
    new THREE.MeshStandardMaterial({ color: "#ff9500" }),
    new THREE.MeshStandardMaterial({ color: "#007aff" }),
    new THREE.MeshStandardMaterial({ color: "#af52de" }),
  ];

  return (
    <group
      ref={group}
      onPointerEnter={() => setSolving(true)}
      onPointerLeave={() => setSolving(false)}
    >
      {[...Array(3)].map((_, x) =>
        [...Array(3)].map((_, y) =>
          [...Array(3)].map((_, z) => (
            <mesh
              key={`${x}-${y}-${z}`}
              position={[x - 1, y - 1, z - 1]}
              material={cubeMaterials[(x + y + z) % 6]}
            >
              <boxGeometry args={[0.9, 0.9, 0.9]} />
            </mesh>
          ))
        )
      )}
    </group>
  );
}

export default function RubiksCube() {
  return (
    <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px]">
      <Canvas camera={{ position: [4, 4, 4] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <RubikCore />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
