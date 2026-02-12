import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingGeometry: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);

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
    const t = state.clock.getElapsedTime();

    if (coreRef.current && shellRef.current && groupRef.current) {
      coreRef.current.rotation.z = t * 0.2;
      coreRef.current.rotation.y = t * 0.3;

      shellRef.current.rotation.x = -t * 0.1;
      shellRef.current.rotation.y = -t * 0.15;

      const x = (state.mouse.x * state.viewport.width) / 8;
      const y = (state.mouse.y * state.viewport.height) / 8;

      groupRef.current.position.lerp(new THREE.Vector3(x, y, 0), 0.04);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.mouse.y * 0.3,
        0.08
      );

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.mouse.x * 0.3,
        0.08
      );
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}>
      <group ref={groupRef}>
        <Sphere ref={coreRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            speed={2.5}
            distort={0.35}
            radius={1}
            emissive="#4f46e5"
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.75}
          />
        </Sphere>

        <Icosahedron ref={shellRef} args={[2.2, 2]}>
          <meshStandardMaterial
            color="#818cf8"
            wireframe
            transparent
            opacity={0.28}
            emissive="#818cf8"
            emissiveIntensity={0.25}
          />
        </Icosahedron>

        <Points positions={positions}>
          <PointMaterial
            transparent
            color="#c7d2fe"
            size={0.05}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Points>

        <pointLight position={[2, 2, 2]} intensity={1.8} color="#4f46e5" />
        <pointLight position={[-2, -2, -2]} intensity={1.2} color="#818cf8" />
      </group>
    </Float>
  );
};

export default FloatingGeometry;
