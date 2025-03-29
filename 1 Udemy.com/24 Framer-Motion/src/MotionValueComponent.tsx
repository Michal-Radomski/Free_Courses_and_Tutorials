import React from "react";
import { useMotionValue, motion, useMotionValueEvent, MotionValue } from "framer-motion";

const MotionValueComponent = (): React.JSX.Element => {
  const x: MotionValue<number> = useMotionValue(200);

  useMotionValueEvent(x as MotionValue<number>, "animationStart", () => {
    console.log("animation started on x");
  });

  useMotionValueEvent(x as MotionValue<number>, "change", (latest: number) => {
    console.log("x changed to", latest);
  });

  return (
    <React.Fragment>
      <motion.div className="box" drag dragConstraints={{ left: 0, right: 200 }} style={{ x: x }} />
    </React.Fragment>
  );
};

export default MotionValueComponent;
