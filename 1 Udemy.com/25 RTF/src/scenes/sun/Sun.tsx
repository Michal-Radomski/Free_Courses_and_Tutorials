import React from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Texture } from "three";

const Sun: React.MemoExoticComponent<() => React.JSX.Element> = React.memo((): React.JSX.Element => {
  const sunRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);

  const [sunTexture]: Texture[] = useTexture(["/assets/sun_map.jpg"]);

  useFrame(() => {
    // Axis Rotation
    sunRef.current!.rotation.y -= 0.002;
  });

  return (
    <React.Fragment>
      <mesh ref={sunRef} position={[0, 0, 0]}>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial map={sunTexture} emissiveMap={sunTexture} emissiveIntensity={0.6} emissive={0xffffff} />
        <pointLight castShadow={true} />
      </mesh>
    </React.Fragment>
  );
});

export default Sun;
