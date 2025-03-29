import React from "react";
import { motion } from "framer-motion";

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8, //* Delay
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StaggerAnimation = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.div variants={parentVariants} initial="hidden" animate="visible">
        {[...Array(3)].map(
          (_, index: number): React.JSX.Element => (
            <motion.div className="box mt-[2rem]" key={index} variants={childVariants} />
          )
        )}
      </motion.div>
    </React.Fragment>
  );
};

export default StaggerAnimation;
