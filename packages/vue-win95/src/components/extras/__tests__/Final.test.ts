import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import MenuSubmenu from "../../menu/MenuSubmenu.vue";
import MenuItem from "../../menu/MenuItem.vue";
import Upload from "../../upload/Upload.vue";
import ResizablePanel from "../../window/ResizablePanel.vue";
import ComboBox from "../../combobox/ComboBox.vue";
import { nextZIndex, resetZIndex } from "../../../composables/useZIndex";
import { $, $$, cleanupOverlays } from "../../../test-utils/dom";

describe("W95MenuSubmenu", () => {
  it("expands submenu with aria", async () => {
    const wrapper = mount(
      {
        components: { MenuSubmenu, MenuItem },
        template: `
          <MenuSubmenu label="Open">
            <MenuItem>Recent</MenuItem>
          </MenuSubmenu>
        `,
        attachTo: document.body,
      }
    );
    const btn = wrapper.find("button");
    expect(btn.attributes("aria-haspopup")).toBe("menu");
    expect(btn.attributes("aria-expanded")).toBe("false");
    await btn.trigger("click");
    await new Promise((r) => setTimeout(r, 30));
    expect(btn.attributes("aria-expanded")).toBe("true");
    // 子菜单被 Teleport 到 body，断言查 document
    expect(document.querySelectorAll('[role="menu"] [role="menuitem"]')).toHaveLength(1);
  });
});

describe("W95Upload", () => {
  it("renders file button and accepts files", async () => {
    const files = ref<{ name: string; size: number; file: File }[]>([]);
    const wrapper = mount(Upload, {
      props: {
        modelValue: files.value,
        "onUpdate:modelValue": (v: { name: string; size: number; file: File }[]) => {
          files.value = v;
        },
      },
      attachTo: document.body,
    });
    const input = wrapper.find("input[type=file]");
    const file = new File(["x"], "a.txt", { type: "text/plain" });
    Object.defineProperty(input.element, "files", { value: [file] });
    await input.trigger("change");
    expect(files.value[0]!.name).toBe("a.txt");
  });
});

describe("W95ResizablePanel", () => {
  it("changes width with arrow keys", async () => {
    const wrapper = mount(ResizablePanel, {
      props: { width: 300, minWidth: 100, maxWidth: 500 },
      attachTo: document.body,
    });
    const sep = wrapper.find('[role="separator"]');
    await sep.trigger("keydown", { key: "ArrowRight" });
    expect(wrapper.find('[role="separator"]').attributes("aria-valuenow")).not.toBe(
      "300"
    );
  });
});

describe("ComboBox loading + search", () => {
  it("emits search and shows loading", async () => {
    const wrapper = mount(ComboBox, {
      props: {
        modelValue: null,
        options: [{ value: 1, label: "A" }],
        loading: true,
      },
      attachTo: document.body,
    });
    await wrapper.find("input").trigger("focus");
    await wrapper.vm.$nextTick();
    expect(document.body.textContent).toContain("Loading");
    await wrapper.find("input").setValue("a");
    expect(wrapper.emitted("search")?.[0]).toEqual(["a"]);
    wrapper.unmount();
  });
});

describe("useZIndex", () => {
  it("hands out increasing layers", () => {
    resetZIndex();
    const a = nextZIndex();
    const b = nextZIndex();
    expect(b).toBe(a + 1);
  });
});
