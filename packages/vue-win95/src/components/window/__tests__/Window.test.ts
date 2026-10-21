import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { axe } from "vitest-axe";
import { nextTick } from "vue";
import Window from "../Window.vue";
import Desktop from "../Desktop.vue";
import Taskbar from "../Taskbar.vue";
import TaskbarItem from "../TaskbarItem.vue";

describe("W95Window", () => {
  it("renders title and emits control events", async () => {
    const wrapper = mount(Window, {
      props: { title: "Untitled", floating: false },
      slots: { default: "body" },
      attachTo: document.body,
    });
    expect(wrapper.text()).toContain("Untitled");
    await wrapper.find('button[aria-label="Minimize"]').trigger("click");
    expect(wrapper.emitted("minimize")).toBeTruthy();
    await wrapper.find('button[aria-label="Maximize"]').trigger("click");
    expect(wrapper.emitted("maximize")).toBeTruthy();
    await wrapper.find('button[aria-label="Close"]').trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
    wrapper.unmount();
  });

  it("hides itself when minimized", async () => {
    const wrapper = mount(Window, {
      props: { title: "T", showMinimize: true },
      attachTo: document.body,
    });
    await wrapper.find('button[aria-label="Minimize"]').trigger("click");
    await nextTick();
    expect((wrapper.element as HTMLElement).style.display).toBe("none");
    wrapper.unmount();
  });

  it("maximizes to fill the desktop and restores", async () => {
    const wrapper = mount(
      {
        components: { Desktop, Window },
        template: `<Desktop><Window title="T" floating :width="200" :default-x="30" :default-y="20">x</Window></Desktop>`,
      },
      { attachTo: document.body }
    );
    const win = wrapper.findComponent(Window);
    const el = win.element as HTMLElement;
    expect(el.style.left).toBe("30px");
    await wrapper.find('button[aria-label="Maximize"]').trigger("click");
    await nextTick();
    expect(el.style.left).toBe("0px");
    expect(el.style.right).toBe("0px");
    await wrapper.find('button[aria-label="Restore"]').trigger("click");
    await nextTick();
    expect(el.style.left).toBe("30px");
    wrapper.unmount();
  });

  it("drags by the title bar when floating", async () => {
    const wrapper = mount(
      {
        components: { Desktop, Window },
        template: `<Desktop><Window title="T" floating :default-x="10" :default-y="10">x</Window></Desktop>`,
      },
      { attachTo: document.body }
    );
    const win = wrapper.findComponent(Window);
    const titlebar = wrapper.find("[data-window-titlebar]");
    const el = win.element as HTMLElement;

    await titlebar.trigger("pointerdown", { clientX: 100, clientY: 100, pointerId: 1 });
    await titlebar.trigger("pointermove", { clientX: 160, clientY: 140, pointerId: 1 });
    await titlebar.trigger("pointerup", { clientX: 160, clientY: 140, pointerId: 1 });

    expect(el.style.left).toBe("70px");
    expect(el.style.top).toBe("50px");
    expect(win.emitted("update:x")?.at(-1)).toEqual([70]);
    wrapper.unmount();
  });

  it("raises its layer on pointerdown", async () => {
    const wrapper = mount(
      {
        components: { Desktop, Window },
        template: `<Desktop>
          <Window title="A" floating>x</Window>
          <Window title="B" floating>y</Window>
        </Desktop>`,
      },
      { attachTo: document.body }
    );
    const windows = wrapper.findAllComponents(Window);
    await windows[1]!.trigger("pointerdown");
    await nextTick();
    const zA = Number((windows[0]!.element as HTMLElement).style.zIndex || 0);
    const zB = Number((windows[1]!.element as HTMLElement).style.zIndex || 0);
    expect(zB).toBeGreaterThan(zA);
    wrapper.unmount();
  });

  it("has no a11y violations", async () => {
    const wrapper = mount(
      {
        components: { Desktop, Window, Taskbar, TaskbarItem },
        template: `
          <Desktop>
            <Window title="Notepad" :floating="false">Hello</Window>
            <Taskbar><TaskbarItem title="Notepad" active /></Taskbar>
          </Desktop>
        `,
      },
      { attachTo: document.body }
    );
    const results = await axe(wrapper.element);
    expect(results.violations).toEqual([]);
    wrapper.unmount();
  });
});
