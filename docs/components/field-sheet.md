# FieldAction 表单项面板

点击表单项时会从底部弹出面板,选择完数据后可以绑定到表单项右侧展示。基于 [Field 组件](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/field) 和 [Popup 组件](/components/popup) 开发。

## 基础用法

通过 `v-model` 来绑定当前选中的值。值得注意的是，绑定的值在默认单选模式下是一个对象`{ name: '', label: '' }`，这么做为了更好的与用户的自定义内容选中的数据进行匹配。多选模式下是一个数组`[{name: '', label: ''}]`。

<vp-demo path="field-action/base.vue" />

## 禁用状态

使用 `disabled` 属性就能禁用表单项。使用 `popupProps` 属性对象可以给 Popup 组件传递 [所有属性](/components/popup.html#popup-api)，`popupClass` `popupStyle`属性分别可以给 Popup 组件设置 `class名` 和 `style样式`。

<vp-demo path="field-action/disabled.vue" />

## 可清空

使用 `clearable` 属性就能快速清空当前选中的值

<vp-demo path="field-action/clearable.vue" />

## 多选折叠

使用 `collapse` 属性就能进行折叠。使用 `collapseCount` 属性来指定折叠个数。

<vp-demo path="field-action/collapse.vue" />

## 列表单选

使用`formatter`函数，来处理具体提交数据格式。该组件可以配合多种场景使用，比如列表选择。

<vp-demo path="field-action/radio.vue" />

## 列表多选

比如列表多选。

<vp-demo path="field-action/checkbox.vue" />

## FieldAction API

### Props

| 参数              |                   说明                    |                            类型 | 默认值 |
| ----------------- | :---------------------------------------: | ------------------------------: | ------ |
| `v-model`         | 绑定的值，单个绑定是个对象,多个绑定是数组 |                    object,array | {}     |
| `label-key`       |          绑定值 label 对应的 key          |                          string | label  |
| `name-key`        |          绑定值 name 对应的 key           |                          string | name   |
| `disabled`        |           是否禁用表单项不可点            |                         boolean | false  |
| `multiple`        |          多选绑定时是个对象数组           |                         boolean | false  |
| `clearable`       |                是否可清空                 |                         boolean | false  |
| `collapse`        |                是否可折叠                 |                         boolean | false  |
| `collapse-count`  |                折叠的个数                 |                          number | 1      |
| `label-separator` |     多个值的时候，作为 label 的分隔符     |                          string | ,      |
| `formatter`       |            格式化表单提交的值             | `(val: object \| array) => any` | -      |
| `tag-size`        |   tag 标签的大小,可选值为 large medium    |                          string | medium |
| `popup-props`     | Popup 组件的 [属性值](/components/popup)  |                          object | {}     |
| `popup-events`    |  Popup 组件的 [事件](/components/popup)   |                          object | {}     |
| `popup-style`     |             Popup 组件的样式              |                    object,array | []     |
| `popup-class`     |           Popup 组件的 class 名           |            object,array，string | ''     |

### Events

| 事件名      | 说明                 | 回调参数                   |
| ----------- | -------------------- | -------------------------- |
| `sure`      | 点击弹出框确定时触发 | -                          |
| `close`     | 点击弹出框关闭时触发 | -                          |
| `search`    | 搜索框中搜索时触发   | -                          |
| `close-tag` | 关闭 tag 标签时      | ({ multiple, tag }) => any |

### Slots

| 名称      | 说明         | 参数 |
| --------- | ------------ | ---- |
| `default` | 弹出框中内容 | -    |
