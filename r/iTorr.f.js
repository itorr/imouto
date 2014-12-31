$.onsubmit=function(F,cb){
	F.onsubmit=function(){
		for(var i=0,l=F.length,o,r=[];i<l;i++){
			o=F[i];
			if(o.name){
				if(o.required&&(
					!o.value
					||(o.type=='email'&&!o.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/))
					||(o.type=='url'&&!o.value.match(/^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?$/))
					)
				){
					alert('请输入正确的'+o.title);
					o.focus();
					return false;
				}else if(o.type=='radio'){
					if(o.checked==1)
						r.push(o.name+'='+encodeURIComponent(o.value));
				}else
					r.push(o.name+'='+encodeURIComponent(o.value));
			}
			
		}
		$.x(F.action,r.join('&'),cb)
		return false
	};
};