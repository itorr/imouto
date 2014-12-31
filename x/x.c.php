<?php
if(!isset($_GET['id'])||!preg_match('/^[0-9]{0,10}$/',$_GET['id']))
	err('恶意请求');

$r=$sql->getData('SELECT * FROM imouto_comments WHERE pid='.$_GET['id']);


if($r)
	$r=array_map(function($o){
		$o['agent']=$o['agent'];
		$o['avatar']=md5(strtolower($o['mail']));

		unset($o['pid']);
		unset($o['ip']);
		unset($o['mail']);
		unset($o['modified']);

		return $o;
	},$r);
