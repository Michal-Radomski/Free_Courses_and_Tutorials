import React from "react";
import { motion, MotionValue, useMotionValue, useSpring } from "framer-motion";

const DynamicRotation = (): React.JSX.Element => {
  const rotation: MotionValue<number> = useMotionValue(0);

  const rotateBox = (): void => {
    rotation.set(rotation.get() + 45);
  };

  return (
    <React.Fragment>
      <motion.div style={{ rotate: rotation }} className="w-32 h-32 bg-blue-500 rounded" onClick={rotateBox}>
        Click Me
      </motion.div>
    </React.Fragment>
  );
};

export default DynamicRotation;

export const DynamicRotation2 = (): React.JSX.Element => {
  const rotation: MotionValue<number> = useSpring(0); //* Smooth rotation1

  const rotateBox = (): void => {
    rotation.set(rotation.get() + 45);
  };

  return (
    <motion.div style={{ rotate: rotation }} className="w-32 h-32 bg-teal-500 rounded" onClick={rotateBox}>
      Click Me2
    </motion.div>
  );
};
