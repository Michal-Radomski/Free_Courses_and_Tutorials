import React from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Moon: React.MemoExoticComponent<() => React.JSX.Element> = React.memo(() => {
  const moonRef =
    React.useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material, THREE.Object3DEventMap>>(
      null
    );
  const clockRef = React.useRef<THREE.Clock>(new THREE.Clock()); // Create a reference to the clock

  const [moonTexture]: THREE.Texture[] = useTexture(["/assets/moon_map.jpg"]);

  const xAxis = 4;
  const updateMoonPosition = React.useCallback(() => {
    // Orbit Rotation
    moonRef.current!.position.x = Math.sin(clockRef.current.getElapsedTime() * 0.8) * xAxis;
    moonRef.current!.position.z = Math.cos(clockRef.current.getElapsedTime() * 0.8) * xAxis;
    // Axis Rotation
    moonRef.current!.rotation.y += 0.002;
  }, []);

  useFrame(() => {
    updateMoonPosition();
  });

  return (
    <React.Fragment>
      <mesh castShadow={true} receiveShadow={true} ref={moonRef} position={[xAxis, 0, 0]}>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial map={moonTexture} emissiveMap={moonTexture} emissive={0xffffff} emissiveIntensity={0.05} />
      </mesh>
    </React.Fragment>
  );
});

export default Moon;
