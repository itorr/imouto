/* <i.mouto.org> 搜索部分 @卜卜口 */
!function($){
var 
S=$('#S'),
Si=S.s,
Sl=$('#Sl'),
T,T2;
Si.onfocus=Si.onchange=Si.onkeypress=Si.onkeyup=function(){
	
		clearTimeout(T);
		T=setTimeout(function(){
			if(!Si.value.replace(/(\s*)/g,''))
				Sl.innerHTML='<li><a><h3>键入内容索引文章</h3><span>Type the content indexing articles.</span></a></li>';
			else{
				// 接口地址，替换掉相同文件 https://github.com/itorr/imouto/blob/master/x/x.s.php
				$.x('x/?a=s&q='+Si.value,function(p){
					if(!p||!p.length)
						return Sl.innerHTML='<li><a><h3>键入内容索引文章</h3><span>Type the content indexing articles.</span></a></li>';

					var 
					Ks=Si.value.match(/([\u4e00-\u9fa5\u0800-\u4e00A-Za-z0-9]{1,12})/g),
					Kr=RegExp('('+(Ks||[]).join('|').replace(/\|$/,'')+')','i'),
					Kg=RegExp('('+(Ks||[]).join('|').replace(/\|$/,'')+')','gi');
					var 
					o,
					h='',
					i=p.length;
					while(i--){
						o=p[i];
						//console.log(o.text);
						h+='<li><a href="#!'+o.pid+'" class="t-'+o.category+'"><h3>'+o.title.replace(Kg,"<b>$1</b>")+'</h3><p>'+(o.text||'').replace(Kg,"<b>$1</b>")+'</p><span>'+$.re_date(o.created)+'</span></a></li>'
					}
					Sl.innerHTML=h||'<li><a><h3>没有找到相关内容</h3><span>No related content found.</span></a></li>';
				});
			}
			Sl.className=''
		},200)
	
};
S.onsubmit=function(){
	Si.onfocus();
	return false
};
Si.onblur=function(){
	clearTimeout(T2);
	T2=setTimeout(function(){
		if(!Si.value)
			Sl.className='h'
	},200)
}
}($);
/*搜索 End*/
