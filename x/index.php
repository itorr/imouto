<?php

mb_internal_encoding('UTF-8');

function err($i){
	//exit($i);
	header('Content-type: application/json;charset=utf-8');
	header('Access-Control-Allow-Origin: *');
	exit(json_encode(array('error'=>$i)));
}

if(defined('SAE_MYSQL_DB'))
	$sql=new SaeMysql();
else
	require 'mysql.class.php';

$r=array();


if(preg_match('/^(?:h|p|c|addc|test|t|s|stat)$/',$_GET['a']))
	require 'x.'.$_GET['a'].'.php';


if(isset($_GET['cb'])&&preg_match('/^[\w_\-\.$]{1,200}$/',$_GET['cb'])){
	header('Content-type: application/javascript;charset=utf-8');
	exit($_GET['cb'].'('.json_encode($r).')');
}else{
	header('Content-type: application/json;charset=utf-8');
	header('Access-Control-Allow-Origin: *');

	exit(json_encode($r));
}



