var iTorr=function(win,doc,$){
	if(!win.localStorage||!win.XMLHttpRequest)
		return doc.getElementsByTagName('body')[0].innerHTML='<p class=banner>请更新现代浏览器。';
$=function(i){return doc.querySelector(i)};
$$=$.S=function(i){return doc.querySelectorAll(i)};
$.css=function(p,i){p.style.cssText+=(';'+i)};
$.x=function(d){
	return function(url,data,func,err,x,j){
		if(typeof data=='function'){
			err=func;func=data;data=0;
		}
		if(d[url]&&!data)
			return func(d[url]);
		(x=new XMLHttpRequest()).open(data?'POST':'GET',url,1);
		!data||x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		if(func||err){
			x.onreadystatechange=function(){
				if(x.readyState==4){
					if((x.status>199&&x.status<301)||x.status==304){
						j=x.responseText;
						if((x.getResponseHeader('Content-Type')||'').match(/json/))
							j=JSON.parse(j||null);
						
						if(!data)
							d[url]=j;
						
						func(j);
					}else if(err)
							err(x.status);
						
				}
			};
		}
		x.send(data||'');
		return x;
	};
}({});
$.cookie=function(g,f,h){
	if(typeof f!="undefined"){
		h=h||31536000;
		var j=new Date();
		j.setTime(j.getTime()+h*1000);
		doc.cookie=g+"="+escape(f)+";expires="+j.toGMTString();
	}else{
		var e=doc.cookie.match(new RegExp("(^| )"+g+"=([^;]*)(;|$)"));
		return e==null?null:unescape(e[2]);
	}
};
$.D={
	m:function(d){return doc.createElement(d);},
	d:function(i){if(i)return i.parentNode.removeChild(i);},
	a:function(e,d){!d&&(d=e)&&(e=doc.body);return e.appendChild(d);},
	b:function(e,d){e.insertBefore(d,e.childNodes[0]);},
	c:function(d){return d.cloneNode(1);}
};


$.j=function(g,j,k,h,d){
	h=$.D.m("script");
	d="cb"+new Date().valueOf()+(Math.random()+'').substring(3);
	if(j&&g.match(/\{cb\}/)){
		c[d]=j;
	}
	h.src=g.replace(/\{cb\}/,d);
	h.charset="UTF-8";
	h.onload=function(){
		if(j&&!g.match(/\{cb\}/))
			j();
		
		$.D.d(h);
	};
	h.onerror=function(){
		if(k)k();
		$.D.d(h);
	};
	$.D.a(h);
};
$.lcss=function(d){
	return function(g,e,h){
		if(d.indexOf(g)<0){
			(e=$.D.m("link")).href=g;
			h=$('head');
			e.rel="stylesheet";
			e.charset="UTF-8";
			$.D.a(h,e);
			d+=g+"|";
		}
	};
}("|");




$.b=$("html").className+=' '+self.ActiveXObject?'IE':self.chrome?"Cr":self.mozPaintCount>~[]?"FF":self.opera?"Op":self.WebKitPoint?"Wk":'';

$.swf=function(i){return doc[i]||$('#'+i)};
$.re_date=function(e){
	var h=new Date(),d=new Date((e+'').match(/[0-9]{10}/)?e*1000:e),g=parseInt,f=g((h-d)/1000);
	return !e||f<0?"刚刚":
	f<60?(f+"秒前"):
	(f/=60)<60?g(f)+"分前":
	(f/=60)<24?g(f)+"时前":
	(f/=24)<7?g(f)+"天前":
	(f/=7)<2?g(f)+"周前":
	d>new Date(h.getFullYear()+"-01-01")?(d.getMonth()+1)+"月"+d.getDate()+"日":
	d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日";
};

String.prototype.enTxt=function(){
	return this.replace(/(^\s*)|(\s*$)/g,'')
	.replace(/&/g,"&amp;")
	.replace(/</g,"&lt;")
	.replace(/>/g,"&gt;")
	.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")
	.replace(/\'/g,"&#39;")
	.replace(/\"/g,"&quot;")
	.replace(/\n/g,"<br>");
};
String.prototype.enHtml=function(){
	return this.replace(/(^\s*)|(\s*$)/g,'')
	.replace(/(http\:\/\/[\w\/.#&!?%:;=_]+\.)(gif|jpg|jpeg|png)/g,'<img src="$1$2">')
	.replace(/(http\:\/\/ww[0-9]{1}\.sinaimg\.cn\/)([\w]{4,10})(\/[\w]{16,32}\.)(gif|jpg|jpeg|png)/g,"$1mw1024$3$4")
	.replace(/http:\/\/www\.xiami\.com\/song\/([0-9]{5,12})[\?\w\.\=]*/g,'<a href="//www.xiami.com/song/$1" target="_blank" class="xiami">http://www.xiami.com/song/$1</a>')
	.replace(/(@)([\u0800-\u9fa5\w\-_]{2,32})/g,'<a href="//weibo.com/n/$2" target="_blank" class="at">$1$2</a>')
	.replace(/(^|[^\"\'\]>])(http|ftp|mms|rstp|news|https|telnet)\:\/\/([\w\/.#&!?%:;=\-_]+)/g,'$1<a href="$2://$3" rel="external nofollow noreferer" class="link" target="_blank">$2://$3</a>')
	.replace(/\n/g,"<br>");
};
if(!win.console)win.console={log:function(){}};

	return $;
}(window,document);

if(!window.$)
	$=iTorr;

W=function(b,a){
	return{
		en:function(c){
			for(a=doc.length,i=0;i<a;i++)
				c=win.replace(new RegExp(b[i][0],"g"),b[i][1]);
			return c;
		},de:function(c){
			for(i=doc.length-1;i>=0;i--)
				c=win.replace(new RegExp(b[i][1],"g"),b[i][0]);
			return c;
		}
	};
}([["me","2"],["ga2","3"],["om","4"],["e","5"],["o","6"],["/","0"],["c","7"],["www","8"],["x","9"]]);