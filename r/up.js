var UP=function($){
	if(!window.XMLHttpRequest||!window.FileReader)
		return;

	var 
	_html=$('html'),
	pace=$('pace');




	if(!pace){
		pace=$.D.m('pace');
		pace.id='pace';
		$.D.a(pace);
	}

	_html.onmouseout=function(e){
		$('#co').className='';
	};

	_html.ondragover=function(e){
		e.preventDefault();
		$('#co').className='drop';

	};
	_html.ondrop=function(e){
		e.preventDefault();
		handleFile(e.dataTransfer.files);
	};
	/*
	$('#dragF').onchange=function(){
		handleFile(this.files)
	};
	*/
	var handleFile=function(files){
		if(files.length==0){
			//alert('如果拖图像进来我会很高兴哟~');
			return;
		}
		
		var 
		now=0,max=files.length,
		f=function(){

			var file=files[now];
			//console.log(file);
			if(file.type.indexOf('image')!=0){
				alert('这不是一个图像或音频！');
				return;
			}
			if(!file.size>2000000){
				alert('请上传小于2MB大小的图像！');
				return;
			}



			//alert('上传中...');


			var xhr=new XMLHttpRequest();
			if(xhr.upload)
				xhr.upload.onprogress=function(e){
					$.css(pace,'width:'+e.loaded/e.total*100+'%');
				};
			
			// 文件上传成功或是失败
			xhr.onreadystatechange=function(e){
				if(xhr.readyState==4){
					
					/*
					var d=JSON.parse(xhr.responseText);

					if(d.error)
						return alert(d.error);
*/
					//console.log(d);

					//location.href='#!aff/'+d.pid;

					var I=$('textarea[name="text"]');

					I.value+=(I.value?'\n':'')+'http://ww2.sinaimg.cn/large/'+xhr.responseText.match(/[\w]{24,32}/)+'\n';

					I.onkeydown();
					
					$.css(pace,'width:0;');

					//$.D.d(pace);

					now++;

					if(now>=max){

					}else{
						f();
					}
				}
			};
			xhr.open('POST','http://x.mouto.org/wb/x.php?up&_r='+Math.random(),1);
			//xhr.setRequestHeader('X_FILENAME',encodeURIComponent(file.name));
			xhr.send(file);
			
		};
		f();
	};

}(iTorr);