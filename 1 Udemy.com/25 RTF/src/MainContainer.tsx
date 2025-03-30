import React from "react";
import { useHelper } from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";

import AnimatedStars from "./AnimatedStars";
import CameraPositionLogging from "./helpers/CameraPositionLogging";
import Earth from "./scenes/earth/Earth";
import Sun from "./scenes/sun/Sun";

const MainContainer = (): React.JSX.Element => {
  const directionalLightRef = React.useRef<THREE.Object3D<THREE.Object3DEventMap>>(null);
  const directionalLightRefTwo = React.useRef<THREE.Object3D<THREE.Object3DEventMap>>(null);

  useHelper(
    directionalLightRef as React.RefObject<THREE.Object3D<THREE.Object3DEventMap>>,
    THREE.DirectionalLightHelper,
    1,
    "hotpink"
  );
  useHelper(
    directionalLightRefTwo as React.RefObject<THREE.Object3D<THREE.Object3DEventMap>>,
    THREE.DirectionalLightHelper,
    1,
    "hotpink"
  );

  return (
    <React.Fragment>
      <Perf />
      <CameraPositionLogging event="mousedown" />
      <AnimatedStars />

      {/* <directionalLight castShadow ref={directionalLightRef} position={[0, 0, 10]} intensity={1} color={0xff0000} />
      <directionalLight castShadow ref={directionalLightRefTwo} position={[0, 0, -10]} /> */}

      <ambientLight intensity={0.1} />

      <Sun />
      <Earth displacementScale={0.15} />
    </React.Fragment>
  );
};

export default MainContainer;
