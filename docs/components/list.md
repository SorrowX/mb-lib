# List 列表

列表组件，用于无限加载异步数据进行列表渲染，且支持下拉刷新当前列表数据。基于 [InfiniteScroll 指令](https://github.com/ElemeFE/element/blob/dev/packages/infinite-scroll/src/main.js) 和 [PullRefresh 组件](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/pull-refresh) 开发。

## 基础用法

通过 `v-model` 来绑定当前加载状态。通过 `finished` 控制数据是否已全部加载完成。通过 `load` 事件来加载异步数据。

<vp-demo path="list/base.vue" />

## 错误提示

若列表数据加载失败，将 error 设置成 true 即可显示错误提示，用户点击错误提示后会重新触发 load 事件。注意一定要使用`:error.sync="error"`来进行数据同步。

<vp-demo path="list/error.vue" />

## 下拉刷新

将 `disabled` 设置为 false 即可开启下拉刷新功能。使用 `refresh` 事件来处理下拉逻辑。该回调的参数是一个`resolve`函数，务必要执行。(请进入手机模拟器查看该例子)

<vp-demo path="list/refresh.vue" />

## 自定义下拉

使用 `pull-refresh-pulling` `pull-refresh-loosing` `pull-refresh-loading` 插槽分别设置`下拉` `释放` `加载`自定义内容。(请进入手机模拟器查看该例子)

<vp-demo path="list/slots.vue" />

## List API

### Props

| 参数                      |                          说明                           |    类型 | 默认值                 |
| ------------------------- | :-----------------------------------------------------: | ------: | ---------------------- |
| `v-model(loading)`        |                        加载状态                         | boolean | false                  |
| `finished`                |             设置 true 将不会触发 load 事件              | boolean | false                  |
| `error`                   | 设置 true 表示当前异步加载失败,点击会重新触发 load 事件 |  string | 加载中...              |
| `loading-text`            |                  自定义上拉和下拉文本                   | boolean | false                  |
| `loading-size`            |                 上拉 loading 图标的大小                 |  string | 20px                   |
| `finished-text`           |                    上拉完成后的文本                     |  string | 没有更多了             |
| `error-text`              |                   上拉加载失败的文本                    |  string | 请求失败，点击重新加载 |
| `disabled`                |                    是否禁用下拉刷新                     | boolean | true                   |
| pulling-text              |                    下拉过程提示文案                     |  string | 下拉即可刷新...        |
| loosing-text              |                    释放过程提示文案                     |  string | 释放即可刷新...        |
| success-text              |                    刷新成功提示文案                     |  string | -                      |
| infinite-scroll-delay     |                   节流时延，单位为 ms                   |  number | 200                    |
| infinite-scroll-distance  |              触发加载的距离阈值，单位为 px              |  number | 0                      |
| infinite-scroll-immediate |  是否立即执行加载方法，以防初始状态下内容无法撑满容器   | boolean | true                   |

### Events

| 事件名    | 说明                     | 回调参数 |
| --------- | ------------------------ | -------- |
| `load`    | 内容到达底部，上拉时触发 | -        |
| `refresh` | 下拉时触发               | -        |

### Slots

| 名称                   | 说明               | 参数                         |
| ---------------------- | ------------------ | ---------------------------- |
| `default`              | 列表内容           | -                            |
| `loading`              | 上拉加载的内容     | -                            |
| `finished`             | 上拉加载完的内容   | -                            |
| `error`                | 上拉加载出错的内容 | -                            |
| `pull-refresh-pulling` | 下拉过程中顶部内容 | `{ distance: 当前下拉距离 }` |
| `pull-refresh-loosing` | 释放过程中顶部内容 | `{ distance: 当前下拉距离 }` |
| `pull-refresh-loading` | 加载过程中顶部内容 | `{ distance: 当前下拉距离 }` |
