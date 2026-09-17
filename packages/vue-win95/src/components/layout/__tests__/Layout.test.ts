import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Divider from "../../divider/Divider.vue";
import StatusBar from "../../status-bar/StatusBar.vue";
import StatusBarField from "../../status-bar/StatusBarField.vue";
import FieldRow from "../../field-row/FieldRow.vue";

describe("W95Divider", () => {
  it("has separator role", () => {
    const wrapper = mount(Divider);
    expect(wrapper.find('[role="separator"]').exists()).toBe(true);
  });

  it("sets aria-orientation when vertical", () => {
    const wrapper = mount(Divider, { props: { vertical: true } });
    expect(wrapper.find('[role="separator"]').attributes("aria-orientation")).toBe(
      "vertical"
    );
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Divider, { attachTo: document.body });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95StatusBar", () => {
  it("renders fields", () => {
    const wrapper = mount({
      components: { StatusBar, StatusBarField },
      template: `
        <StatusBar>
          <StatusBarField>Ready</StatusBarField>
          <StatusBarField>CPU 14%</StatusBarField>
        </StatusBar>
      `,
    });
    expect(wrapper.text()).toContain("Ready");
    expect(wrapper.text()).toContain("CPU 14%");
    expect(wrapper.find('[role="status"]').exists()).toBe(true);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount({
      components: { StatusBar, StatusBarField },
      template: `
        <main>
          <StatusBar>
            <StatusBarField>Ready</StatusBarField>
          </StatusBar>
        </main>
      `,
      attachTo: document.body,
    });
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});

describe("W95FieldRow", () => {
  it("renders slot content", () => {
    const wrapper = mount(FieldRow, { slots: { default: "row" } });
    expect(wrapper.text()).toBe("row");
  });

  it("supports stacked layout class", () => {
    const wrapper = mount(FieldRow, {
      props: { stacked: true },
      slots: { default: "x" },
    });
    expect(wrapper.classes().join(" ")).toContain("flex-col");
  });
});
