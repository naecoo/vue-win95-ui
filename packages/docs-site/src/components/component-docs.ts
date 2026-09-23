/**
 * Full component documentation (zh + en) for the detail modal.
 * Every entry has: desc, when-to-use, demos, props, events, slots, a11y.
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
const noSlot: SlotDoc[] = [];
const noEvent: EventDoc[] = [];
const noProp: PropDoc[] = [];

export const docs: ComponentDoc[] = [
  {
    name: "W95Button",
    group: "basics",
    title: t("Button 按钮", "Button"),
    desc: t("触发命令或操作的标准按钮，还原 Win95 凸起／按下边框。", "Standard command button with authentic Win95 raised/sunken borders."),
    when: { zh: ["提交表单、确认操作", "对话框中的 OK / Cancel", "工具栏命令"], en: ["Submit forms or run commands", "OK / Cancel in dialogs", "Toolbar actions"] },
    demos: [
      { title: t("按钮状态", "States"), code: `<W95Button>Normal</W95Button>\n<W95Button default>Default</W95Button>\n<W95Button disabled>Disabled</W95Button>`, live: { comp: "W95Button", text: "Default" } },
      { title: t("块级与表单类型", "Block and form types"), code: `<W95Button block>Block</W95Button>\n<W95Button type="submit">Submit</W95Button>\n<W95Button type="reset">Reset</W95Button>` },
    ],
    props: [
      { name: "type", desc: t("原生 button 类型", "Native button type"), type: "'button'|'submit'|'reset'", def: "'button'" },
      { name: "default", desc: t("默认按钮（加粗描边）", "Default button, thicker border"), type: "boolean", def: "false" },
      { name: "disabled", desc: t("禁用，不可点击", "Disabled, not clickable"), type: "boolean", def: "false" },
      { name: "block", desc: t("宽度撑满父容器", "Full-width block button"), type: "boolean", def: "false" },
    ],
    events: [{ name: "click", desc: t("点击时触发；禁用时不触发", "On click; skipped when disabled"), params: "MouseEvent" }],
    slots: [{ name: "default", desc: t("按钮文字或内容", "Button label or content") }],
    a11y: t("语义化 button；焦点为点状描边。", "Semantic button with dotted focus ring."),
  },
  {
    name: "W95Input",
    group: "basics",
    title: t("Input 输入框", "Input"),
    desc: t("单行文本输入框，Win95 field 边框，label 自动关联。", "Single-line text field with field border and wired label."),
    when: { zh: ["姓名、标题等短文本", "表单字段", "密码、邮箱等（配合 type）"], en: ["Short text fields", "Form fields", "Password/email via type"] },
    demos: [
      { title: t("基础输入", "Basic input"), code: `<W95Input v-model="name" label="Name" />\n<W95Input type="password" label="Password" />`, live: { comp: "W95Input", props: { label: "Name", modelValue: "Win95" } } },
      { title: t("只读与禁用", "Readonly and disabled"), code: `<W95Input model-value="Readonly" readonly label="RO" />\n<W95Input model-value="Off" disabled label="Disabled" />` },
    ],
    props: [
      { name: "modelValue", desc: t("绑定文本值", "Bound text value"), type: "string", def: "—" },
      { name: "type", desc: t("输入类型", "Input type"), type: "'text'|'password'|'email'|'number'|'search'|'tel'|'url'", def: "'text'" },
      { name: "label", desc: t("左侧标签文字", "Label on the left"), type: "string", def: "''" },
      { name: "placeholder", desc: t("占位提示", "Placeholder text"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用输入", "Disabled input"), type: "boolean", def: "false" },
      { name: "readonly", desc: t("只读，不可编辑", "Readonly, not editable"), type: "boolean", def: "false" },
      { name: "id", desc: t("输入框 id，供 label 关联", "Input id for label association"), type: "string", def: "auto" },
    ],
    events: [{ name: "update:modelValue", desc: t("内容变化时触发", "When text changes"), params: "string" }],
    slots: [],
    a11y: t("label 与 input 通过 for/id 关联。", "Label linked to input via for/id."),
  },
  {
    name: "W95Checkbox",
    group: "basics",
    title: t("Checkbox 复选框", "Checkbox"),
    desc: t("独立的开／关选择，支持多选组合。", "Independent on/off choice; combine for multi-select."),
    when: { zh: ["同意协议、记住设置", "多选列表项", "切换某项功能"], en: ["Agreements / remember me", "Multi-select lists", "Feature toggles"] },
    demos: [
      { title: t("复选状态", "Checkbox states"), code: `<W95Checkbox v-model="ok" label="Accept terms" />\n<W95Checkbox :model-value="true" label="Checked" />\n<W95Checkbox disabled label="Disabled" />`, live: { comp: "W95Checkbox", props: { label: "Accept terms", modelValue: true } } },
      { title: t("组合多选", "Checkbox group"), code: `<W95Checkbox v-model="a" label="Option A" />\n<W95Checkbox v-model="b" label="Option B" />` },
    ],
    props: [
      { name: "modelValue", desc: t("是否选中", "Checked state"), type: "boolean", def: "false" },
      { name: "label", desc: t("标签文字", "Label text"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "name", desc: t("原生 name，用于表单提交", "Native form name"), type: "string", def: "—" },
      { name: "value", desc: t("表单提交值", "Form submit value"), type: "string|number", def: "—" },
      { name: "id", desc: t("控件 id", "Control id"), type: "string", def: "auto" },
    ],
    events: [
      { name: "update:modelValue", desc: t("切换时触发", "On toggle"), params: "boolean" },
      { name: "change", desc: t("值变化时触发", "On change"), params: "boolean" },
    ],
    slots: [{ name: "default", desc: t("自定义标签内容", "Custom label content") }],
    a11y: t("原生 checkbox + label 关联，可键盘空格切换。", "Native checkbox with label; Space toggles."),
  },
  {
    name: "W95Radio",
    group: "basics",
    title: t("Radio 单选按钮", "Radio"),
    desc: t("互斥选项中的单项，通常放入 RadioGroup 使用。", "One choice in a mutually exclusive set; use inside RadioGroup."),
    when: { zh: ["性别、优先级等单选", "向导步骤中的互斥选项"], en: ["Single-choice fields", "Exclusive wizard options"] },
    demos: [
      { title: t("与分组连用", "With RadioGroup"), code: `<W95RadioGroup v-model="v" legend="Peanut butter">\n  <W95Radio value="smooth" label="Smooth" />\n  <W95Radio value="crunchy" label="Crunchy" />\n</W95RadioGroup>` },
    ],
    props: [
      { name: "value", desc: t("选项值，必填", "Option value, required"), type: "string|number|boolean", def: "—" },
      { name: "modelValue", desc: t("独立使用时的选中值", "Selected value when standalone"), type: "string|number|boolean", def: "—" },
      { name: "label", desc: t("标签文字", "Label text"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用该选项", "Disable this option"), type: "boolean", def: "false" },
      { name: "name", desc: t("原生 name；默认取组 name", "Native name; defaults to group"), type: "string", def: "group" },
      { name: "id", desc: t("控件 id", "Control id"), type: "string", def: "auto" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选中时触发", "On select"), params: "value" },
      { name: "change", desc: t("变化时触发", "On change"), params: "value" },
    ],
    slots: [{ name: "default", desc: t("自定义标签", "Custom label") }],
    a11y: t("原生 radio；同组内方向键切换。", "Native radio; arrow keys within group."),
  },
  {
    name: "W95RadioGroup",
    group: "basics",
    title: t("RadioGroup 单选组", "Radio Group"),
    desc: t("管理一组 Radio 的选中状态，带 fieldset 图例。", "Owns selection for radios, with fieldset legend."),
    when: { zh: ["一组互斥选项", "需要图例标题的单选区"], en: ["Exclusive option sets", "Labeled radio sections"] },
    demos: [
      { title: t("单选组", "Radio group"), code: `<W95RadioGroup v-model="v" legend="Mood" name="mood">\n  <W95Radio value="ok" label="OK" />\n  <W95Radio value="meh" label="Meh" />\n  <W95Radio value="no" label="No" disabled />\n</W95RadioGroup>` },
    ],
    props: [
      { name: "modelValue", desc: t("当前选中值", "Selected value"), type: "string|number|boolean", def: "—" },
      { name: "legend", desc: t("分组图例标题", "Group legend"), type: "string", def: "''" },
      { name: "name", desc: t("组 name", "Group name"), type: "string", def: "auto" },
      { name: "disabled", desc: t("整组禁用", "Disable whole group"), type: "boolean", def: "false" },
    ],
    events: [{ name: "update:modelValue", desc: t("选中变化", "Selection changed"), params: "value" }],
    slots: [{ name: "default", desc: t("Radio 子项", "Child Radio items") }],
    a11y: t("fieldset/legend + role=radiogroup。", "fieldset/legend with role=radiogroup."),
  },
  {
    name: "W95Switch",
    group: "basics",
    title: t("Switch 开关", "Switch"),
    desc: t("立即生效的开／关切换控件。", "Immediate on/off toggle control."),
    when: { zh: ["设置项即时生效", "显示／隐藏某功能", "不需要提交表单的开关"], en: ["Instant settings", "Show/hide features", "Non-submit toggles"] },
    demos: [
      { title: t("开关切换", "Toggle"), code: `<W95Switch v-model="on" label="Sound" />\n<W95Switch :model-value="true" label="Always on" />\n<W95Switch disabled label="Disabled" />`, live: { comp: "W95Switch", props: { label: "Sound", modelValue: true } } },
    ],
    props: [
      { name: "modelValue", desc: t("开关状态", "On/off state"), type: "boolean", def: "false" },
      { name: "label", desc: t("标签文字", "Label text"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "id", desc: t("控件 id", "Control id"), type: "string", def: "auto" },
    ],
    events: [
      { name: "update:modelValue", desc: t("切换时触发", "On toggle"), params: "boolean" },
      { name: "change", desc: t("变化时触发", "On change"), params: "boolean" },
    ],
    slots: [],
    a11y: t("role=switch + aria-checked。", "role=switch with aria-checked."),
  },
  {
    name: "W95Avatar",
    group: "basics",
    title: t("Avatar 头像", "Avatar"),
    desc: t("用户或对象标识，可显示图片或首字母缩写。", "User or object marker; image or initials."),
    when: { zh: ["用户列表头像", "联系人卡片", "无图时的首字母占位"], en: ["User lists", "Contact cards", "Initials placeholder"] },
    demos: [
      { title: t("尺寸与图片", "Sizes and image"), code: `<W95Avatar initials="W9" size="sm" />\n<W95Avatar initials="W9" size="md" />\n<W95Avatar initials="W9" size="lg" />\n<W95Avatar src="/me.png" alt="Me" />`, live: { comp: "W95Avatar", props: { initials: "W9", size: "lg" } } },
    ],
    props: [
      { name: "src", desc: t("图片地址", "Image URL"), type: "string", def: "—" },
      { name: "alt", desc: t("替代文本／悬浮提示", "Alt / title text"), type: "string", def: "''" },
      { name: "initials", desc: t("无图时显示的首字母", "Initials fallback"), type: "string", def: "'?'" },
      { name: "size", desc: t("尺寸 sm/md/lg", "Size sm/md/lg"), type: "'sm'|'md'|'lg'", def: "'md'" },
    ],
    events: [],
    slots: [],
  },
  {
    name: "W95Icon",
    group: "basics",
    title: t("Icon 图标", "Icon"),
    desc: t("内置像素字形图标，可选无障碍名称。", "Built-in pixel glyphs with optional accessible name."),
    when: { zh: ["工具栏图标", "列表状态图标", "装饰性图形"], en: ["Toolbar icons", "Status glyphs", "Decorative marks"] },
    demos: [
      { title: t("常用图标", "Common icons"), code: `<W95Icon name="folder" :size="24" label="Folder" />\n<W95Icon name="warning" label="Warning" />\n<W95Icon name="ok" :size="20" />`, live: { comp: "W95Icon", props: { name: "folder", size: 24, label: "Folder" } } },
    ],
    props: [
      { name: "name", desc: t("图标名 folder/computer/help/warning/error/ok/info/star/file 等", "Icon name"), type: "string", def: "—" },
      { name: "size", desc: t("像素尺寸", "Pixel size"), type: "number", def: "16" },
      { name: "label", desc: t("可访问名称；为空则装饰性隐藏", "Accessible name; empty marks decorative"), type: "string", def: "''" },
    ],
    events: [],
    slots: [],
    a11y: t("无 label 时 aria-hidden=true。", "aria-hidden when no label."),
  },
  {
    name: "W95Link",
    group: "basics",
    title: t("Link 链接", "Link"),
    desc: t("语义化超链接，Win95 蓝色链接样式。", "Semantic anchor with Win95 link styling."),
    when: { zh: ["页内跳转", "帮助文档链接", "外链"], en: ["In-page navigation", "Help links", "External URLs"] },
    demos: [
      { title: t("链接状态", "Link states"), code: `<W95Link href="/help">Open help</W95Link>\n<W95Link disabled>Unavailable</W95Link>`, live: { comp: "W95Link", props: { href: "#" }, text: "Open help" } },
    ],
    props: [
      { name: "href", desc: t("目标地址", "Target URL"), type: "string", def: "—" },
      { name: "disabled", desc: t("禁用，移除 href", "Disabled, drops href"), type: "boolean", def: "false" },
    ],
    events: [{ name: "click", desc: t("点击时触发", "On click"), params: "MouseEvent" }],
    slots: [{ name: "default", desc: t("链接文字", "Link text") }],
  },
  {
    name: "W95Skeleton",
    group: "basics",
    title: t("Skeleton 骨架屏", "Skeleton"),
    desc: t("加载时的内容占位条。", "Content placeholder while loading."),
    when: { zh: ["列表／卡片加载中", "异步数据占位"], en: ["Loading lists/cards", "Async placeholders"] },
    demos: [
      { title: t("占位行", "Placeholder lines"), code: `<W95Skeleton :lines="3" />\n<W95Skeleton :width="120" :height="40" />`, live: { comp: "W95Skeleton", props: { lines: 2 } } },
    ],
    props: [
      { name: "lines", desc: t("占位行数", "Number of bars"), type: "number", def: "1" },
      { name: "width", desc: t("每行宽度", "Bar width"), type: "string|number", def: "'100%'" },
      { name: "height", desc: t("每行高度", "Bar height"), type: "string|number", def: "14" },
    ],
    events: [],
    slots: [],
    a11y: t("role=status + aria-busy。", "role=status with aria-busy."),
  },
  {
    name: "W95Select",
    group: "form",
    title: t("Select 下拉选择", "Select"),
    desc: t("原生 select 的 Win95 皮肤，适合固定选项。", "Skinned native select for fixed options."),
    when: { zh: ["选项约 3–20 个", "系统设置类表单", "无需搜索的选择"], en: ["3–20 options", "Settings forms", "No search needed"] },
    demos: [
      { title: t("下拉选择", "Select"), code: `<W95Select v-model="r" :options="opts" label="Rating" />\n// opts: { value, label, disabled? }[]`, live: { comp: "W95Select", props: { label: "Rating", options: [{ value: "3", label: "3 - Pretty good" }, { value: "5", label: "5 - Incredible" }] } } },
    ],
    props: [
      { name: "modelValue", desc: t("选中值", "Selected value"), type: "string|number", def: "''" },
      { name: "options", desc: t("选项列表", "Option list"), type: "{value,label,disabled?}[]", def: "[]" },
      { name: "label", desc: t("标签文字", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选择变化", "Selection changed"), params: "string|number" },
      { name: "change", desc: t("变化时触发", "On change"), params: "string|number" },
    ],
    slots: [{ name: "default", desc: t("自定义 option 元素", "Custom option elements") }],
    a11y: t("原生 select，键盘由浏览器支持。", "Native select keyboard support."),
  },
  {
    name: "W95Slider",
    group: "form",
    title: t("Slider 滑块", "Slider"),
    desc: t("在连续范围内取值的滑轨。", "Pick a continuous value on a track."),
    when: { zh: ["音量、亮度等连续值", "不需要精确输入的范围"], en: ["Volume, brightness", "Ranges without exact typing"] },
    demos: [
      { title: t("滑块取值", "Slider value"), code: `<W95Slider v-model="vol" :min="1" :max="11" label="Volume" />`, live: { comp: "W95Slider", props: { label: "Volume", modelValue: 5, min: 1, max: 11 } } },
    ],
    props: [
      { name: "modelValue", desc: t("当前值", "Current value"), type: "number", def: "0" },
      { name: "min", desc: t("最小值", "Minimum"), type: "number", def: "0" },
      { name: "max", desc: t("最大值", "Maximum"), type: "number", def: "100" },
      { name: "step", desc: t("步长", "Step"), type: "number", def: "1" },
      { name: "label", desc: t("标签文字", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("拖动过程触发", "While dragging"), params: "number" },
      { name: "change", desc: t("松开提交时触发", "On commit"), params: "number" },
    ],
    slots: [],
    a11y: t("原生 range，支持方向键。", "Native range with arrow keys."),
  },
  {
    name: "W95SpinButton",
    group: "form",
    title: t("SpinButton 数值框", "Spin Button"),
    desc: t("带上下箭头的数字步进输入框。", "Numeric input with spin buttons."),
    when: { zh: ["份数、数量等小整数", "需要步进微调的数字"], en: ["Counts and quantities", "Small numeric adjustments"] },
    demos: [
      { title: t("步进输入", "Stepper"), code: `<W95SpinButton v-model="n" :min="0" :max="10" :step="1" label="Copies" />`, live: { comp: "W95SpinButton", props: { label: "Copies", modelValue: 2, min: 0, max: 10 } } },
    ],
    props: [
      { name: "modelValue", desc: t("当前数值", "Current value"), type: "number", def: "0" },
      { name: "min", desc: t("最小值", "Minimum"), type: "number", def: "0" },
      { name: "max", desc: t("最大值", "Maximum"), type: "number", def: "99" },
      { name: "step", desc: t("步长", "Step"), type: "number", def: "1" },
      { name: "label", desc: t("标签／可访问名", "Label / aria-label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("值变化", "Value changed"), params: "number" },
      { name: "change", desc: t("提交变化", "Committed change"), params: "number" },
    ],
    slots: [],
    a11y: t("role=spinbutton；↑↓ 与按钮均可步进。", "role=spinbutton; arrows and buttons."),
  },
  {
    name: "W95ComboBox",
    group: "form",
    title: t("ComboBox 组合框", "ComboBox"),
    desc: t("可输入过滤的下拉，支持远程搜索。", "Filterable dropdown with remote search."),
    when: { zh: ["选项多、需要搜索", "远程自动补全", "比 Select 更灵活"], en: ["Many options to filter", "Remote autocomplete", "Beyond plain Select"] },
    demos: [
      { title: t("过滤与远程", "Filter and remote"), code: `<W95ComboBox v-model="d" :options="opts" label="Driver"\n  :loading="loading" @search="q => load(q)" />` },
      { title: t("键盘操作", "Keyboard"), code: `↑↓ 选择 · Enter 确认 · Esc 关闭\nHome/End 首尾项` },
    ],
    props: [
      { name: "modelValue", desc: t("选中值", "Selected value"), type: "string|number|null", def: "null" },
      { name: "options", desc: t("选项列表", "Options"), type: "{value,label,disabled?}[]", def: "[]" },
      { name: "loading", desc: t("加载中，用于远程搜索", "Loading state for remote search"), type: "boolean", def: "false" },
      { name: "label", desc: t("标签文字", "Label"), type: "string", def: "''" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选中某项", "Option selected"), params: "value" },
      { name: "change", desc: t("值变化", "Value changed"), params: "value" },
      { name: "search", desc: t("输入过滤词", "Filter query typed"), params: "string" },
    ],
    slots: [],
    a11y: t("combobox + listbox + option；activedescendant。", "combobox pattern with activedescendant."),
  },
  {
    name: "W95Upload",
    group: "form",
    title: t("Upload 文件上传", "Upload"),
    desc: t("选择本地文件并列出文件名，可移除。", "Pick local files, list names, removable."),
    when: { zh: ["头像、附件上传", "简单文件收集", "配合自定义上传逻辑"], en: ["Avatars and attachments", "Simple file collection", "Custom upload flows"] },
    demos: [
      { title: t("选择文件", "Pick files"), code: `<W95Upload v-model="files" multiple accept=".png,.jpg" label="Browse…" />` },
    ],
    props: [
      { name: "modelValue", desc: t("文件列表 {name,size,file}", "File list"), type: "W95UploadFile[]", def: "[]" },
      { name: "multiple", desc: t("允许选择多个文件", "Allow multiple files"), type: "boolean", def: "false" },
      { name: "accept", desc: t("接受的文件类型", "Accepted file types"), type: "string", def: "—" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
      { name: "label", desc: t("按钮文字", "Button label"), type: "string", def: "'Choose File…'" },
    ],
    events: [
      { name: "update:modelValue", desc: t("列表变化（含移除）", "List changed"), params: "W95UploadFile[]" },
      { name: "change", desc: t("变化时触发", "On change"), params: "W95UploadFile[]" },
    ],
    slots: [],
    a11y: t("原生 file input + 可访问移除按钮。", "Native file input with labeled remove buttons."),
  },
  {
    name: "W95DatePicker",
    group: "form",
    title: t("DatePicker 日期选择", "Date Picker"),
    desc: t("月历对话框选择 ISO 日期，支持范围限制。", "Month calendar for ISO dates with min/max."),
    when: { zh: ["生日、截止日期", "需要日历可视选择", "限定日期范围"], en: ["Birthdays, deadlines", "Visual calendar picking", "Constrained date ranges"] },
    demos: [
      { title: t("选择日期", "Pick a date"), code: `<W95DatePicker v-model="date" label="Date"\n  min="2024-06-10" max="2024-06-20" />`, live: { comp: "W95DatePicker", props: { label: "Date", modelValue: "2024-06-15" } } },
    ],
    props: [
      { name: "modelValue", desc: t("日期字符串 YYYY-MM-DD", "ISO date string"), type: "string|null", def: "null" },
      { name: "min", desc: t("最早可选日期", "Earliest allowed date"), type: "string|null", def: "null" },
      { name: "max", desc: t("最晚可选日期", "Latest allowed date"), type: "string|null", def: "null" },
      { name: "label", desc: t("标签文字", "Label"), type: "string", def: "''" },
    ],
    events: [
      { name: "update:modelValue", desc: t("选中日期", "Date selected"), params: "string|null" },
      { name: "change", desc: t("变化时触发", "On change"), params: "string|null" },
    ],
    slots: [],
    a11y: t("日历对话框；←→ 换月，Esc 关闭。", "Dialog calendar; Left/Right month, Esc close."),
  },
  {
    name: "W95Window",
    group: "container",
    title: t("Window 窗口", "Window"),
    desc: t("Win95 窗口外壳：标题栏、控制按钮、状态栏。", "Win95 window chrome: title bar, controls, status bar."),
    when: { zh: ["应用主界面", "工具面板", "桌面窗口模拟"], en: ["App surfaces", "Tool panels", "Desktop windows"] },
    demos: [
      { title: t("完整窗口", "Complete window"), code: `<W95Window title="Task Manager" :width="320">\n  <p>Content</p>\n  <template #status>\n    <W95StatusBarField>CPU: 14%</W95StatusBarField>\n  </template>\n</W95Window>` },
    ],
    props: [
      { name: "title", desc: t("标题栏文字", "Title bar text"), type: "string", def: "''" },
      { name: "active", desc: t("激活蓝标题，失焦为灰", "Active blue title, gray when not"), type: "boolean", def: "true" },
      { name: "showMinimize", desc: t("显示最小化按钮", "Show minimize"), type: "boolean", def: "true" },
      { name: "showMaximize", desc: t("显示最大化按钮", "Show maximize"), type: "boolean", def: "true" },
      { name: "showClose", desc: t("显示关闭按钮", "Show close"), type: "boolean", def: "true" },
      { name: "width", desc: t("窗口宽度", "Window width"), type: "number|string", def: "—" },
    ],
    events: [
      { name: "minimize", desc: t("点击最小化", "Minimize clicked"), params: "—" },
      { name: "maximize", desc: t("点击最大化", "Maximize clicked"), params: "—" },
      { name: "close", desc: t("点击关闭", "Close clicked"), params: "—" },
    ],
    slots: [
      { name: "default", desc: t("窗体内容", "Body content") },
      { name: "status", desc: t("底部状态栏", "Status bar") },
    ],
    a11y: t("控制按钮使用 aria-label。", "Control buttons use aria-label."),
  },
  {
    name: "W95Dialog",
    group: "container",
    title: t("Dialog 对话框", "Dialog"),
    desc: t("模态对话框，焦点陷阱、Esc 关闭。", "Modal dialog with focus trap and Esc."),
    when: { zh: ["确认／警告", "短表单", "必须响应的操作"], en: ["Confirmations", "Short forms", "Must-respond actions"] },
    demos: [
      { title: t("打开对话框", "Open dialog"), code: `<W95Dialog v-model="open" title="Confirm" size="md"\n  @confirm="onOk" @cancel="onCancel">\n  <p>Delete this file?</p>\n</W95Dialog>` },
    ],
    props: [
      { name: "modelValue", desc: t("是否打开，必填", "Open state, required"), type: "boolean", def: "—" },
      { name: "title", desc: t("标题文字", "Title"), type: "string", def: "'Dialog'" },
      { name: "size", desc: t("预设宽度 sm=360 / md=480 / lg=640", "Preset width"), type: "'sm'|'md'|'lg'", def: "'md'" },
      { name: "width", desc: t("覆盖宽度", "Width override"), type: "number|string", def: "size 对应值" },
      { name: "showClose", desc: t("标题栏关闭按钮", "Show close button"), type: "boolean", def: "true" },
      { name: "closeOnOverlay", desc: t("点击遮罩关闭", "Close on overlay click"), type: "boolean", def: "true" },
    ],
    events: [
      { name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" },
      { name: "confirm", desc: t("点击 OK", "OK clicked"), params: "—" },
      { name: "cancel", desc: t("点击 Cancel", "Cancel clicked"), params: "—" },
      { name: "close", desc: t("任意方式关闭", "Any close path"), params: "—" },
    ],
    slots: [
      { name: "default", desc: t("正文内容", "Body content") },
      { name: "footer", desc: t("自定义底部按钮", "Custom footer") },
    ],
    a11y: t("alertdialog + aria-modal + 焦点陷阱 + Esc。", "alertdialog, aria-modal, focus trap, Esc."),
  },
  {
    name: "W95Accordion",
    group: "container",
    title: t("Accordion 折叠面板", "Accordion"),
    desc: t("可折叠分区列表，一次可展开多项。", "Collapsible sections list."),
    when: { zh: ["设置分组", "FAQ、长表单分区", "节省纵向空间"], en: ["Settings groups", "FAQ / long forms", "Save vertical space"] },
    demos: [
      { title: t("折叠面板", "Accordion"), code: `<W95Accordion v-model="open">\n  <W95AccordionItem value="a" title="General">…</W95AccordionItem>\n  <W95AccordionItem value="b" title="Appearance">…</W95AccordionItem>\n</W95Accordion>` },
    ],
    props: [{ name: "modelValue", desc: t("展开项 id；再点同一项可关闭", "Open item id; toggle closes"), type: "string|number|null", def: "null" }],
    events: [{ name: "update:modelValue", desc: t("展开变化", "Open state changed"), params: "id|null" }],
    slots: [{ name: "default", desc: t("AccordionItem 列表", "Accordion items") }],
    a11y: t("标题按钮 aria-expanded + 内容 region。", "Trigger aria-expanded with content region."),
  },
  {
    name: "W95AccordionItem",
    group: "container",
    title: t("AccordionItem 折叠项", "Accordion Item"),
    desc: t("折叠面板中的单项：标题栏 + 展开内容。", "One section: trigger title and expanded body."),
    when: { zh: ["作为 Accordion 子项", "可独立标题与内容"], en: ["Inside Accordion", "Title + expandable body"] },
    demos: [
      { title: t("折叠项", "Item"), code: `<W95AccordionItem value="gen" title="General">\n  系统设置内容\n</W95AccordionItem>` },
    ],
    props: [
      { name: "value", desc: t("唯一 id，必填", "Unique id, required"), type: "string|number", def: "—" },
      { name: "title", desc: t("标题文字", "Title text"), type: "string", def: "''" },
    ],
    events: [],
    slots: [
      { name: "default", desc: t("展开内容", "Expanded body") },
      { name: "title", desc: t("自定义标题", "Custom title") },
    ],
  },
  {
    name: "W95GroupBox",
    group: "container",
    title: t("GroupBox 分组框", "Group Box"),
    desc: t("带图例的凹凸边框分组区域。", "Engraved group box with legend."),
    when: { zh: ["表单分组", "相关控件归类"], en: ["Form groups", "Related controls"] },
    demos: [
      { title: t("分组框", "Group box"), code: `<W95GroupBox legend="Options">\n  <W95Checkbox label="Remember me" />\n</W95GroupBox>` },
    ],
    props: [{ name: "legend", desc: t("图例标题", "Legend title"), type: "string", def: "''" }],
    events: [],
    slots: [{ name: "default", desc: t("分组内控件", "Grouped controls") }],
  },
  {
    name: "W95FieldRow",
    group: "container",
    title: t("FieldRow 字段行", "Field Row"),
    desc: t("标签与控件的布局行，支持横向或堆叠。", "Layout row for label + control."),
    when: { zh: ["表单 label + control", "需要统一间距"], en: ["Label + control rows", "Consistent spacing"] },
    demos: [
      { title: t("横向与堆叠", "Inline and stacked"), code: `<W95FieldRow>\n  <W95Input label="Name" />\n</W95FieldRow>\n<W95FieldRow stacked>\n  <span>Label</span>\n  <W95Input />\n</W95FieldRow>` },
    ],
    props: [{ name: "stacked", desc: t("标签在上（纵向排列）", "Label stacked above"), type: "boolean", def: "false" }],
    events: [],
    slots: [{ name: "default", desc: t("字段内容", "Field content") }],
  },
  {
    name: "W95StatusBar",
    group: "container",
    title: t("StatusBar 状态栏", "Status Bar"),
    desc: t("窗口底部状态信息条容器。", "Window status strip container."),
    when: { zh: ["窗口底部状态", "多格信息展示"], en: ["Window footer status", "Multi-cell info"] },
    demos: [
      { title: t("状态栏", "Status bar"), code: `<W95StatusBar>\n  <W95StatusBarField>Ready</W95StatusBarField>\n  <W95StatusBarField>CPU: 14%</W95StatusBarField>\n</W95StatusBar>` },
    ],
    props: [],
    events: [],
    slots: [{ name: "default", desc: t("StatusBarField 列表", "Status fields") }],
    a11y: t("role=status。", "role=status."),
  },
  {
    name: "W95StatusBarField",
    group: "container",
    title: t("StatusBarField 状态格", "Status Field"),
    desc: t("状态栏中的一格，可拉伸占满。", "One status cell; flex grow optional."),
    when: { zh: ["状态栏分区", "显示快捷键提示、进度"], en: ["Status sections", "Hints and progress text"] },
    demos: [
      { title: t("状态格", "Field"), code: `<W95StatusBarField>F1 Help</W95StatusBarField>\n<W95StatusBarField :grow="false">Ln 1</W95StatusBarField>` },
    ],
    props: [{ name: "grow", desc: t("是否拉伸占满剩余宽度", "Flex grow to fill"), type: "boolean", def: "true" }],
    events: [],
    slots: [{ name: "default", desc: t("显示内容", "Content") }],
  },
  {
    name: "W95Divider",
    group: "container",
    title: t("Divider 分隔线", "Divider"),
    desc: t("水平或垂直分隔线。", "Horizontal or vertical separator line."),
    when: { zh: ["工具栏分组", "表单区块分隔"], en: ["Toolbar groups", "Form section breaks"] },
    demos: [
      { title: t("分隔线", "Divider"), code: `<W95Divider />\n<div class="flex gap-2">\n  <W95Button>A</W95Button>\n  <W95Divider vertical />\n  <W95Button>B</W95Button>\n</div>` },
    ],
    props: [{ name: "vertical", desc: t("垂直方向", "Vertical orientation"), type: "boolean", def: "false" }],
    events: [],
    slots: [],
    a11y: t("role=separator。", "role=separator."),
  },
  {
    name: "W95Popover",
    group: "container",
    title: t("Popover 气泡面板", "Popover"),
    desc: t("挂在触发器上的面板，可含标题栏与关闭钮。", "Anchored panel with optional title bar."),
    when: { zh: ["操作说明、快捷菜单", "编辑小面板", "确认轻量操作"], en: ["Hints and mini menus", "Edit panels", "Light confirmations"] },
    demos: [
      { title: t("气泡面板", "Popover"), code: `<W95Popover v-model="open" title="Tip" :width="240">\n  <template #trigger>\n    <W95Button @click="open=!open">Open</W95Button>\n  </template>\n  Content here\n</W95Popover>` },
    ],
    props: [
      { name: "modelValue", desc: t("是否打开", "Open state"), type: "boolean", def: "false" },
      { name: "title", desc: t("标题栏文字", "Title text"), type: "string", def: "'Popover'" },
      { name: "width", desc: t("面板宽度", "Panel width"), type: "number|string", def: "240" },
    ],
    events: [{ name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" }],
    slots: [
      { name: "trigger", desc: t("触发器插槽（scope.open）", "Trigger slot (scope.open)") },
      { name: "default", desc: t("面板内容", "Panel body") },
    ],
    a11y: t("role=dialog + 焦点陷阱 + Esc。", "role=dialog with focus trap and Esc."),
  },
  {
    name: "W95ResizablePanel",
    group: "container",
    title: t("ResizablePanel 可调宽面板", "Resizable Panel"),
    desc: t("右缘可拖拽或方向键调节宽度。", "Width adjustable by drag or arrow keys."),
    when: { zh: ["侧栏、分栏布局", "用户可调宽度"], en: ["Sidebars and split layouts", "User-adjustable width"] },
    demos: [
      { title: t("可调宽面板", "Resizable"), code: `<W95ResizablePanel :width="240" :min-width="120" :max-width="400">\n  <template #default="{ width }">\n    <div class="panel">Width: {{ width }}</div>\n  </template>\n</W95ResizablePanel>` },
    ],
    props: [
      { name: "width", desc: t("初始宽度", "Initial width"), type: "number", def: "480" },
      { name: "minWidth", desc: t("最小宽度", "Min width"), type: "number", def: "240" },
      { name: "maxWidth", desc: t("最大宽度", "Max width"), type: "number", def: "900" },
    ],
    events: [{ name: "resize", desc: t("宽度变化时触发", "On resize"), params: "number" }],
    slots: [{ name: "default", desc: t("内容，scope.width 为当前宽", "Content; scope.width") }],
    a11y: t("separator + ←→ 调整宽度。", "separator with arrow-key resize."),
  },
  {
    name: "W95Tabs",
    group: "nav",
    title: t("Tabs 标签页", "Tabs"),
    desc: t("同级内容切换容器。", "Switch between sibling panels."),
    when: { zh: ["设置分类", "详情分区", "向导步骤切换"], en: ["Settings categories", "Detail sections", "Wizard steps"] },
    demos: [
      { title: t("标签页", "Tabs"), code: `<W95Tabs v-model="tab">\n  <W95TabList>\n    <W95Tab value="a">Desktop</W95Tab>\n    <W95Tab value="b">Computer</W95Tab>\n  </W95TabList>\n  <W95TabPanel value="a">Panel A</W95TabPanel>\n  <W95TabPanel value="b">Panel B</W95TabPanel>\n</W95Tabs>` },
    ],
    props: [{ name: "modelValue", desc: t("当前 tab 的 value", "Active tab value"), type: "string|number", def: "—" }],
    events: [{ name: "update:modelValue", desc: t("切换标签", "Tab changed"), params: "value" }],
    slots: [{ name: "default", desc: t("TabList 与 TabPanel", "TabList and TabPanel") }],
    a11y: t("tablist/tab/tabpanel；←→ Home End。", "tablist pattern with arrow keys."),
  },
  {
    name: "W95TabList",
    group: "nav",
    title: t("TabList 标签栏", "Tab List"),
    desc: t("容纳多个 Tab 的标签条。", "Row that holds tab buttons."),
    when: { zh: ["Tabs 的标签行", "需要多行标签时 multirow"], en: ["Tab row in Tabs", "multirow for many tabs"] },
    demos: [
      { title: t("标签栏", "Tab list"), code: `<W95TabList multirow>\n  <W95Tab value="a">A</W95Tab>\n  <W95Tab value="b">B</W95Tab>\n</W95TabList>` },
    ],
    props: [{ name: "multirow", desc: t("多行标签样式", "Multi-row layout"), type: "boolean", def: "false" }],
    events: [],
    slots: [{ name: "default", desc: t("W95Tab 子项", "W95Tab items") }],
    a11y: t("role=tablist，方向键切换焦点。", "role=tablist with arrow-key focus."),
  },
  {
    name: "W95Tab",
    group: "nav",
    title: t("Tab 标签", "Tab"),
    desc: t("单个标签按钮，对应一个面板。", "One tab button mapped to a panel."),
    when: { zh: ["TabList 中的单项", "需要禁用某页"], en: ["Items in TabList", "Disable a tab"] },
    demos: [
      { title: t("标签", "Tab"), code: `<W95Tab value="desktop">Desktop</W95Tab>\n<W95Tab value="x" disabled>Disabled</W95Tab>` },
    ],
    props: [
      { name: "value", desc: t("唯一值，必填", "Unique value, required"), type: "string|number", def: "—" },
      { name: "disabled", desc: t("禁用该标签", "Disable this tab"), type: "boolean", def: "false" },
    ],
    events: [],
    slots: [{ name: "default", desc: t("标签文字", "Tab label") }],
    a11y: t("role=tab + aria-selected。", "role=tab with aria-selected."),
  },
  {
    name: "W95TabPanel",
    group: "nav",
    title: t("TabPanel 面板", "Tab Panel"),
    desc: t("与 Tab 对应的内容面板。", "Content panel for a tab."),
    when: { zh: ["每个 Tab 的内容区", "仅显示当前 tab 的面板"], en: ["Content per tab", "Show active panel only"] },
    demos: [
      { title: t("面板", "Panel"), code: `<W95TabPanel value="desktop">Desktop settings…</W95TabPanel>` },
    ],
    props: [{ name: "value", desc: t("对应 Tab 的 value", "Matching tab value"), type: "string|number", def: "—" }],
    events: [],
    slots: [{ name: "default", desc: t("面板内容", "Panel content") }],
    a11y: t("role=tabpanel + aria-labelledby。", "role=tabpanel with aria-labelledby."),
  },
  {
    name: "W95MenuBar",
    group: "nav",
    title: t("MenuBar 菜单栏", "Menu Bar"),
    desc: t("应用顶部命令菜单栏。", "Application command menu bar."),
    when: { zh: ["窗口顶部 File/Edit 菜单", "需要键盘菜单导航"], en: ["File/Edit style menus", "Keyboard menu nav"] },
    demos: [
      { title: t("菜单栏", "Menu bar"), code: `<W95MenuBar>\n  <W95MenuItem>File</W95MenuItem>\n  <W95MenuItem>Edit</W95MenuItem>\n  <W95MenuSubmenu label="Export">\n    <W95MenuItem>CSV</W95MenuItem>\n  </W95MenuSubmenu>\n</W95MenuBar>` },
    ],
    props: [],
    events: [],
    slots: [{ name: "default", desc: t("MenuItem / MenuSubmenu", "Menu items / submenus") }],
    a11y: t("role=menubar + roving tabindex。", "role=menubar with roving tabindex."),
  },
  {
    name: "W95MenuItem",
    group: "nav",
    title: t("MenuItem 菜单项", "Menu Item"),
    desc: t("菜单中的一条命令。", "One command in a menu."),
    when: { zh: ["MenuBar / MenuList 中的命令", "可禁用的菜单项"], en: ["Commands in menus", "Disable a command"] },
    demos: [
      { title: t("菜单项", "Menu item"), code: `<W95MenuItem @click="save">Save</W95MenuItem>\n<W95MenuItem disabled>Print</W95MenuItem>` },
    ],
    props: [{ name: "disabled", desc: t("禁用该项", "Disable item"), type: "boolean", def: "false" }],
    events: [{ name: "click", desc: t("点击命令", "Command clicked"), params: "—" }],
    slots: [{ name: "default", desc: t("菜单文字", "Menu label") }],
    a11y: t("role=menuitem。", "role=menuitem."),
  },
  {
    name: "W95MenuList",
    group: "nav",
    title: t("MenuList 菜单列表", "Menu List"),
    desc: t("弹出菜单容器（role=menu）。", "Popup menu container (role=menu)."),
    when: { zh: ["下拉／右键菜单内容", "需要独立菜单面板"], en: ["Dropdown / context menus", "Standalone menu panel"] },
    demos: [
      { title: t("菜单列表", "Menu list"), code: `<W95MenuList>\n  <W95MenuItem>New</W95MenuItem>\n  <W95MenuItem>Open…</W95MenuItem>\n</W95MenuList>` },
    ],
    props: [],
    events: [],
    slots: [{ name: "default", desc: t("菜单项", "Menu items") }],
  },
  {
    name: "W95MenuSubmenu",
    group: "nav",
    title: t("MenuSubmenu 子菜单", "Submenu"),
    desc: t("可展开的二级菜单。", "Expandable submenu."),
    when: { zh: ["菜单分组", "导出、打开方式等二级项"], en: ["Grouped commands", "Export / Open with…"] },
    demos: [
      { title: t("子菜单", "Submenu"), code: `<W95MenuSubmenu label="Export">\n  <W95MenuItem>CSV</W95MenuItem>\n  <W95MenuItem>PDF</W95MenuItem>\n</W95MenuSubmenu>` },
    ],
    props: [
      { name: "label", desc: t("菜单标题", "Menu title"), type: "string", def: "'More'" },
      { name: "disabled", desc: t("禁用", "Disabled"), type: "boolean", def: "false" },
    ],
    events: [],
    slots: [{ name: "default", desc: t("子菜单项", "Child items") }],
    a11y: t("aria-haspopup；←→ 展开收起。", "aria-haspopup; Left/Right expand."),
  },
  {
    name: "W95Toolbar",
    group: "nav",
    title: t("Toolbar 工具栏", "Toolbar"),
    desc: t("一排常用命令按钮。", "Row of command buttons."),
    when: { zh: ["新建／打开／保存", "编辑工具按钮组"], en: ["New / Open / Save", "Editor tool groups"] },
    demos: [
      { title: t("工具栏", "Toolbar"), code: `<W95Toolbar>\n  <W95Button>New</W95Button>\n  <W95Button>Open</W95Button>\n  <W95Divider vertical />\n  <W95Button>Save</W95Button>\n</W95Toolbar>` },
    ],
    props: [],
    events: [],
    slots: [{ name: "default", desc: t("按钮等控件", "Buttons and controls") }],
    a11y: t("role=toolbar + 方向键焦点。", "role=toolbar with arrow keys."),
  },
  {
    name: "W95Tree",
    group: "nav",
    title: t("Tree 树形控件", "Tree"),
    desc: t("层级列表，支持展开折叠与选中。", "Hierarchical list with expand/collapse."),
    when: { zh: ["文件夹结构", "设置目录", "组织架构"], en: ["File trees", "Settings nav", "Org charts"] },
    demos: [
      { title: t("树形结构", "Tree"), code: `<W95Tree v-model="sel">\n  <W95TreeItem value="css" label="CSS" has-children>\n    <W95TreeItem value="sel" label="Selectors" />\n    <W95TreeItem value="spec" label="Specificity" />\n  </W95TreeItem>\n  <W95TreeItem value="js" label="JavaScript" />\n</W95Tree>` },
    ],
    props: [{ name: "modelValue", desc: t("选中节点 value", "Selected node value"), type: "string|number|null", def: "null" }],
    events: [{ name: "update:modelValue", desc: t("选中变化", "Selection changed"), params: "value" }],
    slots: [{ name: "default", desc: t("TreeItem 列表", "Tree items") }],
    a11y: t("tree/treeitem；typeahead、←→ 展开。", "tree pattern; typeahead and expand keys."),
  },
  {
    name: "W95TreeItem",
    group: "nav",
    title: t("TreeItem 树节点", "Tree Item"),
    desc: t("树中的一个节点，可含子节点。", "One node in a tree; may have children."),
    when: { zh: ["Tree 内的节点", "需要展开的文件夹"], en: ["Nodes in Tree", "Expandable folders"] },
    demos: [
      { title: t("节点", "Tree item"), code: `<W95TreeItem value="folder" label="CSS" has-children>\n  <W95TreeItem value="file" label="index.css" />\n</W95TreeItem>` },
    ],
    props: [
      { name: "value", desc: t("节点值，必填", "Node value, required"), type: "string|number", def: "—" },
      { name: "label", desc: t("节点文字", "Node label"), type: "string", def: "''" },
      { name: "hasChildren", desc: t("可展开子节点", "Has children"), type: "boolean", def: "false" },
      { name: "disabled", desc: t("禁用节点", "Disabled node"), type: "boolean", def: "false" },
    ],
    events: [],
    slots: [{ name: "default", desc: t("子 TreeItem", "Child tree items") }],
    a11y: t("aria-expanded / aria-selected。", "aria-expanded and aria-selected."),
  },
  {
    name: "W95Breadcrumb",
    group: "nav",
    title: t("Breadcrumb 面包屑", "Breadcrumb"),
    desc: t("层级路径导航条。", "Hierarchical path trail."),
    when: { zh: ["文件夹路径", "层级导航", "返回上级"], en: ["File paths", "Hierarchical nav", "Back to parent"] },
    demos: [
      { title: t("面包屑", "Breadcrumb"), code: `<W95Breadcrumb :items="[\n  { label: 'Desktop' },\n  { label: 'PC' },\n  { label: 'C:' },\n]" separator=">" />` },
    ],
    props: [
      { name: "items", desc: t("节点列表 {label,href?,click?}", "Trail items"), type: "{label,href?,click?}[]", def: "[]" },
      { name: "separator", desc: t("分隔符", "Separator"), type: "string", def: "'>'" },
    ],
    events: [],
    slots: [],
    a11y: t("nav + 最后一项 aria-current=page。", "nav with aria-current on last item."),
  },
  {
    name: "W95Pagination",
    group: "nav",
    title: t("Pagination 分页", "Pagination"),
    desc: t("表格／列表分页控件。", "Paged list navigation."),
    when: { zh: ["长列表分页", "表格底部分页"], en: ["Long lists", "Table paging"] },
    demos: [
      { title: t("分页", "Pagination"), code: `<W95Pagination v-model="page" :total="50" :page-size="10" />` },
    ],
    props: [
      { name: "modelValue", desc: t("当前页码", "Current page"), type: "number", def: "1" },
      { name: "total", desc: t("总条数", "Total items"), type: "number", def: "0" },
      { name: "pageSize", desc: t("每页条数", "Items per page"), type: "number", def: "10" },
    ],
    events: [{ name: "update:modelValue", desc: t("页码变化", "Page changed"), params: "number" }],
    slots: [],
    a11y: t("nav + aria-current=page。", "nav with aria-current=page."),
  },
  {
    name: "W95Splitter",
    group: "nav",
    title: t("Splitter 分隔条", "Splitter"),
    desc: t("拖拽调整相邻面板大小。", "Drag to resize adjacent panes."),
    when: { zh: ["左右分栏", "侧栏宽度可调"], en: ["Split layouts", "Resizable sidebars"] },
    demos: [
      { title: t("分栏", "Split panes"), code: `<div class="flex h-[160px]">\n  <aside>Sidebar</aside>\n  <W95Splitter vertical :min="80" :max="280" />\n  <main>Content</main>\n</div>` },
    ],
    props: [
      { name: "vertical", desc: t("垂直分隔（左右拖动）", "Vertical divider (drag left/right)"), type: "boolean", def: "false" },
      { name: "min", desc: t("最小尺寸", "Min size"), type: "number", def: "80" },
      { name: "max", desc: t("最大尺寸", "Max size"), type: "number", def: "600" },
    ],
    events: [{ name: "resize", desc: t("尺寸变化", "Size changed"), params: "number" }],
    slots: [],
    a11y: t("separator + 方向键调节。", "separator with arrow-key resize."),
  },
  {
    name: "W95ContextMenu",
    group: "nav",
    title: t("ContextMenu 右键菜单", "Context Menu"),
    desc: t("在指定坐标弹出的菜单。", "Menu popup at a pointer location."),
    when: { zh: ["右键操作", "自定义坐标菜单"], en: ["Right-click actions", "Point menus"] },
    demos: [
      { title: t("右键菜单", "Context menu"), code: `<W95ContextMenu v-model="open" :x="120" :y="80">\n  <W95MenuItem>Copy</W95MenuItem>\n  <W95MenuItem>Paste</W95MenuItem>\n</W95ContextMenu>` },
    ],
    props: [
      { name: "modelValue", desc: t("是否打开", "Open state"), type: "boolean", def: "false" },
      { name: "x", desc: t("横坐标", "X position"), type: "number", def: "0" },
      { name: "y", desc: t("纵坐标", "Y position"), type: "number", def: "0" },
    ],
    events: [{ name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" }],
    slots: [{ name: "default", desc: t("菜单项", "Menu items") }],
    a11y: t("role=menu + 键盘导航。", "role=menu with keyboard nav."),
  },
  {
    name: "W95ContextMenuArea",
    group: "nav",
    title: t("ContextMenuArea 右键热区", "Context Menu Area"),
    desc: t("包装内容，右键弹出菜单。", "Wraps content; right-click opens menu."),
    when: { zh: ["桌面／列表右键", "区域级右键菜单"], en: ["Desktop/list right-click", "Area context menus"] },
    demos: [
      { title: t("热区", "Hot area"), code: `<W95ContextMenuArea :items="[\n  { label: 'Copy', onClick: copy },\n  { label: 'Delete', disabled: true },\n]">\n  <div>Right-click me</div>\n</W95ContextMenuArea>` },
    ],
    props: [{ name: "items", desc: t("菜单项 {label,disabled?,onClick?}", "Menu entries"), type: "W95MenuEntry[]", def: "[]" }],
    events: [],
    slots: [{ name: "default", desc: t("被包装的内容", "Wrapped content") }],
  },
  {
    name: "W95Tooltip",
    group: "overlay",
    title: t("Tooltip 文字提示", "Tooltip"),
    desc: t("悬停或聚焦时显示的简短提示。", "Short hint on hover or focus."),
    when: { zh: ["图标按钮说明", "字段补充提示", "快捷键提示"], en: ["Icon button hints", "Field tips", "Shortcut hints"] },
    demos: [
      { title: t("提示", "Tooltip"), code: `<W95Tooltip content="Saves the file" placement="top">\n  <W95Button>Save</W95Button>\n</W95Tooltip>` },
    ],
    props: [
      { name: "content", desc: t("提示文案", "Hint text"), type: "string", def: "''" },
      { name: "placement", desc: t("相对位置", "Placement"), type: "'top'|'bottom'|'left'|'right'", def: "'top'" },
      { name: "openDelay", desc: t("显示延迟 ms", "Open delay ms"), type: "number", def: "200" },
    ],
    events: [],
    slots: [{ name: "default", desc: t("触发元素", "Trigger element") }],
    a11y: t("role=tooltip；焦点时也可显示。", "role=tooltip; shows on focus."),
  },
  {
    name: "W95Dropdown",
    group: "overlay",
    title: t("Dropdown 下拉菜单", "Dropdown"),
    desc: t("按钮触发的命令菜单。", "Button-triggered command menu."),
    when: { zh: ["更多操作", "File 菜单式命令"], en: ["More actions", "File-style commands"] },
    demos: [
      { title: t("下拉菜单", "Dropdown"), code: `<W95Dropdown v-model="open" label="File">\n  <W95MenuItem>New</W95MenuItem>\n  <W95MenuItem>Open…</W95MenuItem>\n  <W95MenuItem disabled>Print</W95MenuItem>\n</W95Dropdown>` },
    ],
    props: [
      { name: "modelValue", desc: t("菜单是否打开", "Menu open"), type: "boolean", def: "false" },
      { name: "label", desc: t("触发按钮文字", "Trigger label"), type: "string", def: "'Menu'" },
    ],
    events: [{ name: "update:modelValue", desc: t("开关变化", "Open toggled"), params: "boolean" }],
    slots: [{ name: "default", desc: t("菜单项", "Menu items") }],
    a11y: t("aria-haspopup=menu；↑↓ Esc。", "aria-haspopup=menu; arrows and Esc."),
  },
  {
    name: "W95Toast",
    group: "overlay",
    title: t("Toast 轻提示", "Toast"),
    desc: t("自动消失的通知条。", "Auto-dismissing notices."),
    when: { zh: ["保存成功等瞬时反馈", "多条排队提示"], en: ["Saved / success feedback", "Queued notices"] },
    demos: [
      { title: t("轻提示", "Toast"), code: `<W95Toast v-model="toasts" :duration="3000" />\n// toasts: { id, title?, message, duration? }[]` },
    ],
    props: [
      { name: "modelValue", desc: t("通知列表", "Toast list"), type: "W95ToastItem[]", def: "[]" },
      { name: "duration", desc: t("自动关闭 ms；0 表示不关", "Auto dismiss ms; 0 keeps"), type: "number", def: "3000" },
    ],
    events: [{ name: "update:modelValue", desc: t("列表变化（含手动关闭）", "List changed"), params: "W95ToastItem[]" }],
    slots: [],
    a11y: t("aria-live=polite。", "aria-live=polite."),
  },
  {
    name: "W95Notification",
    group: "overlay",
    title: t("Notification 通知", "Notification"),
    desc: t("带类型图标的通知，可固定不自动关闭。", "Typed notices; optional sticky mode."),
    when: { zh: ["错误／警告需要停留", "系统消息"], en: ["Sticky errors/warnings", "System messages"] },
    demos: [
      { title: t("通知", "Notification"), code: `<W95Notification v-model="items" position="bottom-right" :duration="0" />\n// items: { id, title?, message, type?, duration? }[]\n// type: info | success | warn | error` },
    ],
    props: [
      { name: "modelValue", desc: t("通知列表", "Notice list"), type: "W95NotifyItem[]", def: "[]" },
      { name: "duration", desc: t("自动关闭 ms", "Auto dismiss ms"), type: "number", def: "3500" },
      { name: "position", desc: t("屏幕位置", "Screen position"), type: "'top-right'|'bottom-right'", def: "'bottom-right'" },
    ],
    events: [{ name: "update:modelValue", desc: t("列表变化", "List changed"), params: "W95NotifyItem[]" }],
    slots: [],
    a11y: t("aria-live=polite + 图标 label。", "aria-live=polite with icon labels."),
  },
  {
    name: "W95Table",
    group: "data",
    title: t("Table 表格", "Table"),
    desc: t("数据列表展示，支持排序、多选、键盘选择。", "Data grid with sort, multi-select, keyboard."),
    when: { zh: ["文件列表", "驱动／设备清单", "简单数据表"], en: ["File lists", "Drivers / devices", "Simple grids"] },
    demos: [
      { title: t("表格", "Table"), code: `<W95Table\n  v-model:selected-key="sel"\n  :columns="[\n    { key: 'name', label: 'Name', sortable: true },\n    { key: 'ver', label: 'Version' },\n  ]"\n  :rows="rows"\n  :height="120"\n  empty-text="No data"\n  @sort="onSort"\n/>` },
    ],
    props: [
      { name: "columns", desc: t("列定义 {key,label,width?,sortable?}", "Column definitions"), type: "W95TableColumn[]", def: "—" },
      { name: "rows", desc: t("行数据对象数组", "Row objects"), type: "Record<string,unknown>[]", def: "[]" },
      { name: "rowKey", desc: t("行主键字段名", "Row key field"), type: "string", def: "'id'" },
      { name: "selectedKey", desc: t("选中行 key", "Selected row key"), type: "string|number|null", def: "null" },
      { name: "multiple", desc: t("Ctrl+点击多选", "Ctrl+click multi-select"), type: "boolean", def: "false" },
      { name: "selectedKeys", desc: t("多选 keys", "Selected keys"), type: "(string|number)[]", def: "[]" },
      { name: "sortBy", desc: t("排序列 key", "Sort column key"), type: "string", def: "—" },
      { name: "sortDir", desc: t("排序方向", "Sort direction"), type: "'asc'|'desc'", def: "'asc'" },
      { name: "emptyText", desc: t("空数据文案", "Empty text"), type: "string", def: "'No data'" },
      { name: "interactive", desc: t("允许点击选中", "Allow selection"), type: "boolean", def: "true" },
      { name: "height", desc: t("滚动区高度", "Scroll height"), type: "number|string", def: "—" },
    ],
    events: [
      { name: "update:selectedKey", desc: t("选中变化", "Selection changed"), params: "key|null" },
      { name: "update:selectedKeys", desc: t("多选变化", "Multi-select changed"), params: "keys[]" },
      { name: "select", desc: t("点击行", "Row activated"), params: "row" },
      { name: "sort", desc: t("点击表头排序", "Column sorted"), params: "key, 'asc'|'desc'" },
    ],
    slots: [],
    a11y: t("可聚焦；↑↓ 选择；sortable 列 aria-sort。", "Focusable; arrow keys; aria-sort on sortable columns."),
  },
  {
    name: "W95ProgressBar",
    group: "data",
    title: t("ProgressBar 进度条", "Progress Bar"),
    desc: t("显示任务完成度。", "Shows task completion."),
    when: { zh: ["安装／下载进度", "完成度指示"], en: ["Install / download progress", "Completion indicator"] },
    demos: [
      { title: t("实心与分段", "Solid and segmented"), code: `<W95ProgressBar :value="45" label="Install" />\n<W95ProgressBar :value="45" segmented label="Segmented" />`, live: { comp: "W95ProgressBar", props: { value: 45, label: "Install" } } },
    ],
    props: [
      { name: "value", desc: t("当前进度值", "Current value"), type: "number", def: "0" },
      { name: "max", desc: t("最大值", "Maximum"), type: "number", def: "100" },
      { name: "segmented", desc: t("分段块状样式", "Segmented bar style"), type: "boolean", def: "false" },
      { name: "label", desc: t("aria-label 文案", "aria-label text"), type: "string", def: "'Progress'" },
    ],
    events: [],
    slots: [],
    a11y: t("role=progressbar + valuenow/min/max。", "role=progressbar with ARIA values."),
  },
];

export default docs;
