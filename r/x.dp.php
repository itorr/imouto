<?php

if(!isset($_POST['pid'])||!preg_match('/^[0-9]{1,15}$/',$_POST['pid']))
	err('您要删除的文章不存在');


$sql->runSql('DELETE FROM imouto_article WHERE pid='.$_POST['pid']);

$r['pid']=$_POST['pid'];