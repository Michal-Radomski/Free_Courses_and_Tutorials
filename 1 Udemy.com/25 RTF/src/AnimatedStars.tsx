import React from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Material, NormalBufferAttributes, Object3DEventMap, Points } from "three";

const AnimatedStars = (): React.JSX.Element => {
  const starsRef =
    React.useRef<Points<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);

  useFrame(() => {
    starsRef.current!.rotation.x += 0.0001;
    starsRef.current!.rotation.y += 0.0001;
    starsRef.current!.rotation.z += 0.0001;
  });

  return (
    <React.Fragment>
      <Stars ref={starsRef} />
    </React.Fragment>
  );
};

export default AnimatedStars;
