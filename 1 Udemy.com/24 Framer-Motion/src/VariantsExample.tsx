import React from "react";
import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 0,
    x: -100, // Start off-screen to the left
  },
  visible: {
    opacity: 1,
    x: 0, // Move to its original position
    transition: {
      duration: 1, // Smooth transition duration
      ease: "easeInOut", // Easing function
    },
  },
};

const VariantsExample = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.div
        variants={boxVariants} // Attach the variants object
        initial="hidden" // Start with the "hidden" variant
        animate="visible" // Animate to the "visible" variant
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
          borderRadius: "15%",
        }}
      />
    </React.Fragment>
  );
};

export default VariantsExample;
