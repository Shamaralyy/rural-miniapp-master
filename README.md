# 乡村名片uniapp

## 项目介绍
　　乡村名片是一个助力乡村振兴发展宣传的数字平台。使用自研乡村数字系统与互联网头部流量平台对接，打造让用户在各大顶流平台“触手可及”的线上乡村数字名片，帮助乡村发展宣传、文化传播、助农好物、公益帮扶等服务，解决乡村振兴发展建设发展信息差问题，基于乡村名片数据，共同建设全国乡村宣传的数字信息库平台。

## 涉及终端

| 涉及终端           | 目前状态            |目的            |
| -------------- | --------------- |--------------- |
| 微信小程序版  | 正在开发|比赛专用主流平台|
| 抖音小程序版  | 待兼容|流量多可挂载|
| 快手小程序版  | 待兼容|目标客户群体大可挂载|
| 微信H5网页版  | 待兼容|可实现手绘地图|

## 页面结构

~~~
pages
|--build 乡村共建管理
|---rural_info 乡村基本信息
|---rural_map 乡村向导管理
|---rural_news 乡村资讯管理
|---rural_service 乡村好物管理
|---rural_vr 乡村VR管理
|---build.vue 共建首页
|--card 乡村名片
|---card.vue 乡村名片首页
|--index 首页相关
|---index.vue 首页
|--login 登录相关
|---login 登录页
|--myrural 我的村
|---myrural.vue 我的村添加页
|---rural_add.vue 我的村创建页
|---rural_home.vue 我的村固定信息展示页
|---rural_join.vue 我的村加入页
|---rural_list.vue 我的村列表页
|---rural_search.vue 我的村搜索页
|--user 个人中心
|---user_info 用户详情
|----info_edit.vue 用户详情信息修改
|----user_info.vue 用户详情页
|---user_setting 设置
|----user_setting.vue 设置页
|---user.vue 个人中心页
|--waterfall 瀑布流插件
~~~