import React from "react";
import {
  animate,
  AnimatePresence,
  AnimationPlaybackControls,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
// import { motion } from "motion/react";

//* Styles
const image: React.CSSProperties = {
  maxWidth: "80vw",
};

const shape: React.CSSProperties = {
  strokeWidth: 10,
  strokeLinecap: "round",
  fill: "transparent",
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const PathDrawing = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.svg width="600" height="600" viewBox="0 0 600 600" initial="hidden" animate="visible" style={image}>
        <motion.circle
          className="circle-path"
          cx="100"
          cy="100"
          r="80"
          stroke="#ff0088"
          variants={draw}
          custom={1}
          style={shape}
        />
        <motion.line x1="220" y1="30" x2="360" y2="170" stroke="#4ff0b7" variants={draw} custom={2} style={shape} />
        <motion.line x1="220" y1="170" x2="360" y2="30" stroke="#4ff0b7" variants={draw} custom={2.5} style={shape} />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="30"
          rx="20"
          stroke="#0d63f8"
          variants={draw}
          custom={3}
          style={shape}
        />
        <motion.circle cx="100" cy="300" r="80" stroke="#0d63f8" variants={draw} custom={2} style={shape} />
        <motion.line x1="220" y1="230" x2="360" y2="370" stroke="#ff0088" custom={3} variants={draw} style={shape} />
        <motion.line x1="220" y1="370" x2="360" y2="230" stroke="#ff0088" custom={3.5} variants={draw} style={shape} />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="230"
          rx="20"
          stroke="#4ff0b7"
          custom={4}
          variants={draw}
          style={shape}
        />
        <motion.circle cx="100" cy="500" r="80" stroke="#4ff0b7" variants={draw} custom={3} style={shape} />
        <motion.line x1="220" y1="430" x2="360" y2="570" stroke="#0d63f8" variants={draw} custom={4} style={shape} />
        <motion.line x1="220" y1="570" x2="360" y2="430" stroke="#0d63f8" variants={draw} custom={4.5} style={shape} />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="430"
          rx="20"
          stroke="#ff0088"
          variants={draw}
          custom={5}
          style={shape}
        />
      </motion.svg>
    </React.Fragment>
  );
};

//* Styles
const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: 100,
  height: 160,
  position: "relative",
};

const box: React.CSSProperties = {
  width: 100,
  height: 100,
  backgroundColor: "#0cdcf7",
  borderRadius: "10px",
};

const button: React.CSSProperties = {
  backgroundColor: "#0cdcf7",
  borderRadius: "10px",
  padding: "10px 20px",
  color: "#0f1115",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
};

const ExitAnimation = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      <div style={container}>
        <AnimatePresence initial={false}>
          {isVisible ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={box}
              key="box"
            />
          ) : null}
        </AnimatePresence>
        <motion.button style={button} onClick={() => setIsVisible(!isVisible)} whileTap={{ y: 1 }}>
          {isVisible ? "Hide" : "Show"}
        </motion.button>
      </div>
    </React.Fragment>
  );
};

//* Styles
const text = {
  fontSize: 64,
  color: "#4ff0b7",
};

const HTMLContent = (): React.JSX.Element => {
  const count: MotionValue<number> = useMotionValue(0);
  const rounded: MotionValue<number> = useTransform(() => Math.round(count.get()));

  React.useEffect(() => {
    const controls: AnimationPlaybackControls = animate(count, 100, { duration: 5 });
    return () => controls.stop();
  }, [count]);

  return <motion.pre style={text}>{rounded}</motion.pre>;
};

//* Styles
const ball = {
  width: 100,
  height: 100,
  backgroundColor: "#dd00ee",
  borderRadius: "50%",
};

const EnterAnimation = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        style={ball}
      />
    </React.Fragment>
  );
};

const DocsExamples = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <EnterAnimation />
      <PathDrawing />
      <ExitAnimation />
      <HTMLContent />
    </React.Fragment>
  );
};

export default DocsExamples;
