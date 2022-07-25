# Popup 弹出层

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。支持 [VanPopup](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/popup) 所有功能和 [VanSearch](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/search) 所有功能。

## 基础用法

通过 `v-model` 控制弹出层是否展示。通过 `round` 控制是否显示圆角。通过 `show-header`控制是否显示头部。通过 `show-search`控制是否显示搜索框。

<vp-demo path="popup/base.vue" />

## 头部插槽

通过 `header-left` 插槽名控制头部左边内容。通过 `header-center` 插槽名控制头部中间内容。通过 `header-right` 插槽名控制头部右侧内容。

<vp-demo path="popup/slots.vue" />

## 搜索

通过 `left` `action` `label` `left-icon` `right-icon` 插槽名自定义搜索框显示。通过 `search` `search-input` `focus` `blur` `clear` `cancel` 等事件名来处理搜索相关业务。通过 `searchProps` 属性传递给 `search 组件`。

<vp-demo path="popup/search.vue" />

## 展示弹出层

通过 v-model 控制弹出层是否展示。`lock-scroll`属性控制是否锁定背景滚动。

<vp-demo path="popup/popup.vue" />

## 弹出位置

通过 position 属性设置弹出位置，默认居中弹出，可以设置为 top、bottom、left、right。

<vp-demo path="popup/position.vue" />

## 关闭图标

设置 closeable 属性后，会在弹出层的右上角显示关闭图标，并且可以通过 close-icon 属性自定义图标，使用 close-icon-position 属性可以自定义图标位置。

<vp-demo path="popup/close.vue" />

## 圆角弹窗

设置 round 属性后，弹窗会根据弹出位置添加不同的圆角样式。

<vp-demo path="popup/round.vue" />

## 指定挂载位置

弹出层默认挂载到组件所在位置，可以通过 get-container 属性指定挂载位置。

<vp-demo path="popup/container.vue" />

## Popup API

### Props

| 参数                   |                           说明                           |                     类型 | 默认值    |
| ---------------------- | :------------------------------------------------------: | -----------------------: | --------- |
| `title`                |                         头部标题                         |                   String | -         |
| `showHeader`           |                       是否显示头部                       |                  Boolean | false     |
| `closeIcon`            |                     自定义关闭 icon                      |                   String | cross     |
| `closeIconSize`        |                      关闭 icon 大小                      |         [Number, String] | 20        |
| `closeIconColor`       |                      关闭 icon 颜色                      |                   String | #bfbfbf   |
| `showSearch`           |                       是否显示搜索                       |                  Boolean | false     |
| `searchProps`          |           搜索组件的所有 props 属性值,参考下文           |              searchProps | {}        |
| v-model (value)        |                      是否显示弹出层                      |                  boolean | false     |
| overlay                |                      是否显示遮罩层                      |                  boolean | true      |
| position               |         弹出位置，可选值为 top bottom right left         |                   string | center    |
| overlay-class          |                     自定义遮罩层类名                     |                   string | -         |
| overlay-style          |                     自定义遮罩层样式                     |                   object | -         |
| duration               |                     动画时长，单位秒                     |          [number,string] | 0.3       |
| round                  |                       是否显示圆角                       |                  boolean | false     |
| lock-scroll            |                     是否锁定背景滚动                     |                  boolean | true      |
| lazy-render            |                是否在显示弹层时才渲染节点                |                  boolean | true      |
| close-on-popstate      |                 是否在页面回退时自动关闭                 |                  boolean | false     |
| close-on-click-overlay |                  是否在点击遮罩层后关闭                  |                  boolean | true      |
| closeable              |                     是否显示关闭图标                     |                  boolean | false     |
| close-icon             |                  关闭图标名称或图片链接                  |                   string | cross     |
| close-icon-position    | 关闭图标位置，可选值为 top-left bottom-left bottom-right |                   string | top-right |
| transition             |         动画类名，等价于 transition 的 name 属性         |                   string | -         |
| transition-appear      |               是否在初始渲染时启用过渡动画               |                  boolean | false     |
| get-container          |                      指定挂载的节点                      | [string , () => Element] | -         |
| safe-area-inset-bottom |                  是否开启底部安全区适配                  |                  boolean | false     |

### searchProps

| 参数          |                                         说明                                          |              类型 | 默认值  |
| ------------- | :-----------------------------------------------------------------------------------: | ----------------: | ------- |
| label         |                                    搜索框左侧文本                                     |            string | -       |
| shape         |                              搜索框形状，可选值为 round                               |            string | square  |
| background    |                                   搜索框外部背景色                                    |            string | #f2f2f2 |
| maxlength     |                                   输入的最大字符数                                    | [number , string] | -       |
| placeholder   |                                     占位提示文字                                      |            string | -       |
| clearable     |                     是否启用清除图标，点击清除图标后会清空输入框                      |           boolean | true    |
| clear-trigger | 显示清除图标的时机，always 表示输入框不为空时展示; focus 表示输入框聚焦且不为空时展示 |            string | focus   |
| autofocus     |                          是否自动聚焦，iOS 系统不支持该属性                           |           boolean | false   |
| show-action   |                             是否在搜索框右侧显示取消按钮                              |           boolean | false   |
| action-text   |                                     取消按钮文字                                      |           boolean | 取消    |
| disabled      |                                    是否禁用输入框                                     |           boolean | false   |
| readonly      |                                 是否将输入框设为只读                                  |           boolean | false   |
| error         |                                  是否将输入内容标红                                   |           boolean | false   |
| input-align   |                       输入框内容对齐方式，可选值为 center right                       |            string | left    |
| left-icon     |                             输入框左侧图标名称或图片链接                              |            string | search  |
| right-icon    |                             输入框右侧图标名称或图片链接                              |            string | -       |

### Events

| 事件名           | 说明                            | 回调参数                     |
| ---------------- | ------------------------------- | ---------------------------- |
| click            | 点击弹出层时触发                | event: Event                 |
| click-overlay    | 点击遮罩层时触发                | -                            |
| click-close-icon | 点击关闭图标时触发 event: Event |
| open             | 打开弹出层时触发                | -                            |
| close            | 关闭弹出层时触发                | -                            |
| opened           | 打开弹出层且动画结束后触发      | -                            |
| closed           | 关闭弹出层且动画结束后触发      | -                            |
| `sure`           | 点击头部确定按钮时触发          | -                            |
| search           | 输入框确定搜索时触发            | value: string (当前输入的值) |
| `search-input`   | 输入框内容变化时触发            | value: string (当前输入的值) |
| focus            | 输入框获得焦点时触发            | event: Event                 |
| blur             | 输入框失去焦点时触发            | event: Event                 |
| clear            | 输入框点击清除按钮后触发        | event: Event                 |
| cancel           | 输入框点击取消按钮时触发        | -                            |

### Slots

| 名称            | 说明                                                    | 参数 |
| --------------- | ------------------------------------------------------- | ---- |
| `default`       | 弹出框内容                                              | -    |
| `header-left`   | 头部左侧内容                                            | -    |
| `header-center` | 头部中间内容                                            | -    |
| `header-right`  | 头部右侧内容                                            | -    |
| left            | 自定义左侧内容（搜索框外）                              | -    |
| action          | 自定义右侧内容（搜索框外），设置 show-action 属性后展示 | -    |
| label           | 自定义左侧文本（搜索框内）                              | -    |
| left-icon       | 自定义左侧图标（搜索框内）                              | -    |
| right-icon      | 自定义右侧图标（搜索框内）                              | -    |
