import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";
import { useState } from "react";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

const Template = (args: any) => {
  const [value, setValue] = useState("");
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "This is a helper text",
    variant: "outlined",
    size: "md",
  },
};

export const Error: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Email",
    placeholder: "Enter email",
    errorMessage: "Invalid email",
    invalid: true,
    variant: "outlined",
  },
};

export const Password: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    variant: "filled",
  },
};
