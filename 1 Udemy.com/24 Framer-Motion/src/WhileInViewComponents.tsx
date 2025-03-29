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

const TimelineAnimation = (): React.JSX.Element => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: 180 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  };

  return (
    <React.Fragment>
      <motion.div className="flex items-center" initial="hidden" whileInView="visible" transition={{ staggerChildren: 0.5 }}>
        {[1, 2, 3].map((item: number) => (
          <motion.div key={item} variants={itemVariants} className="bg-purple-500 ml-[2rem] p-4 text-white my-2 rounded-lg">
            Item {item}
          </motion.div>
        ))}
      </motion.div>
    </React.Fragment>
  );
};

const InteractiveCards = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item: number) => (
          <motion.div
            key={item}
            className="bg-blue-500 p-6 text-white text-center rounded-lg"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl">Card {item}</h3>
          </motion.div>
        ))}
      </div>
    </React.Fragment>
  );
};

const WhileInViewComponents = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <TimelineAnimation />
      <InteractiveCards />
      <AnimatedBoxes />
      <AnimatedCard />
    </React.Fragment>
  );
};

export default WhileInViewComponents;
