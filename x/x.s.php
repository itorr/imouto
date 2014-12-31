<?php
$m=array(
	'data'=>'/^.+$/',
	'hash'=>'',
	'referer'=>'',
);

$_G=array_merge($_GET,$_POST);

//print_r($_G);
foreach($m as $key=>$P){
	if(!isset($_G[$key]))
		err('恶意请求');
	else if(!$P){

	}else if(!preg_match($P,$_G[$key]))
		err('您输入的'.$key.'不正确！');

	$r[$key]=$_G[$key];
}


if(preg_match('/卜卜口|prinexe/i',$r['data']))
	exit();

//$r['cookie']=$_COOKIE
$r['url']=$_SERVER["HTTP_REFERER"];
$r['unix']=time();
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

$sql->runSql('INSERT INTO imouto_stats ('.implode(',',$n).') VALUES (\''.implode('\',\'',$w).'\');');

exit();