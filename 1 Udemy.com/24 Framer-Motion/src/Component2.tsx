import React from "react";
import { motion } from "framer-motion";

const Component2 = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1], // Scale changes sequentially
          rotate: [0, 0, 270, 270, 0], // Rotation changes sequentially
          borderRadius: ["20%", "20%", "50%", "50%", "20%"], // Border radius transitions
          translateX: ["20rem", "5rem", "2rem", "-2rem", "25rem"],
        }}
        transition={{
          duration: 2, // Total animation duration
          times: [0, 0.2, 0.5, 0.8, 1], // Timing for each keyframe
        }}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
        }}
      />

      <div className="flex justify-center item-center space-x-2">
        {[...Array(3)].map(
          (_, index: number): React.JSX.Element => (
            <motion.div
              key={index}
              className="w-10 h-10 bg-teal-500 rounded-full"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: index * 0.2,
              }}
            />
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default Component2;
