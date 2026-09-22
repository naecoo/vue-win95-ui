import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { useNotifier, notify } from "../../../composables/useNotifier";
import ContextMenu from "../../context-menu/ContextMenu.vue";
import MenuItem from "../../menu/MenuItem.vue";
import DatePicker from "../../date-picker/DatePicker.vue";
import Table from "../../table/Table.vue";

describe("useNotifier", () => {
  it("pushes and dismisses notifications", () => {
    const n = useNotifier();
    n.clear();
    const id = n.success("Done", "OK");
    expect(n.items.value).toHaveLength(1);
    expect(n.items.value[0]!.type).toBe("success");
    n.dismiss(id);
    expect(n.items.value).toHaveLength(0);
  });

  it("notify helper adds typed item", () => {
    const n = useNotifier();
    n.clear();
    notify({ message: "Hello", title: "T", type: "error", duration: 0 });
    expect(n.items.value[0]!.message).toBe("Hello");
  });
});

describe("W95ContextMenu", () => {
  it("renders menu items when open", () => {
    const wrapper = mount(
      {
        components: { ContextMenu, MenuItem },
        template: `
          <ContextMenu :model-value="true" :x="10" :y="20">
            <MenuItem>Copy</MenuItem>
            <MenuItem>Paste</MenuItem>
          </ContextMenu>
        `,
        attachTo: document.body,
      }
    );
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(2);
    expect(wrapper.find('[role="menu"]').attributes("style")).toContain("left: 10px");
    wrapper.unmount();
  });
});

describe("W95DatePicker min/max", () => {
  it("disables dates outside range", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: "2024-06-15",
        min: "2024-06-10",
        max: "2024-06-20",
      },
      attachTo: document.body,
    });
    await wrapper.find("button").trigger("click");
    const disabled = document.querySelectorAll("button[disabled]");
    expect(disabled.length).toBeGreaterThan(0);
    wrapper.unmount();
  });
});

describe("W95Table sort", () => {
  it("sorts rows by column", async () => {
    const columns = [
      { key: "name", label: "Name", sortable: true },
      { key: "n", label: "N", sortable: true },
    ];
    const rows = [
      { id: 1, name: "B", n: 2 },
      { id: 2, name: "A", n: 1 },
    ];
    const sortBy = ref<string | undefined>(undefined);
    const wrapper = mount(Table, {
      props: {
        columns,
        rows,
        sortBy: sortBy.value,
        sortDir: "asc",
        "onUpdate:sortBy": (k: string | undefined) => {
          sortBy.value = k;
        },
      },
      attachTo: document.body,
    });
    const btn = wrapper.findAll("th button")[0]!;
    await btn.trigger("click");
    const cells = wrapper.findAll("tbody td");
    // first data column of first row should be "A" after asc sort by name
    expect(cells[0]!.text()).toBe("A");
    wrapper.unmount();
  });
});
