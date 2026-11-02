# BoardUI 基础组件对比与迁移方案

评估日期：2026-11-02

参考代码：本地 `/Users/zhijunio/github/boardui/components/base/` 与当前项目 `src/components/base/`

## 结论

当前项目不需要整体替换基础组件。BoardUI 有 27 个组件分类、46 个文件；当前项目有 33 个分类、36 个文件。两边有 20 个分类重合。BoardUI 的文件数较多，主要是为按钮、徽标和表单控件提供更多可组合变体；当前项目已经有更多通用原语，如 Accordion、Command、Dialog、Popover、Progress、Scroll Area、Sheet、Sidebar 和 Skeleton，应继续保留。

迁移时借鉴 BoardUI 的组件边界、交互细节和状态设计，保留当前项目的 Radix、React Day Picker、主题 token、图标和 `cn` 约定。不要直接复制依赖 React Aria、`@internationalized/date`、Remix Icon 或 BoardUI 专属色彩 token 的实现。

## 组件覆盖

两边都已有 Avatar、Badge、Breadcrumb、Button、Checkbox、DatePicker、Divider、Dropdown、FileUpload、Input/Label、Kbd、Notification、Pagination、Radio、Select、Switch、Table、Tabs、Textarea 和 Tooltip。对于这些组件，先针对真实使用场景补缺，不做批量替换。

当前项目独有且应保留的分类：Accordion、Alert、Calendar、Card、Collapsible、Command、Dialog、Popover、Progress、Scroll Area、Sheet、Sidebar、Skeleton。

BoardUI 值得评估的新增能力：

| 优先级 | 组件 | 建议与适用场景 |
|---|---|---|
| 已完成 | Button Group | 已新增 `ButtonGroup` / `ButtonGroupItem`，示例页已改为使用组件。复用当前 Button、主题 token 和图标；选中项同步 `aria-pressed`。 |
| 已完成 | Status Dot | 已新增 `success`、`warning`、`error`、`info` 和 `neutral` 五种语义颜色，并在 Badge 示例页展示。 |
| 已完成 | Input OTP | 已抽成通用组件，并用于 OTP 验证页和输入组件示例；支持受控值、粘贴/自动填充、键盘移动、禁用、错误和完成回调。 |
| 高 | Date Range Picker | 用于订单、报告和活动记录的日期筛选。沿用当前 Calendar、React Day Picker 与 `date-fns`，不引入 BoardUI 的日期栈。 |
| 中 | Slider | 当前基础目录没有滑块；可基于已安装的 Radix 实现单值和范围选择，并在表单示例中展示。 |
| 中 | Checkbox Card / Radio Card / Switch Card | 适用于设置和表单中的选项卡片。复用当前 Radix 控件与主题变量，不迁 React Aria 实现。 |
| 中 | Hint Text | 为表单提供统一的说明、错误和辅助文案；实现时关联输入控件的 `aria-describedby`。 |
| 低 | Tree View | 只有文件管理器确实需要层级浏览时再做；需要先定义展开、选择和键盘导航行为。 |
| 低 | Carousel | 适合媒体画廊或营销内容，不是后台高频基础控件；有实际页面需求时再迁。 |
| 条件性 | Announcement | 当前已有 Alert。仅当需要可关闭的全局公告条时才增加，避免重复表达同一类提示。 |

## 不建议重复新增

- **Chip**：BoardUI 的 Chip 主要是彩色文字标签，与当前 Badge 重叠。先确认是否有 Badge 表达不了的语义，再决定扩展 Badge 或新建 Chip。
- **Segmented Control / Pill Tab**：当前已有 Tabs 和 Button Group。真正切换内容面板时用 Tabs；只切换本地筛选状态时用带 pressed 状态的 Button Group。
- **Icon Button**：当前 Button 已支持 `size="icon"`，项目中也已有大量使用。没有统一尺寸或无障碍问题时，不再增加包装层。
- **Link Button / ButtonLink**：当前 Button 的 `asChild` 可与 Next Link 组合，不需再复制一套链接按钮。
- **Social Button**：面向社交登录品牌展示，与企业后台当前范围不符，暂不迁移。

## Button 对比结论

当前 Button 已有 `default`、`outline`、`secondary`、`ghost`、`destructive`、`link` 变体，覆盖面比 BoardUI 更广；`asChild` 也已承担链接组合能力。BoardUI 的 `leadingIcon` / `trailingIcon` / `iconOnly` 属性能规范图标尺寸，但当前直接传 ReactNode 更灵活，暂不需要改 API。

尺寸方面，BoardUI 使用约 36 / 32 / 24px；当前 `default` 为 36px、`sm` 为 28px、`xs` 为 24px，而 `lg` 当前与 `default` 同高。值得重新核对尺寸命名，但不能直接把 `sm` 改为 32px：项目已有大量 `sm` 使用点，需先评估视觉影响。

已借鉴 BoardUI 的默认 `type="button"`：当前 Button 在原生按钮模式下不再隐式提交表单；显式传入的 `type` 仍生效，`asChild` 未指定类型时不会把按钮类型传给链接。迁移前扫描确认，表单中的原生 Button 都已明确声明 `type="submit"` 或 `type="button"`，因此没有改变现有提交行为。

尺寸和图标 API 暂不迁移。当前项目有大量 `sm` 用法，BoardUI 的 32px small 与当前 28px small 不兼容；图标以 ReactNode 传入也比 BoardUI 固定组件引用更灵活。只有明确需求并完成调用点视觉检查后再统一尺寸。

## 分阶段实施

1. **基础复用**：先完成 Button Group（已完成），然后分别实现 Status Dot、Hint Text 和 OTP。每个组件先在对应的 `examples/components` 或 `examples/forms` 页面展示，再迁移一个实际页面使用。
2. **筛选与设置控件**：按页面需求增加 Date Range Picker、Slider 和卡片式选项。优先复用现有 Radix、React Day Picker 与 `date-fns`。
3. **场景组件**：仅在文件管理器需要树形浏览或媒体页面需要轮播时，增加 Tree View 或 Carousel。
4. **逐项验证**：每个组件检查键盘操作、标签和描述关联、禁用/错误/选中状态、浅色/深色主题、窄屏布局及中英文文案。避免一次迁移多个组件后才集中排查回归。

## 实施约束

- 每个新组件必须解决一个当前页面或示例中的明确需求。
- 保持组件职责在 `components/base/<family>/`；跨页面的产品组合仍放在 `components/application/`。
- 用当前项目的语义 token（如 `primary`、`border`、`muted`）映射 BoardUI 视觉，不搬入 BoardUI 私有 token。
- 交互组件优先保持 Radix 和现有日期库，不为单个控件增加另一套交互依赖。
- Button Group 当前实现位于 `src/components/base/buttons/button-group.tsx`，示例位于 `src/app/[locale]/(app)/examples/components/buttons-group/page.tsx`。
- Status Dot 当前实现位于 `src/components/base/badges/status-dot.tsx`，示例位于 `src/app/[locale]/(app)/examples/components/badge/page.tsx`。项目列表保留自己的灰度状态点样式，避免改变项目页既有的单色状态表达。
- Input OTP 当前实现位于 `src/components/base/input-otp/input-otp.tsx`，复用位置为 `src/app/[locale]/(auth)/verify-otp/page.tsx` 和 `src/app/[locale]/(app)/examples/components/input/page.tsx`。
