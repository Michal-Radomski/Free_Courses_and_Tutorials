import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ISS: React.MemoExoticComponent<() => React.JSX.Element> = React.memo((): React.JSX.Element => {
  const issRef =
    React.useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.Object3DEventMap
      >
    >(null);
  const clockRef = React.useRef<THREE.Clock>(new THREE.Clock()); // Create a reference to the clock

  const ISS = useGLTF("/ISSModel/ISS_stationary.gltf");

  const xAxis = 2;

  const updateMoonPosition = React.useCallback(() => {
    // Orbit Rotation
    issRef.current!.position.x = Math.sin(clockRef.current.getElapsedTime() * 0.6) * xAxis;
    issRef.current!.position.z = Math.cos(clockRef.current.getElapsedTime() * 0.6) * xAxis;
  }, []);

  useFrame(() => {
    updateMoonPosition();
  });

  return (
    <React.Fragment>
      <mesh>
        <primitive ref={issRef} object={ISS.scene} position={[xAxis, 0, 0]} scale={0.005} />
      </mesh>
    </React.Fragment>
  );
});

export default ISS;
