import React from "react";
import { motion, MotionValue, PanInfo, useSpring } from "framer-motion";

const DraggableBox = (): React.JSX.Element => {
  const x: MotionValue<number> = useSpring(0);
  const y: MotionValue<number> = useSpring(0);
  console.log({ x, y });

  return (
    <React.Fragment>
      <div className="flex flex-col items-center">
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          style={{ x, y }}
          className="w-32 h-32 bg-blue-500 rounded"
          onDrag={(_, info: PanInfo) => {
            console.log("info:", info);
            x.set(info.offset.x);
            y.set(info.offset.y);
          }}
        />
        <p className="text-black">
          Position: ({x.get().toFixed(2)}, {y.get().toFixed(2)})
        </p>
      </div>
    </React.Fragment>
  );
};

const HoverLinkedScale = (): React.JSX.Element => {
  const scale: MotionValue<number> = useSpring(1);

  return (
    <React.Fragment>
      <motion.button
        onHoverStart={() => scale.set(1.2)}
        onHoverEnd={() => scale.set(1)}
        style={{ scale }}
        className="p-4 bg-blue-500 text-white rounded"
      >
        Hover Me
      </motion.button>
    </React.Fragment>
  );
};

const UseSpringComponents = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <DraggableBox />
      <HoverLinkedScale />
    </React.Fragment>
  );
};

export default UseSpringComponents;
