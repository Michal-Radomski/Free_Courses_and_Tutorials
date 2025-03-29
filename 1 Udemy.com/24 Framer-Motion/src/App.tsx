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
import StaggerAnimation from "./StaggerAnimation";
import AnimatedGallery from "./AnimatedGallery";
import MotionValueComponent from "./MotionValueComponent";
import RangeSlider from "./RangeSlider";
import ColorChanger from "./ColorChanger";
import DynamicRotation, { DynamicRotation2 } from "./DynamicRotation";
import UseSpringComponents from "./UseSpringComponents";
import DraggableBox from "./DraggableBox";
import WhileInViewComponents from "./WhileInViewComponents";
import UseScrollComponents from "./UseScrollComponents";
import DocsExamples from "./DocsExamples";

//^ Problem with hooks? Attempting to mix Motion versions 12.6.1 with 12.6.2 may not work as expected!!!
const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <DocsExamples />
      <UseScrollComponents />
      <WhileInViewComponents />
      <DraggableBox />
      <UseSpringComponents />
      <DynamicRotation />
      <DynamicRotation2 />
      <ColorChanger />
      <RangeSlider />
      <MotionValueComponent />
      <AnimatedGallery />
      <StaggerAnimation />
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
