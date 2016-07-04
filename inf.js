var INF={
	url:'http://mouto.org/',

	n:'itorr',	//name
	t:'',		//副标题
	av:'',		//头像地址
	u:[
		'默认用户名',
		'默认用户名2'
	],

	c:{
		nichijou:["日常","我是分类简介"],
		photo:["照片","我是分类简介"],
		feel:["情感","我是分类简介"],
		hide:["我是隐藏的分类",null]/*无分类简介时，当前分类将不在首页NAV显示！*/
	},

	p:[
		//去掉这里的注释可以在 nav 上添加一项导航
	 	//{
	 	//	name:'VSCO',
	 	//	url:'#!vsco'
	 	//}

	],

	wb_name:null /*设置 wb_name 可以在使用多说评论时得到私信提示功能*/
};
var DS_cfg={
	id:'你在多说的网站ID'/*此处如留空将调用自身评论*/
};

var hitokoto = {
	api:'http://hitoapi.cc/s/',
	t:0		//是否将一言填入副标题,默认关闭，开启为1/true，一言将覆盖原标题内容
}