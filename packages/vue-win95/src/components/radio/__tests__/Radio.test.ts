import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Radio from "../Radio.vue";
import RadioGroup from "../RadioGroup.vue";

describe("W95Radio", () => {
  it("renders label", () => {
    const wrapper = mount(Radio, {
      props: { value: "a", label: "Option A" },
    });
    expect(wrapper.find("label").text()).toBe("Option A");
  });

  it("emits update:modelValue on change", async () => {
    const wrapper = mount(Radio, {
      props: { modelValue: "b", value: "a", label: "A" },
    });
    await wrapper.find("input").setValue(true);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["a"]);
  });

  it("has no accessibility violations", async () => {
    const wrapper = mount(Radio, {
      props: { value: "x", label: "Yes", name: "g" },
      attachTo: document.body,
    });
    const results = await axe(wrapper.element.parentElement!);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("uses native radio input", () => {
    const wrapper = mount(Radio, { props: { value: 1, label: "1" } });
    expect(wrapper.find("input").attributes("type")).toBe("radio");
  });
});

describe("W95RadioGroup", () => {
  it("renders legend and radios", () => {
    const wrapper = mount({
      components: { RadioGroup, Radio },
      template: `
        <RadioGroup v-model="val" legend="Mood">
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>
      `,
      data: () => ({ val: "a" }),
    });
    expect(wrapper.find("legend").text()).toBe("Mood");
    expect(wrapper.findAll("input")).toHaveLength(2);
  });

  it("has radiogroup role and no a11y violations", async () => {
    const wrapper = mount({
      components: { RadioGroup, Radio },
      template: `
        <main>
          <RadioGroup v-model="val" legend="Mood" name="mood">
            <Radio value="a" label="A" />
            <Radio value="b" label="B" />
          </RadioGroup>
        </main>
      `,
      data: () => ({ val: "a" }),
      attachTo: document.body,
    });
    const group = wrapper.find('[role="radiogroup"]');
    expect(group.exists()).toBe(true);
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });

  it("updates group value when radio selected", async () => {
    const wrapper = mount({
      components: { RadioGroup, Radio },
      template: `
        <RadioGroup v-model="val" name="g">
          <Radio value="a" label="A" />
          <Radio value="b" label="B" />
        </RadioGroup>
      `,
      data: () => ({ val: "a" }),
    });
    const inputs = wrapper.findAll("input");
    await inputs[1]!.setValue(true);
    expect(wrapper.vm.val).toBe("b");
  });
});
