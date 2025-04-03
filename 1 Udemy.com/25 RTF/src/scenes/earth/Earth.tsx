import React from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

import Moon from "./Moon";
import ISS from "./ISS";

const Earth: React.MemoExoticComponent<({ displacementScale }: { displacementScale: number }) => React.JSX.Element> =
  React.memo(({ displacementScale }: { displacementScale: number }): React.JSX.Element => {
    const earthRef = React.useRef<THREE.Group<THREE.Object3DEventMap>>(null);
    const clockRef = React.useRef<THREE.Clock>(new THREE.Clock()); // Create a reference to the clock

    const { camera }: { camera: THREE.PerspectiveCamera } = useThree();

    const [hovered, hover] = React.useState<boolean>(false);
    const [followingEarth, setFollowingEarth] = React.useState<boolean>(false);
    const [cameraPosition, setCameraPosition] = React.useState<THREE.Vector3>(new THREE.Vector3(16.14, 8.32, 19.81));
    const [cameraTarget, setCameraTarget] = React.useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    // console.log({ followingEarth });
    // console.log({ cameraTarget });

    const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap, earthEmissiveMap]: THREE.Texture[] =
      useTexture([
        "/assets/earth_day.jpg",
        "/assets/earth_normal.jpg",
        "/assets/earth_specular.jpg",
        "/assets/earth_displacement.jpg",
        "/assets/earth_night.jpg",
      ]);

    const updateEarthPosition: () => void = React.useCallback(() => {
      // Calculate the Earth's position based on its angle from the Sun
      const angle: number = clockRef.current.getElapsedTime() * 0.5;
      const distance = 14;
      const x: number = Math.sin(angle) * distance;
      const z: number = Math.cos(angle) * distance;
      earthRef.current!.position.set(x, 0, z);
      earthRef.current!.rotation.y += 0.002;
    }, []);

    const toggleFollowingEarth = (): void => {
      setFollowingEarth((prevFollowingEarth: boolean) => !prevFollowingEarth);
    };

    React.useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    const tweenLogic: () => void = React.useCallback(() => {
      TWEEN.update();

      const earthPositionRef = earthRef.current!.position as THREE.Vector3;

      if (followingEarth) {
        const cameraTargetPosition = new THREE.Vector3(
          earthPositionRef.x + 10,
          earthPositionRef.y + 2,
          earthPositionRef.z + 5
        );
        // Tween for camera position
        new TWEEN.Tween(cameraPosition)
          .to(cameraTargetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            setCameraPosition(cameraPosition);
          })
          .start();

        // Tween for camera targeting
        new TWEEN.Tween(cameraTarget)
          .to(earthPositionRef, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            setCameraTarget(cameraTarget);
          })
          .start();
      } else {
        const originalCameraPosition: THREE.Vector3 = new THREE.Vector3(16.14, 8.32, 19.81);
        const originalCameraTarget: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
        // Tween to original position
        new TWEEN.Tween(cameraPosition)
          .to(originalCameraPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            setCameraPosition(cameraPosition);
          })
          .start();
        // Tween to original target
        new TWEEN.Tween(cameraTarget)
          .to(originalCameraTarget, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            setCameraTarget(cameraTarget);
          })
          .start();
      }
      camera.lookAt(cameraTarget);
      camera.position.copy(cameraPosition);
      camera.updateProjectionMatrix();
    }, [camera, cameraPosition, cameraTarget, followingEarth]);

    useFrame(() => {
      updateEarthPosition();
      tweenLogic();
    });

    return (
      <React.Fragment>
        <group ref={earthRef}>
          <mesh
            castShadow={true}
            receiveShadow={true}
            onClick={toggleFollowingEarth}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
          >
            {/* Radius , X-axis , Y-axis */}
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhongMaterial
              map={earthTexture}
              normalMap={earthNormalMap}
              specularMap={earthSpecularMap}
              shininess={1000}
              displacementMap={earthDisplacementMap}
              displacementScale={displacementScale}
              emissiveMap={earthEmissiveMap}
              emissive={0xffffff}
              emissiveIntensity={hovered ? 20 : 1.5}
            />
          </mesh>
          <ISS />
          <Moon />
        </group>
      </React.Fragment>
    );
  });

export default Earth;
