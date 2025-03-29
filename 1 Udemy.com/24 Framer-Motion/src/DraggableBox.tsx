import React from "react";
import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";

const DraggableBox = (): React.JSX.Element => {
  const x: MotionValue<number> = useMotionValue(0);
  const y: MotionValue<number> = useMotionValue(0);
  const backgroundColor: MotionValue<string> = useTransform(x, [-100, 100], ["#ff0000", "#00ff00"]);

  return (
    <React.Fragment>
      <motion.div
        drag
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        style={{ x, y, backgroundColor }}
        className="w-32 h-32 flex items-center justify-center rounded-lg shadow-lg cursor-pointer"
      >
        <span className="text-white">Drag me!</span>
      </motion.div>
    </React.Fragment>
  );
};

export default DraggableBox;
