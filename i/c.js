var 
C=new MD.C(),
Q=function($,win,doc){
	var
	M=$('#m'),
	html=$('html'),
	body=$('body'),
	X,
	x=function(t,d,r,f){
		//t='simple'
		t=$('#_'+t+'_').innerHTML;

		X=$.x(d,function(i){
			f(Mustache.render(t,r(i)));
		});
	},
	Q={
		x:x,
		home:function(s,c,u){
			M.innerHTML='<p class="loading"></p>';
			
			var A;
			if(A=$('#nav a.a'))
				A.className='';

			if(!c)
				document.title=Title;
			else{
				/*
				if(!INF.c[c])
					return location.hash='#!home';
	*/
				//console.log(INF.c[c]);
				document.title=INF.c[c][0]+' - '+INF.c[c][1];

				if(A=$('#nav a[href="#!c/'+c+'"]'))
					A.className='a';
			}
			
			var oTime=2000000000,
			ppp;
			x('home','x/?a=h&s='+(s||'')+'&c='+(c||'')+'&u='+(u||''),function(o){
				//console.log(o);
				ppp=o;
				for(var i in o){
					o[i].h1=o[i].title.replace(/^(\s|)【.+】/,'');//'【'+INF.c[o[i].category][0]+'】'+
					if(i==0)
						B=o[i].text;
					var a;

					o[i].html=C.makeHtml($.ex(o[i].text)
						.replace(/<!--more-->/,'<p class="more"><a href="#!'+o[i].pid+'">- 查看更多 -</a></p>'));

					if(o[i].cover)
						if(o[i].cover.match(/^[\w]{16,32}$/))
							o[i].pic='http://ww2.sinaimg.cn/mw1024/'+o[i].cover;
						else
							o[i].pic=o[i].cover;
					else if(a=o[i].text.match(/http\:\/\/[0-9A-Za-z\/.#&!?%:;=_\-]+\.(?:gif|jpg|jpeg|png)/)){
						o[i].pic=a;

						o[i].html=o[i].html.replace(/(<img.+src="|!\[.+\]\()http\:\/\/[0-9A-Za-z\/.#&!?%:;=_\-]+\.(?:gif|jpg|jpeg|png)(.+?>|\))/,'');
						
					}


					//console.log(o[i].title);
					o[i].categoryName=INF.c[o[i].category][0];

					o[i].author=INF.u[o[i].authorId];
					o[i].date=$.re_date(o[i].created);
					if(oTime>o[i].created)
						oTime=o[i].created;
				}

				var r={
					category:INF.c,
					p:o
				};
				if(c)
					r.nowCat=INF.c[c];

				return r;
			},function(h){
				M.innerHTML=h;
				$.j('i/search.js');

				if(h.length>300&&ppp&&ppp.length==5)
					if(c)
						$('#more').innerHTML='<a href="#!c/'+c+'/'+oTime+'" class="more">加载 '+$.re_date(oTime)+' 之前的'+INF.c[c][0]+'…</a>';
					else if(u)
						$('#more').innerHTML='<a href="#!u/'+u+'/'+oTime+'" class="more">加载 '+INF.u[u]+' '+$.re_date(oTime)+' 之前的文章…</a>';
					else
						$('#more').innerHTML='<a href="#!page/'+oTime+'" class="more">加载 '+$.re_date(oTime)+' 之前的文章…</a>';

				else
					$('#more').innerHTML='<a href="#!home" class="more">查看最新文章…</a>';
				//$('#m ')
				//console.log(s);
				if(s&&s.length)
					window.scrollTo(0,$('#m').offsetTop);

				$('.more').onclick=function(){
					//window.scrollTo(0,560);
					//window.scrollTo(0,500);
				};
				if($('pre code')){
					$.lcss('i/md/monokai_sublime.css');
					$.j('i/md/highlight.pack.js',function(){
						hljs.initHighlighting();
					});
				}
			});
		},c:function(s){
			Q.home(s[1],s[0]);
		},u:function(s){
			Q.home(s[1],0,s[0]);
		},p:function(i){
			M.innerHTML='<p class="loading"></p>';

			x('p','x/?a=p&id='+i,function(o){
				o.h1=o.title.replace(/^(\s|)【.+】/,'');//'【'+INF.c[o.category][0]+'】'+

				//document.title=o.h1||o.text.length<15?o.text:o.text.substr(0,15)+'...';
				document.title=o.h1||'　-　';
				if(i==0)
					B=o.text;
				o.html=C.makeHtml($.ex(o.text));

					if(!o.cover&&(a=o.text.match(/http\:\/\/[0-9A-Za-z\/.#&!?%:;=_\-]+\.(?:gif|jpg|jpeg|png)/)))
						o.pic=a;
					else if(o.cover)
						o.pic='http://ww2.sinaimg.cn/mw1024/'+o.cover;
					o.html=C.makeHtml(!o.cover?$.ex(o.text)
						//.replace(/<!--more-->/,'<a href="#!'+o.pid+'">查看更多…</a>')
						.replace(/(<img.+src="|!\[.+\]\()http\:\/\/[0-9A-Za-z\/.#&!?%:;=_\-]+\.(?:gif|jpg|jpeg|png)(.+?>|\))/,''):$.ex(o.text));

				o.categoryName=INF.c[o.category][0];

				var A;
				if(A=$('#nav a.a'))
					A.className='';
				if(A=$('#nav a[href="#!c/'+o.category+'"]'))
					A.className='a';

				o.author=INF.u[o.authorId];
				o.date=$.re_date(o.created);

				return o;
			},function(h){
				M.innerHTML=h;

				window.scrollTo(0,$('#m').offsetTop);

				if(!DS_cfg.id){
					if(window.cmt)
						cmt.load(i);
					else
						$.j('i/cmts.js',function(){
							cmt.load(i);
						});
				}else{
					if(window.DS&&DS.load)
						DS.load();
					else
						$.j('i/DS.js');
				}

				if($('pre code')){
					$.lcss('i/md/monokai_sublime.css');
					$.j('i/md/highlight.pack.js',function(){
						hljs.initHighlighting();
					});
				}
			});
		},vsco:function(){

			var A;
			if(A=$('#nav a.a'))
				A.className='';

			if(A=$('#nav a[href="#!vsco"]'))
				A.className='a';

			document.title='VSCO';
			M.innerHTML='<div id="grid"><p class="loading"></p></div>\
			<div class="VS-more"><div id="more"></div></div>\
			<div id="showImg" class="hide"></div>';

			$.lcss('i/vscam.css');
			$.j('i/vscam.js');
		}
		
	};
 	Q.page=Q.home;

	if(INF.av!==''){$.css($('#av'),'display:block');$('#av').src = INF.av};
	$('#na a').innerText = INF.n;

	if (hitokoto.t)
		$.x(hitokoto.api,function(d){
			$('#t').innerText = d.text.enTxt()
		})
	else
		$('#t').innerText = INF.t;


	$('#nav').innerHTML=Mustache.render($('#_nav_').innerHTML,function(){
		var c=[];
		for(var i in INF.c)
			if(i&&INF.c[i][1])
				c.push({
					id:i,
					name:INF.c[i][0],
					des:INF.c[i][1]
				});
		return {
			c:c,
			p:INF.p
		}
	}());

 	var Title=document.title//+=' - '+$('p').innerHTML;

	var laHash='简直惨惨惨OAQ',popstate=function(){

		if('onhashchange' in win)win.onhashchange=popstate;

		if(laHash==location.hash)
			return;


		var lash=location.hash.substring(2);
		var ER=/^(?:home|page|vsco|c|u|[0-9]{1,7})/;
		var L=lash.split('/');

		if(!L[0].match(ER)){

			location.hash='#!home';	
			return;
		}
		/*

		($('#h a.a')||M).className='';
		($('#h a[href="#'+L[0]+'"]')||M).className='a';
		*/

		if(lash.match(ER)!=L[0]){
			M.style.cssText='transition:none';
			M.className='h';
			setTimeout(function(){
				M.style.cssText='';
				M.className='';
			},10);
		}
		
		laHash=location.hash;



		if(lash.match(/^[0-9]{1,7}$/)){
			body.className='P-body';
			Q.p(lash);
		}else{
			body.className=L[0];
			Q[L.shift()](L);
		}
		
		if($.cookie('wb')&&$.stat)
			$.stat($.cookie('wb'));

	};
	setTimeout(popstate,100);

	if(!'onhashchange' in win)
		setInterval(function(){
			if(laHash!=location.hash){
				popstate();
				laHash=location.hash;
			}
		},100);
	console.log('\n %c ヾ(≧∇≦)〃可能是世界最快博客 v2 %c @卜卜口<mouto.sinaapp.com> 2014/08/30 \n\n','color:#444;background:#eee;padding:5px 0;border-top-left-radius:5px;border-bottom-left-radius:5px;', 'color:#eee;background:#444;padding:5px 0;border-top-right-radius:5px;border-bottom-right-radius:5px;');
	/*这行注释的意义在于，愿看到代码的能保留上面一行 OAQ */
	return Q
}(iTorr,window,document);
