"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CubeMesh() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.6;
  });

  return (
    <mesh ref={ref} scale={1.3}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#4f46e5"
        emissive="#6366f1"
        emissiveIntensity={0.6}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
}

export default function TechCube() {
  return (
    <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px]">
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 4]} intensity={1.4} />
        <CubeMesh />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
