import { motion } from "framer-motion";
import React from "react";

const Component1 = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.div animate={{ x: 100, rotate: 360 }} className="box" />
    </React.Fragment>
  );
};

export default Component1;
