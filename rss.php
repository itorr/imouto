<?php

if(defined('SAE_MYSQL_DB'))
	$sql=new SaeMysql();
else
	require 'x/mysql.class.php';


$list=$sql->getData('SELECT * FROM imouto_article ORDER BY created DESC LIMIT 0,15');





$h='<?xml version="1.0" encoding="UTF-8"?>'."\n".
'<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">'."\n".
'<channel>'."\n".
'	<title>卜卜口</title>'."\n".
'	<link>http://mouto.org/</link>'."\n".
'	<description>94年少年。</description>'."\n".
'	<lastBuildDate>'.date('D, d M Y H:i:s ',$list[0]['created']).'</lastBuildDate>'."\n".
'	<language>zh-CN</language>'."\n";
	foreach($list as $p){
$h.='	<item>'."\n".
'		<title><![CDATA['.$p['title'].']]></title>'."\n".
'		<link>http://mouto.org/#!'.$p['pid'].'</link>'."\n".
'		<category>'.$p['category'].'</category>'."\n".
'		<pubDate>'.date('D, d M Y H:i:s ',$p['created']).'</pubDate>'."\n".
'		<description><![CDATA[';
if($p['cover'])
	$h.='<p><img src="http://ww2.sinaimg.cn/large/'.$p['cover'].'.jpg"></p>';

$h.=$p['text'].']]></description>'."\n".
'	</item>'."\n";
	}
$h.='</channel>'."\n".
'</rss>';


header('Content-type: application/rss+xml;charset=utf-8');
exit($h);

file_put_contents('rss.xml',$h);