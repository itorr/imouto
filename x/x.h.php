<?php

$w=array();

if(isset($_GET['s'])&&preg_match('/^[0-9]{10}$/',$_GET['s']))
	$w[]='created<'.$_GET['s'];

if(isset($_GET['c'])&&preg_match('/^[\w]{1,10}$/',$_GET['c']))
	$w[]='category="'.$_GET['c'].'"';

if(isset($_GET['u'])&&preg_match('/^[\w]{1,10}$/',$_GET['u']))
	$w[]='authorId="'.$_GET['u'].'"';


$n='5';
if(isset($_GET['n'])&&preg_match('/^[\w]{1,2}$/',$_GET['n']))
	$n=$_GET['n'];


$w=implode(' && ',$w);

if($w)
	$w=' WHERE '.$w;

$r=$sql->getData('SELECT * FROM imouto_article'.$w.' ORDER BY created DESC LIMIT 0,'.$n);

if($r)
	$r=array_map(function($o){
		$content=$o['text'];
		$o['text']=($i=strpos($content,'<!--more-->'))!==false?substr($content,0,$i+11):$content;

		unset($o['modified']);

		return $o;
	},$r);
//$r=array('123132');