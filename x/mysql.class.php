<?php

/**
 * User: TMs
 * Date: 2016-06-06
 * Time: 15:30
 */

require "DB_driver.php";

$db_driver = 'PDO';//当前可选driver:Mysql,PDO;
$host = 'localhost';
if(defined('MYSQL_DATABASE')){
    $dbname=MYSQL_DATABASE;
    $user=MYSQL_USERNAME;
    $pwd=MYSQL_PASSWORD;
}else{
    $dbname='imouto';
    $user='root';
    $pwd='root';
}

$driver = 'DB_'.$db_driver;
$sql = new $driver($host,$user,$pwd,$dbname);