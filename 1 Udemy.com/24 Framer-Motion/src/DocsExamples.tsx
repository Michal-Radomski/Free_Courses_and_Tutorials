import React from "react";
import {
  animate,
  AnimatePresence,
  AnimationPlaybackControls,
  motion,
  MotionValue,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTime,
  useTransform,
  useVelocity,
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

//* Styles
const layer: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
};

const boxContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 50,
  flexWrap: "wrap",
};

const UseTime = (): React.JSX.Element => {
  const time: MotionValue<number> = useTime();
  const rotate: MotionValue<number> = useTransform(
    time,
    [0, 4000], // time in milliseconds
    [0, 360], // rotation in degrees
    { clamp: false }
  );

  const tinyBox = {
    width: 40,
    height: 40,
    backgroundColor: "#9911ff",
    borderRadius: 5,
    rotate: useTransform(() => rotate.get() * 2), // 2x speed
  };

  const smallBox = {
    width: 80,
    height: 80,
    backgroundColor: "#dd00ee",
    borderRadius: 5,
    rotate: useTransform(() => rotate.get() * 1.5), // 1.5x speed
  };

  const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
    rotate,
  };

  return (
    <React.Fragment>
      <div style={{ ...layer, filter: "blur(4px)" }}>
        <div style={{ ...boxContainer, width: 500, gap: 80 }}>
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
          <motion.div style={tinyBox} />
        </div>
      </div>
      <div style={{ ...layer, filter: "blur(2px)" }}>
        <div style={{ ...boxContainer, width: 300 }}>
          <motion.div style={smallBox} />
          <motion.div style={smallBox} />
          <motion.div style={smallBox} />
          <motion.div style={smallBox} />
        </div>
      </div>
      <div style={layer}>
        <div style={boxContainer}>
          <motion.div style={box} />
        </div>
      </div>
    </React.Fragment>
  );
};

//* Styles
//Todo: fix
function StyleSheet(): React.JSX.Element {
  return (
    <style>{`
          
      .container1 {
          perspective: 800px;
          width: 200px;
          height: 200px;
          border:1px solid red;
      }

      .cube {
          width: 200px;
          height: 200px;
          position: relative;
          transform-style: preserve-3d;
          background: blue;
      }

      .side {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: red;
          opacity: 0.6;
      }

      .front {
          transform: rotateY(0deg) translateZ(100px);
          background-color: var(--hue-1-transparent);
      }
      .right {
          transform: rotateY(90deg) translateZ(100px);
          background-color: var(--hue-2-transparent);
      }
      .back {
          transform: rotateY(180deg) translateZ(100px);
          background-color: var(--hue-3-transparent);
      }
      .left {
          transform: rotateY(-90deg) translateZ(100px);
          background-color: var(--hue-4-transparent);
      }
      .top {
          transform: rotateX(90deg) translateZ(100px);
          background-color: var(--hue-5-transparent);
      }
      .bottom {
          transform: rotateX(-90deg) translateZ(100px);
          background-color: var(--hue-6-transparent);
      }

  `}</style>
  );
}

const UseAnimationFrame = (): React.JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);

  useAnimationFrame((t: number) => {
    if (!ref.current) return;

    const rotate: number = Math.sin(t / 10000) * 200;
    const y: number = (1 + Math.sin(t / 1000)) * -50;
    ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
  });

  return (
    <React.Fragment>
      <div className="container1">
        <div className="cube" ref={ref}>
          <div className="side front" />
          <div className="side left" />
          <div className="side right" />
          <div className="side top" />
          <div className="side bottom" />
          <div className="side back" />
        </div>
        <StyleSheet />
      </div>
    </React.Fragment>
  );
};

const ScrollVelocityExample = (): React.JSX.Element => {
  // Get the scrollY motion value
  const { scrollY }: { scrollY: MotionValue<number> } = useScroll();

  // Calculate the velocity of the scroll
  const scrollVelocity: MotionValue<number> = useVelocity(scrollY);

  // Transform the velocity into a position value for the element
  const moveX: MotionValue<number> = useTransform(scrollVelocity, [-1000, 1000], [-50, 50]);

  return (
    <React.Fragment>
      <div style={{ height: "200vh", overflowY: "scroll" }}>
        <motion.div
          style={{
            x: moveX,
            width: "100px",
            height: "100px",
            backgroundColor: "red",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </React.Fragment>
  );
};

const DocsExamples = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <ScrollVelocityExample />
      <UseAnimationFrame />
      <UseTime />
      <EnterAnimation />
      <PathDrawing />
      <ExitAnimation />
      <HTMLContent />
    </React.Fragment>
  );
};

export default DocsExamples;
