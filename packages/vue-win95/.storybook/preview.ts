import type { Preview } from "@storybook/vue3";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "win95-desktop",
      values: [
        { name: "win95-desktop", value: "#008080" },
        { name: "surface", value: "#c0c0c0" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
