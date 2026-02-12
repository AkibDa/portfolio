
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingGeometry: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);

  // Generate random particles for a "data cluster" look
  const particlesCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation logic
      const t = state.clock.getElapsedTime();
      
      // Core and Shell counter-rotation
      coreRef.current.rotation.z = t * 0.2;
      coreRef.current.rotation.y = t * 0.3;
      shellRef.current.rotation.x = -t * 0.1;
      shellRef.current.rotation.y = -t * 0.15;

      // Reaction to mouse movement
      const x = (state.mouse.x * state.viewport.width) / 8;
      const y = (state.mouse.y * state.viewport.height) / 8;
      
      // Smoothly interpolate group position based on mouse
      groupRef.current.position.lerp(new THREE.Vector3(x, y, 0), 0.05);
      
      // Subtle tilt based on mouse position
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.mouse.y * 0.4, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.4, 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Inner "Neural Core" - Organic and Distorted */}
        <Sphere ref={coreRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            speed={3}
            distort={0.45}
            radius={1}
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>

        {/* Outer "Structural Shell" - Wireframe Geometric representation */}
        <Icosahedron ref={shellRef} args={[2.2, 2]}>
          <meshStandardMaterial
            color="#818cf8"
            wireframe
            transparent
            opacity={0.3}
            emissive="#818cf8"
            emissiveIntensity={0.2}
          />
        </Icosahedron>

        {/* "Data Particles" - Cluster of points representing data nodes */}
        <Points positions={positions}>
          <PointMaterial
            transparent
            color="#c7d2fe"
            size={0.05}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Points>

        {/* Subtle Ambient Glow Lights attached to the geometry */}
        <pointLight position={[2, 2, 2]} intensity={2} color="#4f46e5" />
        <pointLight position={[-2, -2, -2]} intensity={1} color="#818cf8" />
      </group>
    </Float>
  );
};

export default FloatingGeometry;
