import React from "react";
import { motion, MotionValue, useMotionValue } from "framer-motion";

const RangeSlider = (): React.JSX.Element => {
  const scale: MotionValue<number> = useMotionValue(1);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => scale.set(parseFloat(event.target.value));

  return (
    <React.Fragment>
      <div>
        <motion.button className="box" style={{ scale }} />

        <div className="mt-[6rem]">
          <input type="range" min={0.5} max={5} step={0.01} defaultValue={1} onChange={changeHandler} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RangeSlider;
