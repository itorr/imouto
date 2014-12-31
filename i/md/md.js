var MD;
if(typeof exports==="object"&&typeof require==="function"){
	MD=exports
}else{
	MD={}
}(function(){
	function c(e){
		return e
	}
	function d(e){
		return false
	}
	function b(){}
	b.prototype={
		chain:function(g,f){
			var e=this[g];
			if(!e){
				throw new Error("unknown hook "+g)
			}
			if(e===c){
				this[g]=f
			}else{
				this[g]=function(i){
					var h=Array.prototype.slice.call(arguments,0);
					h[0]=e.apply(null,h);
					return f.apply(null,h)
				}
			}
		},
		set:function(f,e){
			if(!this[f]){
				throw new Error("unknown hook "+f)
			}
			this[f]=e
		},
		addNoop:function(e){
			this[e]=c
		},
		addFalse:function(e){
			this[e]=d
		}
	};
	MD.HookCollection=b;
	function a(){}
	a.prototype={
		set:function(e,f){
			this["s_"+e]=f
		},
		get:function(e){
			return this["s_"+e]
		}
	};
	MD.C=function(){
		var l=this.hooks=new b();
		l.addNoop("plainLinkText");
		l.addNoop("preConversion");
		l.addNoop("postNormalization");
		l.addNoop("preBlockGamut");
		l.addNoop("postBlockGamut");
		l.addNoop("preSpanGamut");
		l.addNoop("postSpanGamut");
		l.addNoop("postConversion");
		var y;
		var p;
		var e;
		var C;
		this.makeHtml=function(V){
			if(y){
				throw new Error("Recursive call to converter.makeHtml")
			}
			y=new a();
			p=new a();
			e=[];
			C=0;
			V=l.preConversion(V);
			V=V.replace(/~/g,"~T");
			V=V.replace(/\$/g,"~D");
			V=V.replace(/\r\n/g,"\n");
			V=V.replace(/\r/g,"\n");
			V="\n\n"+V+"\n\n";
			V=N(V);
			V=V.replace(/^[ \t]+$/mg,"");
			V=l.postNormalization(V);
			V=q(V);
			V=o(V);
			V=h(V);
			V=Q(V);
			V=V.replace(/~D/g,"$$");
			V=V.replace(/~T/g,"~");
			V=l.postConversion(V);
			e=p=y=null;
			return V
		};
		function o(V){
			V=V.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(Y,aa,Z,X,W,ab){
				aa=aa.toLowerCase();
				y.set(aa,F(Z));
				if(W){
					return X
				}else{
					if(ab){
						p.set(aa,ab.replace(/"/g,"&quot;"))
					}
				}
				return ""
			});
			return V
		}
		function q(X){
			var 
			V="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math",
			W=V+"|ins|del";
			X=X.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,T);
			X=X.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,T);
			X=X.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,T);
			X=X.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,T);
			X=X.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,T);
			return X
		}
		function T(V,W){
			var X=W;
			X=X.replace(/^\n+/,"");
			X=X.replace(/\n+$/g,"");
			X="\n\n~K"+(e.push(X)-1)+"K\n\n";
			return X
		}
		var g=function(V){
			return h(V)
		};
		function h(X,W){
			X=l.preBlockGamut(X,g);
			X=k(X);
			var V="<hr />\n";
			X=X.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,V);
			X=X.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,V);
			X=X.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,V);
			X=P(X);
			X=s(X);
			X=i(X);
			X=l.postBlockGamut(X,g);
			X=q(X);
			X=M(X,W);
			return X
		}
		function m(V){
			V=l.preSpanGamut(V);
			V=t(V);
			V=x(V);
			V=K(V);
			V=G(V);
			V=H(V);
			V=O(V);
			V=V.replace(/~P/g,"://");
			V=F(V);
			V=A(V);
			V=V.replace(/ *\n/g," <br>\n");
			V=l.postSpanGamut(V);
			return V
		}
		function x(W){
			var V=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
			W=W.replace(V,function(Y){
				var X=Y.replace(/(.)<\/?code>(?=.)/g,"$1`");
				X=B(X,Y.charAt(1) == "!" ? "\\`*_/" :"\\`*_");
				return X
			});
			return W
		}
		function H(V){
			V=V.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,j);
			V=V.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,j);
			V=V.replace(/(\[([^\[\]]+)\])()()()()()/g,j);
			return V
		}
		function j(ab,ah,ag,af,ae,ad,aa,Z){
			if(Z == undefined){
				Z=""
			}
			var Y=ah;
			var W=ag.replace(/:\/\//g,"~P");
			var X=af.toLowerCase();
			var V=ae;
			var ac=Z;
			if(V == ""){
				if(X == ""){
					X=W.toLowerCase().replace(/ ?\n/g," ")
				}
				V="#"+X;
				if(y.get(X) != undefined){
					V=y.get(X);
					if(p.get(X) != undefined){
						ac=p.get(X)
					}
				}else{
					if(Y.search(/\(\s*\)$/m)>-1){
						V=""
					}else{
						return Y
					}
				}
			}
			V=D(V);
			V=B(V,"*_");
			var ai=V.match(/^http/)?'<a href="'+V+'" target="_blank"':'<a href="'+V+'"';
			if(ac != ""){
				ac=J(ac);
				ac=B(ac,"*_");
				ai += ' title="'+ac+'"'
			}
			ai += ">"+W+"</a>";
			return ai
		}
		function G(V){
			V=V.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,I);
			V=V.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,I);
			return V
		}
		function J(V){
			return V.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
		}
		function I(ab,ah,ag,af,ae,ad,aa,Z){
			var Y=ah;
			var X=ag;
			var W=af.toLowerCase();
			var V=ae;
			var ac=Z;
			if(!ac){
				ac=""
			}
			if(V == ""){
				if(W == ""){
					W=X.toLowerCase().replace(/ ?\n/g," ")
				}
				V="#"+W;
				if(y.get(W) != undefined){
					V=y.get(W);
					if(p.get(W) != undefined){
						ac=p.get(W)
					}
				}else{
					return Y
				}
			}
			X=B(J(X),"*_[]()");
			V=B(V,"*_");
			var ai='<img src="'+V+'" alt="'+X+'"';
			ac=J(ac);
			ac=B(ac,"*_");
			ai += ' title="'+ac+'"';
			ai += " />";
			return ai
		}
		function k(V){
			V=V.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(W,X){
				return "<h1>"+m(X)+"</h1>\n\n"
			});
			V=V.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(X,W){
				return "<h2>"+m(W)+"</h2>\n\n"
			});
			V=V.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(W,Z,Y){
				var X=Z.length;
				return "<h"+X+">"+m(Y)+"</h"+X+">\n\n"
			});
			return V
		}
		function P(X,V){
			X += "~0";
			var W=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
			if(C){
				X=X.replace(W,function(Z,ac,ab){
					var ad=ac;
					var aa=(ab.search(/[*+-]/g)>-1) ? "ul":"ol";
					var Y=n(ad,aa,V);
					Y=Y.replace(/\s+$/,"");
					Y="<"+aa+">"+Y+"</"+aa+">\n";
					return Y
				})
			}else{
				W=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
				X=X.replace(W,function(aa,ae,ac,Z){
					var ad=ae;
					var af=ac;
					var ab=(Z.search(/[*+-]/g)>-1) ? "ul":"ol";
					var Y=n(af,ab);
					Y=ad+"<"+ab+">\n"+Y+"</"+ab+">\n";
					return Y
				})
			}
			X=X.replace(/~0/,"");
			return X
		}
		var r={
			ol:"\\d+[.]",
			ul:"[*+-]"
		};
		function n(X,W,aa){
			C++;
			X=X.replace(/\n{2,}$/,"\n");
			X += "~0";
			var V=r[W];
			var Y=new RegExp("(^[ \\t]*)("+V+")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1("+V+")[ \\t]+))","gm");
			var Z=false;
			X=X.replace(Y,function(ac,ae,ad,ab){
				var ah=ab;
				var ai=ae;
				var ag=/\n\n$/.test(ah);
				var af=ag || ah.search(/\n{2,}/)>-1;
				if(af || Z){
					ah=h(v(ah),true)
				}else{
					ah=P(v(ah),true);
					ah=ah.replace(/\n$/,"");
					if(!aa){
						ah=m(ah)
					}
				}
				Z=ag;
				return "<li>"+ah+"</li>\n"
			});
			X=X.replace(/~0/g,"");
			C--;
			return X
		}
		function s(V){
			V += "~0";
			V=V.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(W,Y,X){
				var Z=Y;
				var aa=X;
				Z=E(v(Z));
				Z=N(Z);
				Z=Z.replace(/^\n+/g,"");
				Z=Z.replace(/\n+$/g,"");
				Z="<pre><code>"+Z+"\n</code></pre>";
				return "\n\n"+Z+"\n\n"+aa
			});
			V=V.replace(/~0/,"");
			return V
		}
		function S(V){
			V=V.replace(/(^\n+|\n+$)/g,"");
			return "\n\n~K"+(e.push(V)-1)+"K\n\n"
		}
		function t(V){
			V=V.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(Y,aa,Z,X,W){
				var ab=X;
				ab=ab.replace(/^([ \t]*)/g,"");
				ab=ab.replace(/[ \t]*$/g,"");
				ab=E(ab);
				ab=ab.replace(/:\/\//g,"~P");
				return aa+"<code>"+ab+"</code>"
			});
			return V
		}
		function E(V){
			V=V.replace(/&/g,"&amp;");
			V=V.replace(/</g,"&lt;");
			V=V.replace(/>/g,"&gt;");
			V=B(V,"*_{}[]\\",false);
			return V
		}
		function A(V){
			V=V.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>");
			V=V.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>");
			return V
		}
		function i(V){
			V=V.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(W,X){
				var Y=X;
				Y=Y.replace(/^[ \t]*>[ \t]?/gm,"~0");
				Y=Y.replace(/~0/g,"");
				Y=Y.replace(/^[ \t]+$/gm,"");
				Y=h(Y);
				Y=Y.replace(/(^|\n)/g,"$1  ");
				Y=Y.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(Z,aa){
					var ab=aa;
					ab=ab.replace(/^  /mg,"~0");
					ab=ab.replace(/~0/g,"");
					return ab
				});
				return S("<blockquote>\n"+Y+"\n</blockquote>")
			});
			return V
		}
		function M(ac,V){
			ac=ac.replace(/^\n+/g,"");
			ac=ac.replace(/\n+$/g,"");
			var ad=ac.split(/\n{2,}/g);
			var aa=[];
			var W=/~K(\d+)K/;
			var X=ad.length;
			for (var Y=0; Y < X; Y++){
				var Z=ad[Y];
				if(W.test(Z)){
					aa.push(Z)
				}else{
					if(/\S/.test(Z)){
						Z=m(Z);
						Z=Z.replace(/^([ \t]*)/g,"<p>");
						Z += "</p>";
						aa.push(Z)
					}
				}
			}
			if(!V){
				X=aa.length;
				for (var Y=0; Y < X; Y++){
					var ab=true;
					while (ab){
						ab=false;
						aa[Y]=aa[Y].replace(/~K(\d+)K/g,function(ae,af){
							ab=true;
							return e[af]
						})
					}
				}
			}
			return aa.join("\n\n")
		}
		function F(V){
			V=V.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");
			V=V.replace(/<(?![a-z\/?!]|~D)/gi,"&lt;");
			return V
		}
		function K(V){
			V=V.replace(/\\(\\)/g,u);
			V=V.replace(/\\([`*_{}\[\]()>#+-.!])/g,u);
			return V
		}
		var z="[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]",U="[-A-Z0-9+&@#/%=~_|[\\])]",L=new RegExp('(="|<)?\\b(https?|ftp)(://'+z+"*"+U+")(?=$|\\W)","gi"),R=new RegExp(U,"i");
		function f(Z,ac,ae,Y){
			if(ac){
				return Z
			}
			if(Y.charAt(Y.length-1) !== ")"){
				return "<"+ae+Y+">"
			}
			var aa=Y.match(/[()]/g);
			var V=0;
			for (var W=0; W < aa.length; W++){
				if(aa[W]==="("){
					if(V <= 0){
						V=1
					}else{
						V++
					}
				}else{
					V--
				}
			}
			var X="";
			if(V < 0){
				var ad=new RegExp("\\){1,"+( - V)+"}$");
				Y=Y.replace(ad,function(af){
					X=af;
					return ""
				})
			}
			if(X){
				var ab=Y.charAt(Y.length-1);
				if(!R.test(ab)){
					X=ab+X;
					Y=Y.substr(0,Y.length-1)
				}
			}
			return "<"+ae+Y+">"+X
		}
		function O(W){
			W=W.replace(L,f);
			var V=function(Y,X){
				return '<a href="'+X+'">'+l.plainLinkText(X)+"</a>"
			};
			W=W.replace(/<((https?|ftp):[^'">\s]+)>/gi,V);
			return W
		}
		function Q(V){
			V=V.replace(/~E(\d+)E/g,function(W,Y){
				var X=parseInt(Y);
				return String.fromCharCode(X)
			});
			return V
		}
		function v(V){
			V=V.replace(/^(\t|[ ]{1,4})/gm,"~0");
			V=V.replace(/~0/g,"");
			return V
		}
		function N(Y){
			if(!/\t/.test(Y)){
				return Y
			}
			var X=["    ","   ","  "," "],W=0,V;
			return Y.replace(/[\n\t]/g,function(Z,aa){
				if(Z==="\n"){
					W=aa+1;
					return Z
				}
				V=(aa - W)%4;
				W=aa+1;
				return X[V]
			})
		}
		var w=/(?:["'*()[\]:]|~D)/g;
		function D(W){
			if(!W){
				return ""
			}
			var V=W.length;
			return W.replace(w,function(X,Y){
				if(X == "~D"){
					return "%24"
				}
				if(X == ":"){
					if(Y == V-1 || /[0-9\/]/.test(W.charAt(Y+1)
						)){
						return ":"
					}
				}
				return "%"+X.charCodeAt(0).toString(16)
			})
		}
		function B(Z,W,X){
			var V="(["+W.replace(/([\[\]\\])/g,"\\$1")+"])";
			if(X){
				V="\\\\"+V
			}
			var Y=new RegExp(V,"g");
			Z=Z.replace(Y,u);
			return Z
		}
		function u(V,X){
			var W=X.charCodeAt(0);
			return "~E"+W+"E"
		}
	}
})();
(function(){
	var a,d;
	if(typeof exports==="object"&&typeof require==="function"){
		a=exports;
		d=require("./MD.C").C
	}else{
		a=window.MD;
		d=a.C
	}
	a.getSanitizingC=function(){
		var i=new d();
		i.hooks.chain("postConversion",c);
		i.hooks.chain("postConversion",b);
		return i
	};
	function c(i){
		return i.replace(/<[^>]*>?/gi,e)
	}
	var f=/^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i;
	var g=/^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i;
	var h=/^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i;
	function e(i){
		if(i.match(f) || i.match(g) || i.match(h)){
			return i
		}else{
			return ""
		}
	}
	function b(m){
		if(m == ""){
			return ""
		}
		var s=/<\/?\w+[^>]*(\s|$|>)/g;
		var t=m.toLowerCase().match(s);
		var r=(t || []).length;
		if(r == 0){
			return m
		}
		var q,u;
		var p="<p><img><br><li><hr>";
		var n;
		var o=[];
		var j=[];
		var l=false;
		for (var i=0; i < r; i++){
			q=t[i].replace(/<\/?(\w+).*/,"$1");
			if(o[i] || p.search("<"+q+">")>-1){
				continue
			}
			u=t[i];
			n =- 1;
			if(!/^<\//.test(u)){
				for (var k=i+1; k < r; k++){
					if(!o[k]&&t[k] == "</"+q+">"){
						n=k;
						break
					}
				}
			}
			if(n==-1){
				l=j[i]=true
			}else{
				o[n]=true
			}
		}
		if(!l){
			return m
		}
		var i=0;
		m=m.replace(s,function(v){
			var w=j[i] ? "":v;
			i++;
			return w
		});
		return m
	}
})();

iTorr.ex=function(i){
	//console.log(i);
	return i.replace(/```(|[\w]+)[\r\n]+([\W.\S]*?)```/mg,function(i,a,b){
		return '<pre><code class="'+a+'">'+b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&#39;").replace(/\"/g,"&quot;")+'</code></pre>'
	}).replace(/(^|[^\"\'\]>])(http\:\/\/ww[0-9]{1}\.sinaimg\.cn\/)([\w]{4,10})(\/[\w]{16,32})(|\.gif|\.jpg|\.jpeg)/g,"<img src=\"$2mw1024$4$5\">")
};