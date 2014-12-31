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

$_POST['created']=$t;
$_POST['modified']=$t;


$n=array();
$w=array();
foreach($_POST as $i=>$p){
	$n[]=$i;
	$w[]=is_string($p)?$sql->escape($p):$p;
}
$sql->runSql('INSERT INTO imouto_article ('.implode(',',$n).') VALUES (\''.implode('\',\'',$w).'\');');


$r=array(
	'pid'=>$sql->lastId()
);