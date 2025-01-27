import { Meta, StoryFn } from "@storybook/react";

import CustomButton, { CustomButtonProps } from "../CustomButton";

export default {
  title: "Components/CustomButton",
  component: CustomButton,
  argTypes: {
    color: { control: "color" },
  },
} as Meta;

const Template: StoryFn<CustomButtonProps> = (args: CustomButtonProps) => <CustomButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "initial",
};

export const RedButton = Template.bind({});
RedButton.args = {
  color: "red",
};

export const BlueButton = Template.bind({});
BlueButton.args = {
  color: "blue",
};
