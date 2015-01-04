<?php

foreach(array(
	'author'=>'/^.+$/',
	'mail'=>'/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/',
	'url'=>'/^(?:http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?|)$/',
	'text'=>'/^.+$/s',
	'pid'=>'/^[0-9]{1,10}$/',
) as $key=>$P){
	if(!isset($_POST[$key]))
		err('恶意请求');
	if(!preg_match($P,$_POST[$key]))
		err('您输入的'.$key.'不正确！');

	$r[$key]=$_POST[$key];
}

$p=$sql->getLine('SELECT pid FROM imouto_article WHERE pid='.$_POST['pid']);
if(!isset($p['pid']))
	err('您评论的文章不存在！');


$r['created']=time();
$r['agent']=$_SERVER['HTTP_USER_AGENT'];
$r['ip']=$_SERVER['REMOTE_ADDR'];


//var_dump($r);

$n=array();
$w=array();
foreach($r as $i=>$p){
	$n[]=$i;
	//var_dump($p);
	$w[]=is_string($p)?addslashes($p):$p;
}

$sql->runSql('INSERT INTO imouto_comments ('.implode(',',$n).') VALUES (\''.implode('\',\'',$w).'\');');

//exit();


//$r['agent']=$r['agent'];
$r['avatar']=md5($r['mail']);

unset($r['ip']);
unset($r['mail']);
unset($r['modified']);