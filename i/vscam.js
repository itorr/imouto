var vsco={
	showImg:function(img){
		$('#showImg').className='show'
		$('#showImg').innerHTML='<img src="'+img+'">'
	}
}
$('#showImg').onclick=function(){
	$('#showImg').className='hide'
	$('#showImg').innerHTML='';
}

$.j('http://dev.vscam.co/i/itorr.pull.js',function(){
	pull.init('grid');

	var VsUid=9,maxNum=30,VsUName='prinexe';

	$.x('http://dev.vscam.co/x/?a=h&n='+maxNum+'&u='+VsUid,function(g){
		if(!g){
			return;
		}

		for(var i=0,o,l=g.length,oTime=2000000000;i<l;i++){
			o=g[i];
			//pull.add(ps[i]);
			//href="http://dev.vscam.co/#!g/'+o.pid+'" target="_blank">\
			pull.add('<a class="co" >\
				'+function(o){
					if(o.wbpid)
						return '<img class="wbpic load" onerror="this.src=\'http://dev.vscam.co/img/s/'+o.origin+'.jpg\'" src="http://ww2.sinaimg.cn/bmiddle/'+o.wbpid;
					else
						return '<img class="load" src="http://dev.vscam.co/img/s/'+o.origin+'.jpg';

				}(o)+'" style="height:'+Math.round(300*o.scale)+'px">\
				<b class="co-pr"><i>'+(o.preset||'vs')+'</i></b>\
			</a>',{
				height:Math.round(300*o.scale),
				wbpid:o.wbpid,
				pid:o.pid
			}).onclick=function(img){
				return function(){
					vsco.showImg(img);
				}
				
			}(o.wbpid?'http://ww2.sinaimg.cn/bmiddle/'+o.wbpid:'http://dev.vscam.co/img/m/'+o.origin+'.jpg')

			if(oTime>o.unix)
				oTime=o.unix;
		}

		if(g.length==maxNum)
			$('#more').innerHTML='<a href="http://dev.vscam.co/#!u/'+VsUName+'/'+oTime+'" class="more">- 查看更多 -</a></div>';
		else
			$('#more').innerHTML='<a href="http://dev.vscam.co/#!u/'+VsUName+'/" class="more">打开我的 VScam.co</a></div>';

		for(var _o=$.S('.co .load'),i=0,l=_o.length;i<l;i++){
			_o[i].onload=function(that){
				return function(){
					that.className=that.className.replace(/load/,'');
				};
			}(_o[i]);
			if(_o[i].complete)setTimeout(_o[i].onload,10);
		}
	});
});