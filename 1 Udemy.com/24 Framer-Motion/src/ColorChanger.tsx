import React from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";

const ColorChanger = (): React.JSX.Element => {
  const hue: MotionValue<number> = useMotionValue(0);
  const backgroundColor: MotionValue<string> = useTransform(
    hue as MotionValue<number>,
    (h: number) => `hsl(${h}, 100%, 50%)`
  );

  const hue2: MotionValue<number> = useSpring(0, { stiffness: 300, damping: 30 });
  const background: MotionValue<string> = useTransform(hue as MotionValue<number>, (h: number) => `hsl(${h}, 100%, 50%)`);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    hue.set(parseFloat(event.target.value));
    hue2.set(parseFloat(event.target.value));
  };

  return (
    <React.Fragment>
      <div>
        <motion.div className="color-box" style={{ backgroundColor, width: 200, height: 200, borderRadius: 16 }} />
        <motion.div className="color-box" style={{ background, width: 200, height: 200, borderRadius: 32 }} />
        <div className="mt-4">
          <input type="range" min={0} max={360} step={1} defaultValue={0} onChange={changeHandler} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ColorChanger;
