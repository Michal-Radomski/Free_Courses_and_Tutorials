//* Not Used!
import React from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Clock, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Texture } from "three";

const Moon = (): React.JSX.Element => {
  const moonRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material, Object3DEventMap>>(null);

  const [moonTexture]: Texture[] = useTexture(["/assets/moon_map.jpg"]);

  useFrame(({ clock }: { clock: Clock }) => {
    // Orbit Rotation
    moonRef.current!.position.x = Math.sin(clock.getElapsedTime() * 0.8) * 4;
    moonRef.current!.position.z = Math.cos(clock.getElapsedTime() * 0.8) * 4;
    // Axis Rotation
    moonRef.current!.rotation.y += 0.002;
  });

  return (
    <React.Fragment>
      <mesh castShadow={true} ref={moonRef} position={[4, 0, 0]}>
        {/* //* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial map={moonTexture} />
      </mesh>
    </React.Fragment>
  );
};

export default Moon;
