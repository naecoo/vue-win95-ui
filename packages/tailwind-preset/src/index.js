/**
 * Shared Win95 Tailwind preset
 * Import in tailwind.config:  presets: [require('@win95/tailwind-preset')]
 */
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        w95: {
          surface: "var(--w95-surface)",
          highlight: "var(--w95-button-highlight)",
          face: "var(--w95-button-face)",
          shadow: "var(--w95-button-shadow)",
          frame: "var(--w95-window-frame)",
          blue: "var(--w95-dialog-blue)",
          "blue-light": "var(--w95-dialog-blue-light)",
          gray: "var(--w95-dialog-gray)",
          "gray-light": "var(--w95-dialog-gray-light)",
          text: "var(--w95-text)",
          link: "var(--w95-link)",
          desktop: "var(--w95-desktop)",
        },
      },
      fontFamily: {
        w95: ["'Pixelated MS Sans Serif'", "Tahoma", "Arial", "sans-serif"],
      },
      fontSize: {
        w95: ["11px", { lineHeight: "14px" }],
        "w95-lg": ["12px", { lineHeight: "16px" }],
      },
      spacing: {
        w95: "8px",
        "w95-sm": "4px",
        "w95-md": "6px",
      },
      minWidth: {
        "w95-btn": "75px",
      },
      minHeight: {
        "w95-btn": "23px",
        "w95-input": "21px",
        "w95-title": "18px",
      },
      height: {
        "w95-btn": "23px",
        "w95-input": "21px",
        "w95-title": "18px",
        "w95-check": "13px",
        "w95-radio": "12px",
        "w95-progress": "32px",
        "w95-slider-thumb": "21px",
      },
      width: {
        "w95-check": "13px",
        "w95-radio": "12px",
        "w95-title-btn": "16px",
        "w95-slider-thumb": "11px",
      },
      boxShadow: {
        "w95-raised":
          "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        "w95-sunken":
          "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080",
        "w95-window":
          "inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff",
        "w95-field":
          "inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a",
        "w95-status": "inset -1px -1px #dfdfdf, inset 1px 1px #808080",
        "w95-default-btn":
          "inset -2px -2px #0a0a0a, inset 1px 1px #0a0a0a, inset 2px 2px #ffffff, inset -3px -3px #808080, inset 3px 3px #dfdfdf",
        "w95-progress-inner": "inset 2px 2px #808080, inset -1px -1px #ffffff",
      },
    },
  },
};
