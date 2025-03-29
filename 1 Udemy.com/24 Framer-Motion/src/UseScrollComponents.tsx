import React from "react";
import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const AnimationComponent = (): React.JSX.Element => {
  const { scrollY }: { scrollY: MotionValue<number> } = useScroll();

  const scale: MotionValue<number> = useTransform(scrollY, [0, 1000], [1, 0.5]);
  const borderRadius: MotionValue<string> = useTransform(scrollY, [0, 1000], ["0%", "50%"]);

  return (
    <React.Fragment>
      <div className="relative h-screen overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1728408828574-70a460530093?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            scale,
            borderRadius,
          }}
        />
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <h1 className="text-white text-4xl">Scroll to Animate</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

const ScrollAnimation = (): React.JSX.Element => {
  const { scrollY }: { scrollY: MotionValue<number> } = useScroll();
  const scale: MotionValue<number> = useTransform(scrollY, [0, 300], [1, 1.5]);
  const opacity: MotionValue<number> = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <React.Fragment>
      <div className="h-screen flex items-center justify-center">
        <motion.div className="bg-blue-500 w-32 h-32 rounded-lg shadow-lg" style={{ scale, opacity }}></motion.div>
        <div className="h-[150vh] w-full"></div>
      </div>
    </React.Fragment>
  );
};

const Basic = (): React.JSX.Element => {
  // const scroll = useScroll();
  // console.log("scroll:", scroll);

  const { scrollY }: { scrollY: MotionValue<number> } = useScroll();

  useMotionValueEvent(scrollY as MotionValue<number>, "change", (latest: number) => {
    console.log("Page scroll: ", latest);
  });

  return (
    <React.Fragment>
      <div>
        <motion.ul className="box">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </motion.ul>
      </div>
    </React.Fragment>
  );
};

const UseScrollComponents = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <AnimationComponent />
      <Basic />
      <ScrollAnimation />
    </React.Fragment>
  );
};

export default UseScrollComponents;
