import React from "react";

import "./App.scss";
import "./tailwind.css";
import Component1 from "./Component1";
import Component2 from "./Component2";
import PulsingButton from "./PulsingButton";
import VariantsExample from "./VariantsExample";
import FlippingCard from "./FlippingCard";
import AnimatedCard from "./AnimatedCard";
import ImageGallery from "./ImageGallery";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <Component1 />
      <Component2 />
      <PulsingButton />
      <VariantsExample />
      <FlippingCard />
      <AnimatedCard />
      <ImageGallery />
    </React.Fragment>
  );
};

export default App;
