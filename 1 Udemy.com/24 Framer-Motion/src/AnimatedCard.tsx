import React from "react";
import { motion } from "framer-motion";

const AnimatedCard = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.div
        className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
        initial={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.05, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        drag={true}
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        dragElastic={0.2}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          className="w-full h-48 object-cover"
          src="https://images.unsplash.com/photo-1728408828574-70a460530093?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Card Image"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">Dynamic Card Title</h2>
          <p className="text-gray-700 mb-4">This is a simple card with Framer Motion animations and Tailwind CSS styling.</p>
          <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition">Learn More</button>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default AnimatedCard;
