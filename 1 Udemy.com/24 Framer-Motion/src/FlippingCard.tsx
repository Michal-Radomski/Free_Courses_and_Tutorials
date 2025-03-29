import React from "react";
import { motion } from "framer-motion";

const FlippingCard = (): React.JSX.Element => {
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

  const handleFlip = (): void => {
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div className="flipping-card">
        <motion.div
          style={{ width: "20rem", height: "10rem" }}
          transition={{ duration: 0.7 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
        >
          <motion.div transition={{ duration: 0.7 }} animate={{ rotateY: isFlipped ? 0 : 180 }} className="Card">
            <motion.div transition={{ duration: 0.7 }} animate={{ rotateY: isFlipped ? 0 : 180 }} className="front">
              Front Side
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.7 }}
              className="back"
            >
              Back Side
            </motion.div>
            <button onClick={handleFlip}>Click me</button>
          </motion.div>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default FlippingCard;
