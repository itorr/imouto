<?php

/**
 * User: TMs
 * Date: 2016-06-06
 * Time: 15:30
 */

require 'DB_driver.php';

$db_driver = 'PDO';//当前可选driver:Mysql,PDO;
$host = 'localhost';
$port = 3306;
if(defined('MYSQL_DATABASE')){
    $dbname=MYSQL_DATABASE;
    $user=MYSQL_USERNAME;
    $pwd=MYSQL_PASSWORD;
}elseif(getenv('OPENSHIFT_APP_NAME')){
    $host=getenv('OPENSHIFT_MYSQL_DB_HOST');
    $port=getenv('OPENSHIFT_MYSQL_DB_PORT');
    $dbname=getenv('OPENSHIFT_APP_NAME');
    $user=getenv('OPENSHIFT_MYSQL_DB_USERNAME');
    $pwd=getenv('OPENSHIFT_MYSQL_DB_PASSWORD');
}else{
    $dbname='imouto';
    $user='root';
    $pwd='root';
}

$driver = 'DB_'.$db_driver;
$sql = new $driver($host,$port,$user,$pwd,$dbname);