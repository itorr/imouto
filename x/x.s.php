<?php
if(!isset($_GET['q']))
	err();

$q=addslashes($_GET['q']);

$r=$sql->getData('SELECT * FROM imouto_article WHERE title LIKE "%'.$q.'%" OR text LIKE  "%'.$q.'%" OR category LIKE "%'.$q.'%" LIMIT 0,30');


if($r)
	$r=array_map(function($o){
		$content=$o['text'];
		$o['text']=($i=strpos($content,'<!--more-->'))!==false?substr($content,0,$i+11):$content;

		$o['text']=strip_tags($o['text']);
		$o['text']=mb_substr($o['text'],0,100).'…';
		$o['text']=str_replace(PHP_EOL,' ',$o['text']); 
		unset($o['modified']);

		return $o;
	},$r);
