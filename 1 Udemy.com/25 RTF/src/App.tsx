import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./App.scss";
import MainContainer from "./MainContainer";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Canvas shadows camera={{ fov: 55, near: 0.1, far: 1000, position: [16, 8.5, 19.5] }}>
        <color attach="background" args={["black"]} />

        <OrbitControls />
        <MainContainer />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
