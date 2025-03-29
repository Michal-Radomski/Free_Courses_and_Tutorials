import React from "react";
import { motion, MotionValue, useMotionValue, useSpring } from "framer-motion";

const RangeSlider = (): React.JSX.Element => {
  const scale: MotionValue<number> = useMotionValue(1);
  const scale2: MotionValue<number> = useSpring(1); //* Smooth scaling!

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    scale.set(parseFloat(event.target.value));
    scale2.set(parseFloat(event.target.value));
  };

  return (
    <React.Fragment>
      <div>
        <motion.button className="box" style={{ scale: scale }} />
        <motion.button className="box" style={{ scale: scale2 }} />

        <div className="mt-[6rem]">
          <input type="range" min={0.5} max={2} step={0.01} defaultValue={1} onChange={changeHandler} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RangeSlider;
