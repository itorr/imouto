<?php

/**
 * User: TMs
 * Date: 2016-06-06
 * Time: 14:35
 */

require_once('drivers/Mysql.php');
require_once('drivers/PDO.php');
interface DB_driver
{
    function connect();
    function closeDb();
    function runSql($sql);
    function getData($sql, $type);
    function getLine($sql);
    function getVar($sql);
    function affectedRows();
    function lastId();
    function escape($str);
    function errno();
    function error();
}