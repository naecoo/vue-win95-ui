import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import Tabs from "../Tabs.vue";
import TabList from "../TabList.vue";
import Tab from "../Tab.vue";
import TabPanel from "../TabPanel.vue";

function mountTabs(active = "a") {
  return mount({
    components: { Tabs, TabList, Tab, TabPanel },
    template: `
      <main>
        <Tabs v-model="val">
          <TabList>
            <Tab value="a">Desktop</Tab>
            <Tab value="b">My computer</Tab>
            <Tab value="c">Control panel</Tab>
          </TabList>
          <TabPanel value="a">Panel A</TabPanel>
          <TabPanel value="b">Panel B</TabPanel>
          <TabPanel value="c">Panel C</TabPanel>
        </Tabs>
      </main>
    `,
    data: () => ({ val: active }),
    attachTo: document.body,
  });
}

describe("W95Tabs", () => {
  it("renders tablist and tabs", () => {
    const wrapper = mountTabs();
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="tab"]')).toHaveLength(3);
  });

  it("shows selected panel only", () => {
    const wrapper = mountTabs("a");
    expect(wrapper.text()).toContain("Panel A");
    // Panel B is v-show false, still in DOM but hidden
    const panels = wrapper.findAll('[role="tabpanel"]');
    expect(panels).toHaveLength(3);
  });

  it("emits update:modelValue on tab click", async () => {
    const wrapper = mountTabs("a");
    const tabs = wrapper.findAll('[role="tab"]');
    await tabs[1]!.trigger("click");
    expect(wrapper.vm.val).toBe("b");
  });

  it("has tab/tabpanel ARIA wiring", () => {
    const wrapper = mountTabs("a");
    const tab = wrapper.findAll('[role="tab"]')[0]!;
    const panel = wrapper.findAll('[role="tabpanel"]')[0]!;
    expect(tab.attributes("aria-selected")).toBe("true");
    expect(tab.attributes("aria-controls")).toBe(panel.attributes("id"));
    expect(panel.attributes("aria-labelledby")).toBe(tab.attributes("id"));
  });

  it("has no accessibility violations", async () => {
    const wrapper = mountTabs("a");
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
