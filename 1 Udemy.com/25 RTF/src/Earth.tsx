//* Not Used!
import React from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Texture } from "three";

import Moon from "./Moon";

const Earth = ({ displacementScale }: { displacementScale: number }): React.JSX.Element => {
  const earthRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>>(null);

  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap]: Texture[] = useTexture([
    "/assets/earth_day.jpg",
    "/assets/earth_normal.jpg",
    "/assets/earth_specular.jpg",
    "/assets/earth_displacement.jpg",
  ]);

  useFrame(() => {
    earthRef.current!.rotation.y += 0.002;
  });

  return (
    <React.Fragment>
      <group>
        <mesh receiveShadow={true} ref={earthRef}>
          {/* //* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            map={earthTexture}
            normalMap={earthNormalMap}
            specularMap={earthSpecularMap}
            shininess={1000}
            displacementMap={earthDisplacementMap}
            displacementScale={displacementScale}
          />
        </mesh>
        <Moon />
      </group>
    </React.Fragment>
  );
};

export default Earth;
