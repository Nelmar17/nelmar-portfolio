"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function RotatingCube() {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.5;
      cubeRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <mesh ref={cubeRef} scale={1.4}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#6366F1"
        emissive="#4F46E5"
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

export default function Cube() {
  return (
    <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] mx-auto">
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <RotatingCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
