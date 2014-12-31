
window.DS?DS=function(ini,win){
	if(!ini)alert('无法读取多说信息');


	$.ua=function(i){
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
	$.t=function(p,i){!i&&(i=p)&&(p=document);return p.getElementsByTagName(i)};
	$.c=function(p,c){!c&&(c=p)&&(p=document);for(var n=' ',e=p.getElementsByTagName('*'),r=[],i=0,j;j=e[i];i++)(n+j.className+n).indexOf(n+c+n)==-1||r.push(j);return r};
	$.lcss('http://i.mouto.org/f/DS.m.css');
	var 
	x=function(A){
		return function(i,p,f,e,x){
			if(typeof p=='function'){e=f;f=p;p=0};
			if(A[i])return f(A[i]);
			i='//'+ini.id+'.duoshuo.com/api/'+i;
			x=win.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
			if(!(x.withCredentials===undefined)){
				x.open(p?'POST':'GET',i,1);
				if(p)x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				x.withCredentials=1;
				if(f||e)x.onreadystatechange=function(){
					if(x.readyState==4)((x.status>199&&x.status<301)||x.status==304||x.status==400)?f(JSON.parse(x.responseText)):e(x.responseText,x.status)
				};
				x.send(p||'')
			}else
				$.j(i.replace('.json','.jsonp')+(p?('&'+p):'')+'&callback={cb}',f||0)
		}
	}({}),
	load=function(){
			var A=$.c('DS');
			for(var i in A)show_box(A[i])
				//console.log(A)
	},
	set=function(){
		var div=$('.DS-set');
		if(!div){
			div=$.D.m('div');
			div.className='DS-set h';
			div.innerHTML='\
				<div class="DS-box">\
					<span class="close">×</span>\
					<iframe src="http://duoshuo.com/settings/" scrolling="no"></iframe>\
				</div>\
				<div class="DS-setBg"></div>';
			$.D.a(div);
			div.className='DS-set';

			$('.DS-set .close').onclick=$('.DS-setBg').onclick=function(){
				$('.DS-set').className='DS-set h';
			};
		}else
			div.className='DS-set';
		return false
	},
	show_box=function(O,U){
		//console.log(O.innerHTML);
		if(O.innerHTML.length>30)return;
		O.innerHTML='<div class="banner">评论载入中...</div>';
		if(U=O.getAttribute('data-key')){
			var e=encodeURIComponent,J,T='',pid;

			if(J=O.getAttribute('data-key')){
				T='&thread_key='+e(J);
				pid=J;
			}

			U=(INF.url||'http://'+location.host+location.pathname)+'#!'+U;

			J=O.getAttribute('data-title');

			T+='&title='+e(J||('因为多说不认识没标题的我，文章ID='+pid));
			console.log(T);

			x('threads/listPosts.json?require=visitor%2Cnonce%2Cunread&url='+e(U)+T,function(o){
				//console.log(o);
				if(o.visitor)
					DS.U=o.visitor;


				O.innerHTML='<div class="DS-hot"></div>\
				<div class="DS-input"><div class="DS-v">'+user_info(o.visitor)+'</div>'+show_input(o.thread,o.nonce)+'</div>\
				<div class="DS-cmt">'+cmt(o.response,o.parentPosts)+'</div>';

				if(win.DsCmt){
					win.scrollTo(0,$('#C-'+DsCmt).offsetTop);
					DsCmt=null;
				}

				if($('.DS-setBtn'))
					$('.DS-setBtn').onclick=DS.set;

				var 
				Fo=$.c(O,'fo'),
				likeBtns=$.c(O,'like'),
				F=$.t(O,'form')[0],
				I=F.message,
				exitFo=function(){
					$('.DS-foRebox').innerHTML=F.parent_id.value='';
				};
				
				var Z;
				if(Z=$('.DS-visitor a[rel=nofollow]'))Z.onclick=function(){
					logout();
					return false
				}

				for(var i in Fo)Fo[i].onclick=function(){
					F.parent_id.value=this.getAttribute('data-cid');

					var 
					Y=this.parentNode.parentNode;

					if($('.DS-visitor')){
						$('.DS-foRebox').innerHTML='<h3>正在回复这一条消息</h3><div class="DS-post">'+Y.innerHTML+'</div><span class="close" title="取消回复">×</span>';
						$('.DS-foRebox .close').onclick=exitFo;
						I.focus();
					}else{
						//alert('请先登录！');
						scrollTo(0,$('.DS').offsetTop);
					}

				}

				I.value=($.cookie('cmTypeV')||'');
				
				I.onfocus=I.onchange=I.onkeypress=I.onkeyup=function(){
					$.cookie('cmTypeV',I.value);
					var _c=I.value.match(/\n/g)||[];
					I.setAttribute('rows',_c.length+4);
				};

				I.onkeydown=function(){
					I.onkeyup();
					if(window.event.ctrlKey&&window.event.keyCode==13){
						F.onsubmit();
						return false;
					}
				};

				var B;
				if(B=$('.DS-smile')){
					$.x('i/smile',function(i){
						B.innerHTML='<b>(・ω・)</b><ul class="c"><li>'+i.split('\n').join('</li><li>')+'</li></ul>';
						$('.DS-smile b').onclick=function(){
							B.className=B.className=='DS-smile l'?'DS-smile l a':'DS-smile l';
							return false;
						}
						$('.DS-smile ul').onclick=function(e){
							e=e||window.event;
							var o=e.srcElement||e.target;
							if(o.tagName=='LI'){
								I.focus();
								I.value+=' '+o.innerHTML+' ';
							}
						}
					});
				};


				for(var i in likeBtns)likeBtns[i].onclick=function(){
					if(this.className=='like a'){
						this.innerHTML=(this.innerHTML*1-1);
						this.className='like';
					}else{
						this.innerHTML=(this.innerHTML*1+1);
						this.className='like a';
					}
					x('posts/vote.json','post_id='+this.getAttribute('data-cid')+'&vote='+(this.innerHTML));
					
					//this.onclick=null;
				};
				F.onsubmit=function(){
					var 
					M=I.value;
					if(!M){
						I.focus();
						return false;
					}
					var 
					P='thread_id='+F.thread_id.value+
					'&parent_id='+F.parent_id.value+
					'&nonce='+F.nonce.value+
					'&message='+encodeURIComponent(M)+
					'&v=131205';


					F.className='run';
					x('posts/create.json',P,function(i){
						//console.log(i);
						if(i.errorMessage){
							alert(i.errorMessage);
							return;
						}
						i=i.response;
						var Ul=$.D.m('ul');

						i.author.avatar_url=i.author.avatar_url||'//ds.cdncache.org/avatar-50/636/11505.jpg';
						Ul.innerHTML='<li id="C-'+i.post_id+'">\
							<div class="DS-post">'+

						(i.author.url?'<a class="user" href="'+i.author.url+'" target="_blank">\
								<img class="avatar" src="'+i.author.avatar_url+'">\
								'+i.author.name+'\
							</a>':'<span class="user">\
								<img class="avatar" src="'+i.author.avatar_url+'">\
								'+i.author.name+'\
							</span>')
							+'<span class="agent">'+$.ua(i.agent)+'</span>'
							+'<p class="msg">'+i.message+'</p>\
							<div class="ctrl">\
								<span>'+$.re_date(i.created_at)+'</span>\
							</div>\
						</li>';

						if(INF.wb_name)
							new Image().src='http://x.mouto.org/wb/x.php?name='+INF.wb_name+'&itorr='+encodeURIComponent('@'+i.author.name+' 在 '+location.href+' 评论 「'+i.message+'」');


						var dn;
						if(dn=$('.DS-li_notice')){
							$.D.d(dn);
						}
					

						var CFid;
						if(CFid=F.parent_id.value){
							Ul.className='child';
							$.D.a($('#C-'+CFid),Ul);
						}else{
							$.D.a($('.DS-cmt'),Ul);
						}


						exitFo();
						$.cookie('cmTypeV',I.value='');

						scrollTo(0,Ul.offsetTop);


						$('.DS-smile').className='DS-smile l';
						setTimeout(function(){
							F.className='';
						},1e2);
					});
					return false
				}
			},function(i,E){
				//$.x('x.php?act=log','E-DS-load DS_JSON->'+JSON.stringify(i)+' XHR_error->'+E);
				O.innerHTML='<div class="banner">评论载入失败OAQ</div>';
				//show_box(O,U);
			});
		}else{
			console.log(O,'没设置url信息');
		}
		return
	},user_info=function(U){
		//console.log(U.user_id);
		var h='';
		if(U.user_id){
			h='<div class="DS-visitor">\
				<div class="DS-foRebox"></div>\
				<div class="c">\
					<div class="l">\
						<span>'+U.name+'</span><!--a href="'+U.url+'" target="_blank"-->\
					</div>\
					<div class="r">\
						<a target="_blank" class="DS-setBtn" href="//duoshuo.com/settings/">设置</a>\
						<a rel="nofollow" href>登出</a>\
					</div>\
				</div>\
			</div>';
		}else{
			h='<div class="DS-login"><h2>/*参与评论请先登录！*/</h2><p><span>多平台登录:</span>';
			var L=encodeURIComponent(location.href);
			for(var a=['weibo','qq','baidu','google','renren','douban','netease'],b=['微博','QQ','百度','谷歌','人人','豆瓣','网易'],l=a.length,i=0;i<l;i++)
				h+='<a class="DS-'+a[i]+'" href="//'+ini.id+'.duoshuo.com/login/'+a[i]+'?redirect_uri='+L+'">'+b[i]+'</a>';
			h+='</p></div>';
		}

		return h
	},show_input=function(T,N){
		return '<form method="post">\
			<p><textarea name="message" rows="4" title="Ctrl+Enter快捷提交" placeholder="在这里评论哟～"></textarea></p>\
			<input type="hidden" name="thread_id" value="'+T.thread_id+'">\
			<input name="parent_id" type="hidden">\
			<input name="nonce" value="'+N+'" type="hidden">\
			<!--<input type="checkbox" name="repost" value="weibo">-->\
			<div class="p c">\
				<button class="l" type="submit">评论</button>\
				<smile class="DS-smile l"></smile>\
			</div>\
		</form>';
	},cmt=function(R,P){
		var f=function(P){
			var h='';
			if(!P)return h;
			h+='<ul class="child">';
			for(var i in P){
				P[i].author.avatar_url=P[i].author.avatar_url||'//ds.cdncache.org/avatar-50/636/11505.jpg';
				h+='<li id="C-'+P[i].post_id+'">\
					<div class="DS-post">'+

				
				(P[i].author.url?'<a class="user" href="'+P[i].author.url+'" target="_blank">\
						<img class="avatar" src="'+P[i].author.avatar_url+'">\
						'+P[i].author.name+'\
					</a>':'<span class="user">\
						<img class="avatar" src="'+P[i].author.avatar_url+'">\
						'+P[i].author.name+'\
					</span>')
					+'<span class="agent">'+$.ua(P[i].agent)+'</span>'
					+'<p class="msg">'+P[i].message+'</p>\
					<div class="ctrl">\
						<span>'+$.re_date(P[i].created_at)+'</span>\
						<span class="fo" data-cid="'+P[i].post_id+'">回应</span>\
						<span class="like'+(P[i].vote=='1'?' a':'')+'" data-cid="'+P[i].post_id+'">'+P[i].likes+'</span></div>\
					</div>\
				'+f(P[i].children)+'\
				</li>';
			}
			return h+'</ul>'
		},r=function(R,P){
			var h='<ul>';
			for(var i in R){
				P[R[i]].author.avatar_url=P[R[i]].author.avatar_url||'//ds.cdncache.org/avatar-50/636/11505.jpg';
				h+='<li id="C-'+P[R[i]].post_id+'">\
					<div class="DS-post">'+
				
				(P[R[i]].author.url?'<a class="user" href="'+P[R[i]].author.url+'" target="_blank">\
						<img class="avatar" src="'+P[R[i]].author.avatar_url+'">\
						'+P[R[i]].author.name+'\
					</a>':'<span class="user">\
						<img class="avatar" src="'+P[R[i]].author.avatar_url+'">\
						'+P[R[i]].author.name+'\
					</span>')
					+'<span class="agent">'+$.ua(P[R[i]].agent)+'</span>'
					+'<p class="msg">'+P[R[i]].message+'</p>\
					<div class="ctrl">\
						<span>'+$.re_date(P[R[i]].created_at)+'</span>\
						<span class="fo" data-cid="'+P[R[i]].post_id+'">回应</span>\
						<span class="like'+(P[R[i]].vote=='1'?' a':'')+'" data-cid="'+P[R[i]].post_id+'">'+P[R[i]].likes+'</span></div>\
					</div>\
					'+f(P[R[i]].children)+'\
				</li>';
			}
			if(h.length<5){
				h+='<li class="DS-li_notice">沙发还在，还不快抢？</li>';
			}
			return h+'</ul>'
		};
		return r(R,P)
	},logout=function(){
		new Image().src='//'+ini.id+'.duoshuo.com/logout/';
		$('.DS-v').innerHTML=user_info({});
	};

	if($.S('.DS').length==0)$.j('//'+ini.id+'.duoshuo.com/api/analytics/ping.jsonp?require=visitor%2Cnonce%2Cunread&callback={cb}',function(i){
		var 
		Unread=i.unread;

		if(i.visitor)
			DS.U=i.visitor;
		else
			return;
		

		if(Unread.comments)
			console.log('你有'+Unread.comments+'条评论');
		

	});
	return {
		load:load,
		U:{},
		set:set
	}
}(DS,window):alert('请添加设置信息');

DS.load()