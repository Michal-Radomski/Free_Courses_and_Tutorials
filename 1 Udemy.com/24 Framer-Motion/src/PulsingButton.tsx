import React from "react";
import { motion } from "framer-motion";

const PulsingButton = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.button
        className="px-4 py-2 rounded outline-none"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          // backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
        animate={{
          scale: [1, 1.1, 1], // Keyframes for pulsing effect
          backgroundColor: ["#3b82f6", "#60a5fa", "#3b82f6"],
        }}
        transition={{
          duration: 1, // Duration of one pulse
          repeat: Infinity, // Loop the animation infinitely
          ease: "easeInOut", // Smooth easing
        }}
      >
        Pulse Me
      </motion.button>
    </React.Fragment>
  );
};

export default PulsingButton;
