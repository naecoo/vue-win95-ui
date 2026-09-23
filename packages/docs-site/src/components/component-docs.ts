/**
 * Rich component documentation data (zh + en).
 * Used by AllComponents detail modal.
 */
export interface PropDoc {
  name: string;
  desc: { zh: string; en: string };
  type: string;
  def: string;
}
export interface EventDoc {
  name: string;
  desc: { zh: string; en: string };
  params: string;
}
export interface SlotDoc {
  name: string;
  desc: { zh: string; en: string };
}
export interface DemoDoc {
  title: { zh: string; en: string };
  code: string;
  /** optional live sample props */
  live?: { comp: string; props?: Record<string, unknown>; text?: string };
}
export interface ComponentDoc {
  name: string;
  group: string;
  title: { zh: string; en: string };
  desc: { zh: string; en: string };
  when: { zh: string[]; en: string[] };
  demos: DemoDoc[];
  props: PropDoc[];
  events: EventDoc[];
  slots: SlotDoc[];
  a11y?: { zh: string; en: string };
}

const t = (zh: string, en: string) => ({ zh, en });

export const docs: ComponentDoc[] = [
  {
    name: "W95Button",
    group: "basics",
    title: t("Button 按钮", "Button"),
    desc: t(
      "触发命令或操作的标准按钮，还原 Win95 凸起／按下边框。",
      "Standard command button with authentic Win95 raised/sunken borders."
    ),
    when: {
      zh: ["提交表单、确认操作", "对话框中的 OK / Cancel", "工具栏命令"],
      en: ["Submit forms or run commands", "OK / Cancel in dialogs", "Toolbar actions"],
    },
    demos: [
      {
        title: t("按钮类型", "Variants"),
        code: `<W95Button>Normal</W95Button>
<W95Button default>Default</W95Button>
<W95Button disabled>Disabled</W95Button>
<W95Button block>Block</W95Button>`,
        live: { comp: "W95Button", text: "Default" },
      },
      {
        title: t("表单按钮", "Form buttons"),
        code: `<W95Button type="submit">Submit</W95Button>
<W95Button type="reset">Reset</W95Button>`,
      },
    ],
    props: [
      { name: "type", desc: t("原生 button 类型", "Native button type"), type: "'button' | 'submit' | 'reset'", def: "'button'" },
      { name: "default", desc: t("默认按钮（加粗描边）", "Default button with thicker border"), type: "boolean", def: "false" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "block", desc: t("宽度撑满父级", "Full width"), type: "boolean", def: "false" },
      { name: "class", desc: t("附加类名", "Extra class"), type: "string", def: "—" },
    ],
    events: [
      { name: "click", desc: t("点击时触发（禁用时不触发）", "Fires on click when not disabled"), params: "MouseEvent" },
    ],
    slots: [{ name: "default", desc: t("按钮内容", "Button content") }],
    a11y: t(
      "使用语义化 <button>；焦点为 Win95 点状描边。",
      "Uses semantic <button>; dotted Win95 focus ring."
    ),
  },
  {
    name: "W95Input",
    group: "basics",
    title: t("Input 输入框", "Input"),
    desc: t("单行文本输入，field 边框，label 自动关联。", "Single-line text field with field border and wired label."),
    when: {
      zh: ["姓名、标题等短文本", "表单字段", "搜索、密码（配合 type）"],
      en: ["Short text fields", "Form controls", "Search / password via type"],
    },
    demos: [
      {
        title: t("基础用法", "Basic"),
        code: `<W95Input v-model="name" label="Name" />
<W95Input type="password" label="Password" />
<W95Input model-value="Readonly" readonly label="RO" />
<W95Input model-value="Off" disabled label="Disabled" />`,
        live: { comp: "W95Input", props: { label: "Name", modelValue: "Win95" } },
      },
    ],
    props: [
      { name: "modelValue", desc: t("绑定值", "Bound value"), type: "string", def: "—" },
      { name: "type", desc: t("输入类型", "Input type"), type: "'text'|'password'|'email'|'number'|'search'|'tel'|'url'", def: "'text'" },
      { name: "label", desc: t("左侧标签", "Side label"), type: "string", def: "''" },
      { name: "placeholder", desc: t("占位符", "Placeholder"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "readonly", desc: t("只读", "Read only"), type: "boolean", def: "false" },
      { name: "id", desc: t("输入框 id（供 label 关联）", "Input id for label"), type: "string", def: "auto" },
    ],
    events: [{ name: "update:modelValue", desc: t("值变化", "Value changed"), params: "string" }],
    slots: [],
    a11y: t("label 与 input 通过 for/id 关联。", "Label linked via for/id."),
  },
  {
    name: "W95Checkbox",
    group: "basics",
    title: t("Checkbox 复选框", "Checkbox"),
    desc: t("独立的开／关选择，可多选。", "Independent on/off choice; supports multi-select."),
    when: { zh: ["同意协议", "多选列表", "开关某项设置"], en: ["Agreements", "Multi-select lists", "Toggle settings"] },
    demos: [{ title: t("状态", "States"), code: `<W95Checkbox v-model="ok" label="Accept" />
<W95Checkbox :model-value="true" label="Checked" />
<W95Checkbox disabled label="Disabled" />`, live: { comp: "W95Checkbox", props: { label: "Accept terms", modelValue: true } } }],
    props: [
      { name: "modelValue", desc: t("是否选中", "Checked"), type: "boolean", def: "false" },
      { name: "label", desc: t("标签文本", "Label text"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "name", desc: t("原生 name", "Native name"), type: "string", def: "—" },
      { name: "value", desc: t("表单值", "Form value"), type: "string | number", def: "—" },
    ],
    events: [
      { name: "update:modelValue", desc: t("切换", "Toggled"), params: "boolean" },
      { name: "change", desc: t("变化", "Changed"), params: "boolean" },
    ],
    slots: [{ name: "default", desc: t("自定义标签内容", "Custom label content") }],
    a11y: t("原生 checkbox + label 关联。", "Native checkbox with associated label."),
  },
  {
    name: "W95Radio",
    group: "basics",
    title: t("Radio 单选", "Radio"),
    desc: t("互斥选项中的单项，通常与 RadioGroup 连用。", "One option in a mutually exclusive set; use with RadioGroup."),
    when: { zh: ["性别、优先级等单选", "向导中的互斥选择"], en: ["Single-choice fields", "Wizard exclusive choices"] },
    demos: [{ title: t("组合用法", "With group"), code: `<W95RadioGroup v-model="v" legend="Peanut butter">
  <W95Radio value="smooth" label="Smooth" />
  <W95Radio value="crunchy" label="Crunchy" />
</W95RadioGroup>` }],
    props: [
      { name: "value", desc: t("选项值（必填）", "Option value (required)"), type: "string | number | boolean", def: "—" },
      { name: "modelValue", desc: t("当前选中值（独立使用时）", "Selected value when standalone"), type: "string | number | boolean", def: "—" },
      { name: "label", desc: t("标签", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "name", desc: t("原生 name", "Native name"), type: "string", def: "group" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选中", "Selected"), params: "value" },
      { name: "change", desc: t("变化", "Changed"), params: "value" },
    ],
    slots: [{ name: "default", desc: t("自定义标签", "Custom label") }],
    a11y: t("原生 radio；组内用方向键切换。", "Native radio; arrow keys within group."),
  },
  {
    name: "W95RadioGroup",
    group: "basics",
    title: t("RadioGroup 单选组", "Radio Group"),
    desc: t("管理一组 Radio 的选中状态。", "Owns selection state for a set of radios."),
    demos: [{ title: t("分组", "Group"), code: `<W95RadioGroup v-model="v" legend="Mood" name="mood">
  <W95Radio value="ok" label="OK" />
  <W95Radio value="meh" label="Meh" />
</W95RadioGroup>` }],
    props: [
      { name: "modelValue", desc: t("选中值", "Selected value"), type: "string | number | boolean", def: "—" },
      { name: "legend", desc: t("fieldset 图例", "Fieldset legend"), type: "string", def: "''" },
      { name: "name", desc: t("组 name", "Group name"), type: "string", def: "auto" },
      { name: "disabled", desc: t("整组禁用", "Disable whole group"), type: "boolean", def: "false" },
    ],
    events: [{ name: "update:modelValue", desc: t("选中变化", "Selection changed"), params: "value" }],
    slots: [{ name: "default", desc: t("Radio 子项", "Child radios") }],
    a11y: t("role=radiogroup + fieldset/legend。", "role=radiogroup with fieldset/legend."),
  },
  {
    name: "W95Switch",
    group: "basics",
    title: t("Switch 开关", "Switch"),
    desc: t("立即生效的开／关切换。", "Immediate on/off toggle."),
    when: { zh: ["设置项即时生效", "显示／隐藏某功能"], en: ["Instant settings", "Feature toggles"] },
    demos: [{ title: t("开关", "Toggle"), code: `<W95Switch v-model="on" label="Sound" />
<W95Switch :model-value="true" label="Always on" />
<W95Switch disabled label="Disabled" />`, live: { comp: "W95Switch", props: { label: "Sound", modelValue: true } } }],
    props: [
      { name: "modelValue", desc: t("开关状态", "On/off state"), type: "boolean", def: "false" },
      { name: "label", desc: t("标签", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("切换", "Toggled"), params: "boolean" },
      { name: "change", desc: t("变化", "Changed"), params: "boolean" },
    ],
    slots: [],
    a11y: t("role=switch + aria-checked。", "role=switch with aria-checked."),
  },
  {
    name: "W95Avatar",
    group: "basics",
    title: t("Avatar 头像", "Avatar"),
    desc: t("用户或对象的图形标识，可显示图片或首字母。", "Image or initials marker for a user or object."),
    demos: [{ title: t("尺寸", "Sizes"), code: `<W95Avatar initials="W9" size="sm" />
<W95Avatar initials="W9" size="md" />
<W95Avatar src="/me.png" alt="Me" />`, live: { comp: "W95Avatar", props: { initials: "W9", size: "lg" } } }],
    props: [
      { name: "src", desc: t("图片地址", "Image URL"), type: "string", def: "—" },
      { name: "alt", desc: t("图片替代文本／title", "Alt / title text"), type: "string", def: "''" },
      { name: "initials", desc: t("无图时首字母", "Initials fallback"), type: "string", def: "'?'" },
      { name: "size", desc: t("尺寸", "Size"), type: "'sm' | 'md' | 'lg'", def: "'md'" },
    ],
    events: [], slots: [],
  },
  {
    name: "W95Icon",
    group: "basics",
    title: t("Icon 图标", "Icon"),
    desc: t("内置像素字形图标助手。", "Built-in pixel glyph helper."),
    demos: [{ title: t("图标", "Icons"), code: `<W95Icon name="folder" :size="24" label="Folder" />
<W95Icon name="warning" label="Warning" />`, live: { comp: "W95Icon", props: { name: "folder", size: 24, label: "Folder" } } }],
    props: [
      { name: "name", desc: t("图标名（folder/computer/help/warning/…）", "Icon name"), type: "string", def: "—" },
      { name: "size", desc: t("像素尺寸", "Pixel size"), type: "number", def: "16" },
      { name: "label", desc: t("可访问名称；缺省为装饰性", "Accessible name; decorative if empty"), type: "string", def: "''" },
    ],
    events: [], slots: [],
    a11y: t("无 label 时 aria-hidden=true。", "aria-hidden when no label."),
  },
  {
    name: "W95Link",
    group: "basics",
    title: t("Link 链接", "Link"),
    desc: t("语义化超链接，Win95 蓝色链接样式。", "Semantic anchor with Win95 link styling."),
    demos: [{ title: t("链接", "Link"), code: `<W95Link href="/help">Help</W95Link>
<W95Link disabled>Unavailable</W95Link>`, live: { comp: "W95Link", props: { href: "#" }, text: "Open help" } }],
    props: [
      { name: "href", desc: t("目标地址", "Target URL"), type: "string", def: "—" },
      { name: "disabled", desc: t("禁用（移除 href）", "Disabled (drops href)"), type: "boolean", def: "false" },
    ],
    events: [{ name: "click", desc: t("点击", "Click"), params: "MouseEvent" }],
    slots: [{ name: "default", desc: t("链接文字", "Link text") }],
  },
  {
    name: "W95Skeleton",
    group: "basics",
    title: t("Skeleton 骨架屏", "Skeleton"),
    desc: t("加载占位块。", "Loading placeholder bars."),
    demos: [{ title: t("占位", "Placeholder"), code: `<W95Skeleton :lines="3" />`, live: { comp: "W95Skeleton", props: { lines: 2 } } }],
    props: [
      { name: "lines", desc: t("行数", "Line count"), type: "number", def: "1" },
      { name: "width", desc: t("宽度", "Width"), type: "string | number", def: "'100%'" },
      { name: "height", desc: t("高度", "Height"), type: "string | number", def: "14" },
    ],
    events: [], slots: [],
    a11y: t("role=status + aria-busy。", "role=status with aria-busy."),
  },
  {
    name: "W95Select",
    group: "form",
    title: t("Select 下拉选择", "Select"),
    desc: t("原生 select 的 Win95 皮肤。", "Skinned native select."),
    when: { zh: ["选项较少（约 3–20）", "系统设置类表单"], en: ["Few options (3–20)", "System settings forms"] },
    demos: [{ title: t("下拉", "Select"), code: `<W95Select v-model="r" :options="opts" label="Rating" />`, live: { comp: "W95Select", props: { label: "Rating", options: [{ value: "3", label: "3 - Pretty good" }, { value: "5", label: "5 - Incredible" }] } } }],
    props: [
      { name: "modelValue", desc: t("选中值", "Selected value"), type: "string | number", def: "''" },
      { name: "options", desc: t("选项列表 {value,label,disabled?}", "Option list"), type: "W95SelectOption[]", def: "[]" },
      { name: "label", desc: t("标签", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选择变化", "Selection changed"), params: "string | number" },
      { name: "change", desc: t("变化", "Changed"), params: "string | number" },
    ],
    slots: [{ name: "default", desc: t("自定义 option", "Custom options") }],
    a11y: t("原生 select，键盘由浏览器处理。", "Native select keyboard support."),
  },
  {
    name: "W95Slider",
    group: "form",
    title: t("Slider 滑块", "Slider"),
    desc: t("在范围内取值的滑轨。", "Pick a value within a range."),
    when: { zh: ["音量、透明度等连续值", "无需精确数字输入"], en: ["Volume, opacity, ranges", "When exact typing is unnecessary"] },
    demos: [{ title: t("滑块", "Slider"), code: `<W95Slider v-model="vol" :min="1" :max="11" label="Volume" />`, live: { comp: "W95Slider", props: { label: "Volume", modelValue: 5, min: 1, max: 11 } } }],
    props: [
      { name: "modelValue", desc: t("当前值", "Current value"), type: "number", def: "0" },
      { name: "min", desc: t("最小值", "Min"), type: "number", def: "0" },
      { name: "max", desc: t("最大值", "Max"), type: "number", def: "100" },
      { name: "step", desc: t("步长", "Step"), type: "number", def: "1" },
      { name: "label", desc: t("标签", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("拖动中", "While dragging"), params: "number" },
      { name: "change", desc: t("松开／提交", "Committed"), params: "number" },
    ],
    slots: [],
    a11y: t("原生 range，支持方向键。", "Native range with arrow keys."),
  },
  {
    name: "W95SpinButton",
    group: "form",
    title: t("SpinButton 数值框", "Spin Button"),
    desc: t("带上下箭头的数字输入。", "Numeric input with spin buttons."),
    demos: [{ title: t("步进", "Stepper"), code: `<W95SpinButton v-model="n" :min="0" :max="10" label="Copies" />`, live: { comp: "W95SpinButton", props: { label: "Copies", modelValue: 2, min: 0, max: 10 } } }],
    props: [
      { name: "modelValue", desc: t("数值", "Value"), type: "number", def: "0" },
      { name: "min", desc: t("最小值", "Min"), type: "number", def: "0" },
      { name: "max", desc: t("最大值", "Max"), type: "number", def: "99" },
      { name: "step", desc: t("步长", "Step"), type: "number", def: "1" },
      { name: "label", desc: t("标签／可访问名", "Label / aria-label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("值变化", "Changed"), params: "number" },
      { name: "change", desc: t("提交变化", "Committed"), params: "number" },
    ],
    slots: [],
    a11y: t("role=spinbutton + ↑↓ 键。", "role=spinbutton with arrow keys."),
  },
  {
    name: "W95ComboBox",
    group: "form",
    title: t("ComboBox 组合框", "ComboBox"),
    desc: t("可输入过滤的下拉选择，也可远程搜索。", "Filterable dropdown; supports remote search."),
    when: { zh: ["选项多、需搜索", "远程补全"], en: ["Many options to filter", "Remote autocomplete"] },
    demos: [{ title: t("组合框", "ComboBox"), code: `<W95ComboBox v-model="d" :options="opts" label="Driver"
  :loading="loading" @search="onSearch" />` }],
    props: [
      { name: "modelValue", desc: t("选中值", "Selected value"), type: "string | number | null", def: "null" },
      { name: "options", desc: t("选项列表", "Options"), type: "{value,label,disabled?}[]", def: "[]" },
      { name: "loading", desc: t("加载中（远程搜索）", "Loading state for remote search"), type: "boolean", def: "false" },
      { name: "label", desc: t("标签", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选中", "Selected"), params: "value" },
      { name: "change", desc: t("变化", "Changed"), params: "value" },
      { name: "search", desc: t("输入过滤词（远程搜索）", "Filter query typed"), params: "string" },
    ],
    slots: [],
    a11y: t("combobox + listbox + option；↑↓ Enter Esc。", "combobox/listbox/option pattern."),
  },
  {
    name: "W95Upload",
    group: "form",
    title: t("Upload 上传", "Upload"),
    desc: t("选择文件并列出文件名。", "Pick files and list names."),
    demos: [{ title: t("上传", "Upload"), code: `<W95Upload v-model="files" multiple accept=".png,.jpg" label="Browse…" />` }],
    props: [
      { name: "modelValue", desc: t("文件列表 {name,size,file}", "File list"), type: "W95UploadFile[]", def: "[]" },
      { name: "multiple", desc: t("可多选", "Multiple files"), type: "boolean", def: "false" },
      { name: "accept", desc: t("接受的类型", "Accepted types"), type: "string", def: "—" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "label", desc: t("按钮文字", "Button label"), type: "string", def: "'Choose File…'" },
    ],
    events: [
      { name: "update:modelValue", desc: t("列表变化", "List changed"), params: "W95UploadFile[]" },
      { name: "change", desc: t("变化", "Changed"), params: "W95UploadFile[]" },
    ],
    slots: [],
  },
  {
    name: "W95DatePicker",
    group: "form",
    title: t("DatePicker 日期选择", "Date Picker"),
    desc: t("月历选择 ISO 日期。", "Month calendar picking ISO dates."),
    demos: [{ title: t("日期", "Date"), code: `<W95DatePicker v-model="date" label="Date" min="2024-06-10" max="2024-06-20" />`, live: { comp: "W95DatePicker", props: { label: "Date", modelValue: "2024-06-15" } } }],
    props: [
      { name: "modelValue", desc: t("日期字符串 YYYY-MM-DD", "ISO date string"), type: "string | null", def: "null" },
      { name: "min", desc: t("最早可选日期", "Earliest allowed date"), type: "string | null", def: "null" },
      { name: "max", desc: t("最晚可选日期", "Latest allowed date"), type: "string | null", def: "null" },
      { name: "label", desc: t("标签", "Label"), type: "string", def: "''" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选中日期", "Date selected"), params: "string | null" },
      { name: "change", desc: t("变化", "Changed"), params: "string | null" },
    ],
    slots: [],
    a11y: t("对话框日历；←→ 换月，Esc 关闭。", "Dialog calendar; Left/Right month, Esc closes."),
  },
  {
    name: "W95Window",
    group: "container",
    title: t("Window 窗口", "Window"),
    desc: t("Win95 窗口外壳：标题栏、控制钮、状态栏。", "Win95 window chrome: title bar, controls, status bar."),
    when: { zh: ["应用主界面", "工具面板", "模拟桌面窗口"], en: ["App main surface", "Tool panels", "Desktop windows"] },
    demos: [{ title: t("完整窗口", "Complete window"), code: `<W95Window title="Task Manager" :width="320">
  <p>Content</p>
  <template #status>
    <W95StatusBarField>CPU: 14%</W95StatusBarField>
  </template>
</W95Window>` }],
    props: [
      { name: "title", desc: t("标题栏文字", "Title bar text"), type: "string", def: "''" },
      { name: "active", desc: t("激活蓝标题栏，否则灰色", "Blue title bar when active"), type: "boolean", def: "true" },
      { name: "showMinimize", desc: t("显示最小化", "Show minimize"), type: "boolean", def: "true" },
      { name: "showMaximize", desc: t("显示最大化", "Show maximize"), type: "boolean", def: "true" },
      { name: "showClose", desc: t("显示关闭", "Show close"), type: "boolean", def: "true" },
      { name: "width", desc: t("宽度", "Width"), type: "number | string", def: "—" },
    ],
    events: [
      { name: "minimize", desc: t("最小化", "Minimize"), params: "—" },
      { name: "maximize", desc: t("最大化", "Maximize"), params: "—" },
      { name: "close", desc: t("关闭", "Close"), params: "—" },
    ],
    slots: [
      { name: "default", desc: t("窗体内容", "Body content") },
      { name: "status", desc: t("状态栏内容", "Status bar content") },
    ],
    a11y: t("控制钮使用 aria-label。", "Control buttons use aria-label."),
  },
  {
    name: "W95Dialog",
    group: "container",
    title: t("Dialog 对话框", "Dialog"),
    desc: t("模态对话框，含焦点陷阱与 Esc 关闭。", "Modal dialog with focus trap and Esc."),
    when: { zh: ["确认／警告", "短表单", "必须响应的操作"], en: ["Confirmations", "Short forms", "Must-respond actions"] },
    demos: [{ title: t("对话框", "Dialog"), code: `<W95Dialog v-model="open" title="Confirm" size="md" @confirm="open=false">
  <p>Delete this file?</p>
</W95Dialog>` }],
    props: [
      { name: "modelValue", desc: t("是否打开（必填）", "Open state (required)"), type: "boolean", def: "—" },
      { name: "title", desc: t("标题", "Title"), type: "string", def: "'Dialog'" },
      { name: "size", desc: t("预设宽度 sm/md/lg", "Preset width"), type: "'sm'|'md'|'lg'", def: "'md'" },
      { name: "width", desc: t("覆盖宽度", "Width override"), type: "number | string", def: "size 对应值" },
      { name: "showClose", desc: t("标题栏关闭钮", "Show close button"), type: "boolean", def: "true" },
      { name: "closeOnOverlay", desc: t("点击遮罩关闭", "Close on overlay click"), type: "boolean", def: "true" },
    ],
    events: [
      { name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" },
      { name: "confirm", desc: t("点击 OK", "OK clicked"), params: "—" },
      { name: "cancel", desc: t("点击 Cancel", "Cancel clicked"), params: "—" },
      { name: "close", desc: t("任意方式关闭", "Any close path"), params: "—" },
    ],
    slots: [
      { name: "default", desc: t("正文", "Body") },
      { name: "footer", desc: t("自定义底部按钮", "Custom footer buttons") },
    ],
    a11y: t("alertdialog + aria-modal + 焦点陷阱 + Esc。", "alertdialog, aria-modal, focus trap, Esc."),
  },
  {
    name: "W95Accordion",
    group: "container",
    title: t("Accordion 折叠面板", "Accordion"),
    desc: t("可折叠的分区列表。", "Collapsible sections."),
    demos: [{ title: t("折叠", "Accordion"), code: `<W95Accordion v-model="open">
  <W95AccordionItem value="a" title="General">…</W95AccordionItem>
</W95Accordion>` }],
    props: [{ name: "modelValue", desc: t("展开项 id；再点同一项可关闭", "Open item id"), type: "string | number | null", def: "null" }],
    events: [{ name: "update:modelValue", desc: t("展开变化", "Open state changed"), params: "id | null" }],
    slots: [{ name: "default", desc: t("AccordionItem 列表", "Accordion items") }],
    a11y: t("aria-expanded + region。", "aria-expanded with region."),
  },
  {
    name: "W95AccordionItem",
    group: "container",
    title: t("AccordionItem 折叠项", "Accordion Item"),
    desc: t("折叠面板中的单项。", "One section in an accordion."),
    props: [
      { name: "value", desc: t("唯一 id（必填）", "Unique id (required)"), type: "string | number", def: "—" },
      { name: "title", desc: t("标题文字", "Title text"), type: "string", def: "''" },
    ],
    events: [],
    slots: [
      { name: "default", desc: t("展开内容", "Expanded content") },
      { name: "title", desc: t("自定义标题", "Custom title") },
    ],
  },
  {
    name: "W95GroupBox",
    group: "container",
    title: t("GroupBox 分组框", "Group Box"),
    desc: t("带图例的凹凸边框分组。", "Group box with engraved border and legend."),
    props: [{ name: "legend", desc: t("图例文字", "Legend text"), type: "string", def: "''" }],
    events: [],
    slots: [{ name: "default", desc: t("分组内容", "Grouped content") }],
  },
  {
    name: "W95FieldRow",
    group: "container",
    title: t("FieldRow 字段行", "Field Row"),
    desc: t("标签与控件的水平／垂直布局。", "Row layout for label + control."),
    props: [{ name: "stacked", desc: t("标签在上（纵向）", "Label stacked above"), type: "boolean", def: "false" }],
    events: [],
    slots: [{ name: "default", desc: t("字段内容", "Field content") }],
  },
  {
    name: "W95StatusBar",
    group: "container",
    title: t("StatusBar 状态栏", "Status Bar"),
    desc: t("窗口底部状态栏容器。", "Status strip container."),
    props: [],
    events: [],
    slots: [{ name: "default", desc: t("StatusBarField 列表", "Status fields") }],
    a11y: t("role=status。", "role=status."),
  },
  {
    name: "W95StatusBarField",
    group: "container",
    title: t("StatusBarField 状态格", "Status Field"),
    desc: t("状态栏中的一格。", "One cell in a status bar."),
    props: [{ name: "grow", desc: t("是否拉伸占满", "Flex grow"), type: "boolean", def: "true" }],
    events: [],
    slots: [{ name: "default", desc: t("内容", "Content") }],
  },
  {
    name: "W95Divider",
    group: "container",
    title: t("Divider 分隔线", "Divider"),
    desc: t("水平／垂直分隔。", "Horizontal or vertical separator."),
    props: [{ name: "vertical", desc: t("垂直方向", "Vertical"), type: "boolean", def: "false" }],
    events: [], slots: [],
    a11y: t("role=separator。", "role=separator."),
  },
  {
    name: "W95Popover",
    group: "container",
    title: t("Popover 气泡面板", "Popover"),
    desc: t("挂在触发器上的面板，可含标题栏。", "Anchored panel with title bar."),
    demos: [{ title: t("气泡", "Popover"), code: `<W95Popover v-model="open" title="Tip" :width="240">
  <template #trigger>
    <W95Button @click="open=!open">Open</W95Button>
  </template>
  Content here
</W95Popover>` }],
    props: [
      { name: "modelValue", desc: t("是否打开", "Open state"), type: "boolean", def: "false" },
      { name: "title", desc: t("标题", "Title"), type: "string", def: "'Popover'" },
      { name: "width", desc: t("宽度", "Width"), type: "number | string", def: "240" },
    ],
    events: [{ name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" }],
    slots: [
      { name: "trigger", desc: t("触发器（scope: open）", "Trigger button"), },
      { name: "default", desc: t("面板内容", "Panel body") },
    ],
    a11y: t("role=dialog + 焦点陷阱 + Esc。", "role=dialog with focus trap and Esc."),
  },
  {
    name: "W95ResizablePanel",
    group: "container",
    title: t("ResizablePanel 可调宽面板", "Resizable Panel"),
    desc: t("右缘可拖拽／方向键调节宽度。", "Width adjustable via drag or arrow keys."),
    demos: [{ title: t("可调宽", "Resizable"), code: `<W95ResizablePanel :width="240" :min-width="120" :max-width="400">
  <div class="panel">Drag right edge</div>
</W95ResizablePanel>` }],
    props: [
      { name: "width", desc: t("初始宽度", "Initial width"), type: "number", def: "480" },
      { name: "minWidth", desc: t("最小宽", "Min width"), type: "number", def: "240" },
      { name: "maxWidth", desc: t("最大宽", "Max width"), type: "number", def: "900" },
    ],
    events: [{ name: "resize", desc: t("宽度变化", "Width changed"), params: "number" }],
    slots: [{ name: "default", desc: t("内容（scope: width）", "Content (scope: width)") }],
    a11y: t("separator + ←→ 调整。", "separator with arrow-key resize."),
  },
  {
    name: "W95Tabs",
    group: "nav",
    title: t("Tabs 标签页", "Tabs"),
    desc: t("同级内容切换。", "Switch between sibling panels."),
    when: { zh: ["设置分类", "详情分区"], en: ["Settings categories", "Detail sections"] },
    demos: [{ title: t("标签页", "Tabs"), code: `<W95Tabs v-model="tab">
  <W95TabList>
    <W95Tab value="a">Desktop</W95Tab>
    <W95Tab value="b">Computer</W95Tab>
  </W95TabList>
  <W95TabPanel value="a">Panel A</W95TabPanel>
  <W95TabPanel value="b">Panel B</W95TabPanel>
</W95Tabs>` }],
    props: [{ name: "modelValue", desc: t("当前 tab 值", "Active tab value"), type: "string | number", def: "—" }],
    events: [{ name: "update:modelValue", desc: t("切换", "Changed"), params: "value" }],
    slots: [{ name: "default", desc: t("TabList + TabPanel", "TabList + TabPanel") }],
    a11y: t("tablist/tab/tabpanel；←→ Home End。", "tablist pattern with arrow keys."),
  },
  {
    name: "W95TabList",
    group: "nav",
    title: t("TabList 标签栏", "Tab List"),
    props: [{ name: "multirow", desc: t("多行标签样式", "Multi-row tabs"), type: "boolean", def: "false" }],
    events: [], slots: [{ name: "default", desc: t("Tab 子项", "Tab items") }],
  },
  {
    name: "W95Tab",
    group: "nav",
    title: t("Tab 标签", "Tab"),
    props: [
      { name: "value", desc: t("唯一值（必填）", "Unique value (required)"), type: "string | number", def: "—" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [], slots: [{ name: "default", desc: t("标签文字", "Tab label") }],
  },
  {
    name: "W95TabPanel",
    group: "nav",
    title: t("TabPanel 面板", "Tab Panel"),
    props: [{ name: "value", desc: t("对应 Tab 的 value", "Matching tab value"), type: "string | number", def: "—" }],
    events: [], slots: [{ name: "default", desc: t("面板内容", "Panel content") }],
  },
  {
    name: "W95MenuBar",
    group: "nav",
    title: t("MenuBar 菜单栏", "Menu Bar"),
    desc: t("应用顶部命令菜单。", "Application command menus."),
    demos: [{ title: t("菜单栏", "Menu bar"), code: `<W95MenuBar>
  <W95MenuItem>File</W95MenuItem>
  <W95MenuSubmenu label="Export">…</W95MenuSubmenu>
</W95MenuBar>` }],
    props: [], events: [], slots: [{ name: "default", desc: t("MenuItem / MenuSubmenu", "Items / submenus") }],
    a11y: t("menubar + roving tabindex。", "menubar with roving tabindex."),
  },
  {
    name: "W95MenuItem",
    group: "nav",
    title: t("MenuItem 菜单项", "Menu Item"),
    props: [{ name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" }],
    events: [{ name: "click", desc: t("点击", "Click"), params: "—" }],
    slots: [{ name: "default", desc: t("菜单文字", "Label") }],
  },
  {
    name: "W95MenuList",
    group: "nav",
    title: t("MenuList 菜单列表", "Menu List"),
    desc: t("弹出菜单容器。", "Popup menu container."),
    props: [], events: [], slots: [{ name: "default", desc: t("菜单项", "Menu items") }],
  },
  {
    name: "W95MenuSubmenu",
    group: "nav",
    title: t("MenuSubmenu 子菜单", "Submenu"),
    desc: t("可展开的子菜单。", "Expandable submenu."),
    props: [
      { name: "label", desc: t("标题", "Label"), type: "string", def: "'More'" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [], slots: [{ name: "default", desc: t("子菜单项", "Child items") }],
    a11y: t("aria-haspopup + ←→ 展开收起。", "aria-haspopup with Left/Right."),
  },
  {
    name: "W95Toolbar",
    group: "nav",
    title: t("Toolbar 工具栏", "Toolbar"),
    desc: t("命令按钮工具条。", "Command button strip."),
    demos: [{ title: t("工具栏", "Toolbar"), code: `<W95Toolbar>
  <W95Button>New</W95Button>
  <W95Button>Open</W95Button>
</W95Toolbar>` }],
    props: [], events: [], slots: [{ name: "default", desc: t("按钮等控件", "Buttons and controls") }],
    a11y: t("role=toolbar + 方向键。", "role=toolbar with arrow keys."),
  },
  {
    name: "W95Tree",
    group: "nav",
    title: t("Tree 树", "Tree"),
    desc: t("层级列表，可展开折叠。", "Hierarchical list with expand/collapse."),
    demos: [{ title: t("树", "Tree"), code: `<W95Tree v-model="sel">
  <W95TreeItem value="css" label="CSS" has-children>
    <W95TreeItem value="sel" label="Selectors" />
  </W95TreeItem>
</W95Tree>` }],
    props: [{ name: "modelValue", desc: t("选中节点值", "Selected node value"), type: "string | number | null", def: "null" }],
    events: [{ name: "update:modelValue", desc: t("选中变化", "Selection changed"), params: "value" }],
    slots: [{ name: "default", desc: t("TreeItem 列表", "Tree items") }],
    a11y: t("tree/treeitem；typeahead、←→ 展开。", "tree pattern; typeahead and expand keys."),
  },
  {
    name: "W95TreeItem",
    group: "nav",
    title: t("TreeItem 树节点", "Tree Item"),
    props: [
      { name: "value", desc: t("节点值（必填）", "Node value (required)"), type: "string | number", def: "—" },
      { name: "label", desc: t("节点文字", "Node label"), type: "string", def: "''" },
      { name: "hasChildren", desc: t("可展开子节点", "Has children"), type: "boolean", def: "false" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [], slots: [{ name: "default", desc: t("子 TreeItem", "Child items") }],
  },
  {
    name: "W95Breadcrumb",
    group: "nav",
    title: t("Breadcrumb 面包屑", "Breadcrumb"),
    desc: t("层级路径导航。", "Hierarchical path trail."),
    demos: [{ title: t("面包屑", "Breadcrumb"), code: `<W95Breadcrumb :items="[
  { label: 'Desktop' },
  { label: 'PC' },
  { label: 'C:' },
]" />` }],
    props: [
      { name: "items", desc: t("节点 {label,href?,click?}", "Trail items"), type: "{label,href?,click?}[]", def: "[]" },
      { name: "separator", desc: t("分隔符", "Separator"), type: "string", def: "'>'" },
    ],
    events: [], slots: [],
    a11y: t("nav + 最后一项 aria-current=page。", "nav with aria-current on last."),
  },
  {
    name: "W95Pagination",
    group: "nav",
    title: t("Pagination 分页", "Pagination"),
    desc: t("表格／列表分页。", "Paged list navigation."),
    props: [
      { name: "modelValue", desc: t("当前页", "Current page"), type: "number", def: "1" },
      { name: "total", desc: t("总条数", "Total items"), type: "number", def: "0" },
      { name: "pageSize", desc: t("每页条数", "Page size"), type: "number", def: "10" },
    ],
    events: [{ name: "update:modelValue", desc: t("页码变化", "Page changed"), params: "number" }],
    slots: [],
  },
  {
    name: "W95Splitter",
    group: "nav",
    title: t("Splitter 分隔条", "Splitter"),
    desc: t("可拖拽调整相邻面板大小。", "Drag to resize adjacent panes."),
    demos: [{ title: t("分隔条", "Splitter"), code: `<div class="flex">
  <aside>Sidebar</aside>
  <W95Splitter vertical :min="80" :max="280" />
  <main>Content</main>
</div>` }],
    props: [
      { name: "vertical", desc: t("垂直分隔（左右拖）", "Vertical divider"), type: "boolean", def: "false" },
      { name: "min", desc: t("最小尺寸", "Min size"), type: "number", def: "80" },
      { name: "max", desc: t("最大尺寸", "Max size"), type: "number", def: "600" },
    ],
    events: [{ name: "resize", desc: t("尺寸变化", "Size changed"), params: "number" }],
    slots: [],
    a11y: t("separator + 方向键。", "separator with arrow keys."),
  },
  {
    name: "W95ContextMenu",
    group: "nav",
    title: t("ContextMenu 右键菜单", "Context Menu"),
    desc: t("指定坐标弹出的菜单。", "Menu popup at a point."),
    props: [
      { name: "modelValue", desc: t("是否打开", "Open state"), type: "boolean", def: "false" },
      { name: "x", desc: t("横坐标", "X position"), type: "number", def: "0" },
      { name: "y", desc: t("纵坐标", "Y position"), type: "number", def: "0" },
    ],
    events: [{ name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" }],
    slots: [{ name: "default", desc: t("菜单项", "Menu items") }],
  },
  {
    name: "W95ContextMenuArea",
    group: "nav",
    title: t("ContextMenuArea 右键热区", "Context Menu Area"),
    desc: t("包装内容，右键弹出菜单。", "Wraps content; right-click opens menu."),
    props: [{ name: "items", desc: t("菜单项 {label,disabled?,onClick?}", "Menu entries"), type: "W95MenuEntry[]", def: "[]" }],
    events: [], slots: [{ name: "default", desc: t("被包装内容", "Wrapped content") }],
  },
  {
    name: "W95Tooltip",
    group: "overlay",
    title: t("Tooltip 文字提示", "Tooltip"),
    desc: t("悬停／聚焦时的简短提示。", "Short hint on hover or focus."),
    demos: [{ title: t("提示", "Tooltip"), code: `<W95Tooltip content="Save file" placement="top">
  <W95Button>Save</W95Button>
</W95Tooltip>` }],
    props: [
      { name: "content", desc: t("提示文案", "Hint text"), type: "string", def: "''" },
      { name: "placement", desc: t("位置", "Placement"), type: "'top'|'bottom'|'left'|'right'", def: "'top'" },
      { name: "openDelay", desc: t("延迟 ms", "Delay ms"), type: "number", def: "200" },
    ],
    events: [], slots: [{ name: "default", desc: t("触发元素", "Trigger element") }],
    a11y: t("role=tooltip；焦点也可触发。", "role=tooltip; opens on focus too."),
  },
  {
    name: "W95Dropdown",
    group: "overlay",
    title: t("Dropdown 下拉菜单", "Dropdown"),
    desc: t("按钮触发的命令菜单。", "Button-triggered command menu."),
    demos: [{ title: t("下拉菜单", "Dropdown"), code: `<W95Dropdown v-model="open" label="File">
  <W95MenuItem>New</W95MenuItem>
  <W95MenuItem>Open…</W95MenuItem>
</W95Dropdown>` }],
    props: [
      { name: "modelValue", desc: t("菜单是否打开", "Menu open"), type: "boolean", def: "false" },
      { name: "label", desc: t("触发按钮文字", "Trigger label"), type: "string", def: "'Menu'" },
    ],
    events: [{ name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" }],
    slots: [{ name: "default", desc: t("菜单项", "Menu items") }],
    a11y: t("aria-haspopup=menu；↑↓ Esc。", "aria-haspopup=menu with keyboard."),
  },
  {
    name: "W95Toast",
    group: "overlay",
    title: t("Toast 轻提示", "Toast"),
    desc: t("自动消失的通知条。", "Auto-dismissing notices."),
    demos: [{ title: t("提示条", "Toast"), code: `<W95Toast v-model="toasts" :duration="3000" />
<!-- toasts: {id,title,message,duration?}[] -->` }],
    props: [
      { name: "modelValue", desc: t("通知列表", "Toast list"), type: "W95ToastItem[]", def: "[]" },
      { name: "duration", desc: t("自动关闭 ms；0 不关", "Auto dismiss ms; 0 keeps"), type: "number", def: "3000" },
    ],
    events: [{ name: "update:modelValue", desc: t("列表变化（含关闭）", "List changed"), params: "W95ToastItem[]" }],
    slots: [],
    a11y: t("aria-live=polite。", "aria-live=polite."),
  },
  {
    name: "W95Notification",
    group: "overlay",
    title: t("Notification 通知", "Notification"),
    desc: t("带类型图标的通知，可固定不自动关闭。", "Typed notices with optional sticky mode."),
    demos: [{ title: t("通知", "Notification"), code: `<W95Notification v-model="items" position="bottom-right" :duration="0" />` }],
    props: [
      { name: "modelValue", desc: t("通知列表", "Notice list"), type: "W95NotifyItem[]", def: "[]" },
      { name: "duration", desc: t("自动关闭 ms", "Auto dismiss ms"), type: "number", def: "3500" },
      { name: "position", desc: t("位置", "Position"), type: "'top-right'|'bottom-right'", def: "'bottom-right'" },
    ],
    events: [{ name: "update:modelValue", desc: t("列表变化", "List changed"), params: "W95NotifyItem[]" }],
    slots: [],
    a11y: t("aria-live=polite + 图标 label。", "aria-live=polite with icon labels."),
  },
  {
    name: "W95Table",
    group: "data",
    title: t("Table 表格", "Table"),
    desc: t("列表数据展示，支持排序、多选、键盘选择。", "Tabular data with sort, multi-select, keyboard."),
    when: { zh: ["文件列表", "驱动／设备清单", "简单数据表"], en: ["File lists", "Drivers / devices", "Simple data grids"] },
    demos: [{ title: t("表格", "Table"), code: `<W95Table
  v-model:selected-key="sel"
  :columns="[{key:'name',label:'Name',sortable:true}]"
  :rows="rows"
  :height="120"
  empty-text="No data"
/>` }],
    props: [
      { name: "columns", desc: t("列定义 {key,label,width?,sortable?}", "Column defs"), type: "W95TableColumn[]", def: "—" },
      { name: "rows", desc: t("行数据", "Row data"), type: "Record<string,unknown>[]", def: "[]" },
      { name: "rowKey", desc: t("行主键字段", "Row key field"), type: "string", def: "'id'" },
      { name: "selectedKey", desc: t("选中行 key", "Selected row key"), type: "string|number|null", def: "null" },
      { name: "multiple", desc: t("Ctrl 多选", "Ctrl multi-select"), type: "boolean", def: "false" },
      { name: "selectedKeys", desc: t("多选 keys", "Selected keys"), type: "(string|number)[]", def: "[]" },
      { name: "sortBy", desc: t("排序列 key", "Sort column"), type: "string", def: "—" },
      { name: "sortDir", desc: t("排序方向", "Sort direction"), type: "'asc'|'desc'", def: "'asc'" },
      { name: "emptyText", desc: t("空态文案", "Empty text"), type: "string", def: "'No data'" },
      { name: "height", desc: t("滚动高度", "Scroll height"), type: "number | string", def: "—" },
    ],
    events: [
      { name: "update:selectedKey", desc: t("选中变化", "Selection changed"), params: "key | null" },
      { name: "update:selectedKeys", desc: t("多选变化", "Multi-select changed"), params: "keys[]" },
      { name: "select", desc: t("点击行", "Row activated"), params: "row" },
      { name: "sort", desc: t("排序", "Sorted"), params: "key, 'asc'|'desc'" },
    ],
    slots: [],
    a11y: t("可聚焦；↑↓ 选择；aria-sort。", "Focusable; arrow-key select; aria-sort."),
  },
  {
    name: "W95ProgressBar",
    group: "data",
    title: t("ProgressBar 进度条", "Progress Bar"),
    desc: t("显示任务完成度。", "Shows task completion."),
    demos: [{ title: t("进度", "Progress"), code: `<W95ProgressBar :value="45" label="Install" />
<W95ProgressBar :value="45" segmented label="Seg" />`, live: { comp: "W95ProgressBar", props: { value: 45, label: "Install" } } }],
    props: [
      { name: "value", desc: t("当前值", "Current value"), type: "number", def: "0" },
      { name: "max", desc: t("最大值", "Max"), type: "number", def: "100" },
      { name: "segmented", desc: t("分段样式", "Segmented style"), type: "boolean", def: "false" },
      { name: "label", desc: t("aria-label", "aria-label"), type: "string", def: "'Progress'" },
    ],
    events: [], slots: [],
    a11y: t("role=progressbar + valuenow/min/max。", "role=progressbar with ARIA values."),
  },
];

export default docs;
