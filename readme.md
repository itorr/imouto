
![页面截图](http://ww4.sinaimg.cn/large/a15b4afegw1enswvuws5eg20fo0b1jrd.gif)

# 妹v2

ヾ(≧∇≦)〃可能是第二个最快博客程序

## 关于妹blog

妹blog是一个 充分的利用缓存、模板、模块化、静态化 以及不同以往的框架结构 实现 快速、明确、极简 呈现内容为主的博客程序。
 

- **iTorr.JS** 框架
- **Q.JS** (依托iTorr.JS的前后端分离的单页路由)
- Markdown格式正文 (pagedown.js)
- 代码高亮 (highlight) CSS,HTML,JavaScript,PHP
- Mustache.js
- 多用户
- 分类
- 原生评论系统/多说评论（重封装）
- 拖拽图片即上传（免费图像托管）
- 新评论，微博私信提醒
- 原生ajax搜索博文


## 关于托管
妹Blog可以运行在支持 PHP MYSQL 环境的主机

>对于 [SAE](http://sae.sina.com.cn/) 以及 [Hostker](http://www.hostker.com/) 环境做了特殊支持，在这两个情况下只需要导入数据库结构即可完成配置


## 博客设置

#### 安装博客
将 `数据库结构.sql` 导入到mysql
上传文件到SAE 或者hostker 以及其他服务器或代码托管

#### 如何在非SAE 以及非Hostker情况使用妹blog
修改 `mysql.class.php` 中的数据库信息 即可

#### 如何设置博客名称呀？
修改 `/inf.js` 中的 `INF.n` 以及 `INF.t`，n 代表主标题，t 代表副标题

#### 如何设置博客头像？
修改 `/inf.js` 中的 `INF.av`，填入头像地址即可，如未填写则不显示

#### 如何修改添加删除博客用户
按照特定格式修改 `/inf.js` 中的 `INF.u` 即可

#### 如何修改文章分类，以及在页头的链接
按照特定格式修改 `/inf.js` 中的 `INF.c` 即可

#### 如何设置使用自带评论
修改 `/inf.js` 中的 `DS.id` 为空即可调用系统评论

#### 如何使用多说评论
修改 `/inf.js` 中的 `DS.id` 为你的多说ID（域名的自定义部分）

#### 如何使用评论提醒功能
修改 `/inf.js` 中的 `INF.wb_name` 为你的微博昵称

#### 如何在导航增加自定义链接
修改 `/inf.js` 中的 `INF.p`数组，如需增加需要再增加一个对象，对象之间务必加上逗号分隔！

#### 如何引入一言？
修改 `/inf.js` 中的 `hitokoto.t` 位置为1，即可将副标题显示一言，由于官方API不稳定，默认使用[@Bilibibi](http://bilibibi.me/)提供的API，也可自行设置其它

## 贡献
#### @imtms **16-06-06**
增加 PDO 支持，现已支持 PHP7。感谢@imtms 的提交

#### @zfox49 **15-07-06**
补充异步搜索功能提示

#### @Ylune **16-07-04**
集中可自定义内容

## 风格模板

- [V1](https://github.com/ylune/imouto-theme)
- [V2](https://github.com/ylune/imouto-theme-v2)

## 演示地址

- [卜卜口](http://mouto.org)
- [蔡锶铎](http://caisiduo.xyz)
- [小熊博客](http://kloli.tk)
- [折影轻梦](http://i.chainwon.com/)

## 交流

QQ群 311084414
mail itorrrrrr#me.com

