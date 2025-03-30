//* Textures: https://www.solarsystemscope.com/textures
//* https://en.wikipedia.org/wiki/Polygon_mesh
//* https://en.wikipedia.org/wiki/UV_mapping
//* https://en.wikipedia.org/wiki/Normal_mapping
//* https://en.wikipedia.org/wiki/Specularity
//* https://en.wikipedia.org/wiki/Displacement_mapping

import React from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

import "./App.scss";
import MainContainer from "./MainContainer";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Canvas shadows camera={{ fov: 55, near: 0.1, far: 1000, position: [16, 8.5, 19.5] }}>
        <color attach="background" args={["#212529"]} />

        {/* <OrbitControls /> */}
        <MainContainer />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
