import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
  },
  parameters: {
    a11y: { disable: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Success: Story = {
  args: { variant: "success" },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

// TODO: Add stories for loading/disabled states and focus-visible.
