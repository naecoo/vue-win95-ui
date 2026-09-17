import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import ProgressBar from "../ProgressBar.vue";

describe("W95ProgressBar", () => {
  it("renders progressbar role with aria values", () => {
    const wrapper = mount(ProgressBar, { props: { value: 40, max: 100 } });
    const bar = wrapper.find('[role="progressbar"]');
    expect(bar.exists()).toBe(true);
    expect(bar.attributes("aria-valuenow")).toBe("40");
    expect(bar.attributes("aria-valuemax")).toBe("100");
  });

  it("clamps bar width", () => {
    const wrapper = mount(ProgressBar, { props: { value: 40, max: 100 } });
    const bar = wrapper.find('[role="progressbar"] > div');
    expect(bar.attributes("style")).toContain("width: 40%");
  });

  it("has accessible name", () => {
    const wrapper = mount(ProgressBar, {
      props: { value: 40, label: "Download" },
    });
    expect(wrapper.find('[role="progressbar"]').attributes("aria-label")).toBe(
      "Download"
    );
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(ProgressBar, {
      props: { value: 40, label: "Download progress" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("supports segmented variant", () => {
    const wrapper = mount(ProgressBar, {
      props: { value: 50, segmented: true },
    });
    expect(wrapper.html()).toContain("linear-gradient");
  });
});
