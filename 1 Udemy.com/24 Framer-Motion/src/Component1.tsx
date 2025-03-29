import { motion } from "framer-motion";
import React from "react";

const Component1 = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.h1
        initial={{ x: -1000, opacity: 0, scale: 0.5 }} // Starting state before mounting
        animate={{ x: 50, opacity: 1, scale: 1, rotate: 360 }} // Animation after mounting
        transition={{
          duration: 2, // Duration of animation in seconds
          delay: 1,
          ease: [0.5, 0.71, 1, 1.5], // Easing function for smooth transition
        }}
        whileHover={{ scale: 1.2 }} // Animation on hover
      >
        Animated Heading with Framer Motion
      </motion.h1>

      <motion.div animate={{ x: 100, rotate: 360, translateY: "10rem", skew: 20 }} className="box" />

      <motion.div
        animate={{ x: 600 }}
        className="box"
        // whileHover={{ scale: 1.5, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        whileTap={{ scale: 0.8, backgroundColor: "crimson" }}
        // drag={true}
        drag={"x"}
        dragConstraints={{ top: -40, left: -40, right: 40, bottom: 0 }}
      />
    </React.Fragment>
  );
};

export default Component1;
