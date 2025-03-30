import React from "react";
import { useThree } from "@react-three/fiber";
import { Camera } from "three";

const CameraPositionLogging: React.FC<{ event: string }> = ({ event }: { event: string }): null => {
  const { camera } = useThree() as { camera: Camera };

  const cameraRef = React.useRef<Camera>(null);

  React.useEffect(() => {
    if (cameraRef?.current) {
      const logCameraPosition = (): void => {
        const { x, y, z }: { x: number; y: number; z: number } = cameraRef.current!.position;
        const roundX: number = Math.round(x * 100) / 100;
        const roundY: number = Math.round(y * 100) / 100;
        const roundZ: number = Math.round(z * 100) / 100;
        console.log(`Camera position: x: ${roundX}, y: ${roundY}, z: ${roundZ}`);
      };

      cameraRef.current = camera;
      window.addEventListener(event, logCameraPosition);

      return () => {
        window.removeEventListener(event, logCameraPosition);
      };
    }
  }, [camera, event]);

  return null;
};

export default CameraPositionLogging;
