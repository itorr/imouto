<?php

$m=array(
	//'title'=>'/^.+$/',
	'cover'=>'/^([\w]{16,32}|)$/',
	//'text'=>'/^.+$/',
	'category'=>'/^[\w]{2,10}$/',
	'authorId'=>'/^[0-9]{1,4}$/',
);



foreach($m as $key=>$P){
	if(!isset($_POST[$key]))
		err('恶意请求');
	if(!preg_match($P,$_POST[$key]))
		err('您输入的'.$key.'不正确！');

}

$t=time();



if(!isset($_POST['pid'])||!preg_match('/^[0-9]{1,15}$/',$_POST['pid']))
	err('您要修改的文章不存在');

$pid=$_POST['pid'];
unset($_POST['pid']);

$p=$sql->getLine('SELECT pid FROM imouto_article WHERE pid='.$pid);

if(!isset($p['pid']))
	err('您要修改的文章不存在');


$_POST['modified']=$t;


$n=array();
foreach($_POST as $i=>$p){
	$n[]=$i.'=\''.(is_string($p)?$sql->escape($p):$p).'\'';
}

$sql->runSql('UPDATE imouto_article SET '.implode(',',$n).' WHERE pid='.$pid);

$r['pid']=$pid;