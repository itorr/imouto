iTorr.ua=function(i){
	i=i||navigator.userAgent;
	return i.match(/Windows Phone/i)?'Mango':
	i.match(/Windows CE/i)?'winCE':
	i.match(/ipad/i)?'iPad':
	i.match(/iPod/i)?'Touch':
	i.match(/iphone/i)?'iPhone':
	i.match(/android/i)?'Android':
	i.match(/Ubuntu/i)?'Ubuntu':
	i.match(/Mac OS X/i)?'Mac OS X':
	i.match(/360/i)?'Shit!':
	i.match(/opera minf/i)?'Opera mini':
	i.match(/Chrome/i)?'Cr':
	i.match(/Safarf/i)?'Safari':
	i.match(/Opera/i)?'Opera':
	i.match(/UCWEB/i)?'UC':
	i.match(/PHP/i)?'PHP':'';
};
String.prototype.enHtml=function(){return this.replace(/(^\s*)|(\s*$)/g,"").replace(/(http\:\/\/[0-9A-Za-z\/.#&!?%:;=_]+\.)(gif|jpg|jpeg|png)/g,'<img src="$1$2">').replace(/(http\:\/\/ww[0-9]{1}\.sinaimg\.cn\/)([\w]{4,10})(\/[\w]{16,32}\.)(gif|jpg|jpeg|png)/g,"$1mw1024$3$4").replace(/http:\/\/www\.xiami\.com\/song\/([0-9]{5,12})[\?\w\.\=]*/g,'<a href="//www.xiami.com/song/$1" target="_blank" class="xiami">http://www.xiami.com/song/$1</a>').replace(/(@)([\u4e00-\u9fa5\u0800-\u4e00A-Za-z0-9\-_]{2,32})/g,'<b class="at">$1$2</b>').replace(/(^|[^\"\'\]>])(http|ftp|mms|rstp|news|https|telnet)\:\/\/([0-9A-Za-z\/.#&!?%:;=\-_]+)/g,'$1<a href="$2://$3" rel="external nofollow noreferer" class="link" target="_blank">$2://$3</a>').replace(/\n/g,"<br>");};
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
$.lcss('i/cmts.css');

var cmt=function($){

	var Co=function(k,v){
		if(v){
			window.localStorage?localStorage.setItem(k,v):$.cookie(k,v);
		}else{
			return window.localStorage?localStorage.getItem(k):$.cookie(k);
		}
	};

	return cmt={
		load:function(pid){
			Q.x('cmt','x/?a=c&id='+pid,function(o){
				for(var i in o){

					//o[i].html=C.makeHtml($.ex(o[i].text).replace(/<!--more-->/,'<a href="#!'+o[i].pid+'">查看更多…</a>'));
					o[i].ua=$.ua(o[i].agent);
					if(!o[i].url)
						delete o[i].url;
					o[i].date=$.re_date(o[i].created);
					o[i].html=o[i].text.enTxt().enHtml();
					//console.log(o[i].text.enHtml())
				}
				return {
					pid:pid,
					c:o
				};
			},function(i){
				$('.cmt').innerHTML=i;


				var 
				F=$('.cmt form'),
				I=$.S('.cmt form input,.cmt form textarea');

				$('.cmt ul').onclick=function(e){
					e=e||window.event;
					var o=e.srcElement||e.target;
					if(o.className=='fo'){
						F.text.focus();
						F.text.value+='@'+o.getAttribute('data-name')+' ';
					}
				};

				for(var i in I){

					var _I=I[i];
					if(_I.type=='hidden')
						continue;
					
					_I.onfocus=
					_I.onchange=
					_I.onkeypress=
					_I.onkeyup=
					_I.onkeydown=function(){
						Co('cmtU'+this.name,this.value);
					};

					
					_I.value=Co('cmtU'+_I.name)||_I.value;
				}


				F.text.onfocus=F.text.onchange=F.text.onkeypress=F.text.onkeyup=function(){
					Co('cmTypeV',this.value);
					var _c=this.value.match(/\n/g)||[];
					this.setAttribute('rows',_c.length+5);
				};
				F.text.value=Co('cmTypeV')||'';
				F.text.onkeydown=function(){
					F.text.onkeyup();
					if(window.event.ctrlKey&&window.event.keyCode==13){
						F.onsubmit();
						return false;
					}
				};

				F.onsubmit=function(){
					
					for(var i in I){
						var _I=I[i];
						if(_I.required&&(
							!_I.value
							||(_I.type=='email'&&!_I.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/))
							||(_I.type=='url'&&!_I.value.match(/^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?$/))
							)
						){
							alert('请输入正确的'+_I.title);
							_I.focus();
							return false;
						}
					}

					var P=[];
					for(var i=0,l=I.length;i<l;i++){
						var _I=I[i];
						//console.log(_I);
						P.push(_I.name+'='+encodeURIComponent(_I.value));
					}
					
					$.x('x/?a=addc',P.join('&'),function(c){
						if(c.error)
							return alert(c.error);


						var li=$.D.m('li');
						li.className='C-li a';
						li.innerHTML='\
	<div class="DS-post">\
		<a class="user" href="'+c.url+'" target="_blank">\
			<img class="avatar" src="http://gravatar.duoshuo.com/avatar/'+c.avatar+'?s=50">\
			'+c.author+'\
		</a>\
		<span class="agent">'+$.ua(c.agent)+'</span>\
		<p class="msg">'+c.text.enTxt().enHtml()+'</p>\
		<div class="ctrl">\
			<span>刚刚</span>\
			<span class="fo" data-name="'+c.author+'">回应</span>\
		</div>\
	</div>\
</li>';
						$.D.a($('.cmt ul'),li);

						var A;
						if(A=$('.DS .banner'))
							$.D.d(A);

						F.text.value='';
						Co('cmTypeV','');
						
						window.scrollTo(0,li.offsetTop);


					});
					return false;
				};
			});
		}
	};
}(iTorr);
