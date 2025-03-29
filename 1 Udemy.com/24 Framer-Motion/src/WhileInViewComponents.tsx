import React from "react";
import { motion } from "framer-motion";

const AnimatedCard = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <div className="flex justify-center items-start mt-[30rem]">
        <div className="h-[200vh] w-full flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{
              scale: 1.1,
              opacity: 1,
              y: -200,
            }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold mb-2 text-black">Amazing Card</h2>
            <p className="text-gray-600">This card animates beautifully into view!</p>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
};

const AnimatedBoxes = (): React.JSX.Element => {
  const boxes: number[] = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-4xl font-bold mb-10">Scroll to Animate</h1>
        <div className="space-y-6">
          {boxes.map((box: number) => (
            <motion.div
              key={box}
              className="w-64 h-64 bg-blue-500 flex items-center justify-center text-white text-xl rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Box {box}
            </motion.div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const WhileInViewComponents = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <AnimatedBoxes />
      <AnimatedCard />
    </React.Fragment>
  );
};

export default WhileInViewComponents;
