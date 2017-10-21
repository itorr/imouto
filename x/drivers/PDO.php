<?php

/**
 * Author: TMs
 * Date: 2016-06-06
 * Time: 14:25
 */

class DB_PDO implements DB_driver
{
    private $db='';
    private $host;
    private $port;
    private $user;
    private $pwd;
    private $dbname;

    public function __construct($host, $port, $user, $pwd, $dbname){
        $this->host = $host;
        $this->port = $port;
        $this->user = $user;
        $this->pwd = $pwd;
        $this->dbname = $dbname;
        $this->db = $this->connect();
    }

    public function connect(){
        $params = array (
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'' ,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        );
        try{
            $db = new PDO('mysql:host='.$this->host.';dbname='.$this->dbname.';port='.$this->port, $this->user, $this->pwd,$params);
        }catch(PDOException $e){
            $e->getMessage();
            die();
        }
        return $db;
    }

    /**
     * 关闭数据库连接
     *
     * @return bool
     */
    public function closeDb(){
        $this->db = null;
    }
    /*运行Sql语句,不返回结果集*/
    public function runSql($sql){
        $db=$this->db();

        $result=$db->query($sql);
        $this->save_error($db);
        return $result;
    }

    /*运行Sql,以多维数组方式返回结果集*/
    public function getData($sql,$type=1){
        $data=Array();
        $db=$this->db();

        $result=$db->query($sql);
        $sth = $db->prepare($sql);
        $sth->execute();
        if(is_bool($result))
            return $result;
        if($type==1)
            while($a = $sth->fetch(PDO::FETCH_ASSOC))
                $data[]=$a;
        elseif($type==2)
            while($a = $sth->fetch(PDO::FETCH_BOTH))
                $data[]=$a;

        if($data)
            return $data;
        else
            return NULL;
    }

    /**
     * 运行Sql,以数组方式返回结果集第一条记录
     *
     * @param string $sql
     * @return array 成功返回数组，失败时返回false
     */
    public function getLine($sql){
        $data=$this->getData($sql);
        if($data)
            return @reset($data);
        else
            return false;
    }

    /**
     * 运行Sql,返回结果集第一条记录的第一个字段值
     *
     * @param string $sql
     * @return mixxed 成功时返回一个值，失败时返回false
     */
    public function getVar($sql){
        $data=$this->getLine($sql);
        if($data)
            return $data[@reset(@array_keys($data))];
        else
            return false;
    }

    /**
     * 同mysql_affected_rows函数
     *
     * @return int 成功返回行数,失败时返回-1
     * @author Elmer Zhang
     */
    public function affectedRows(){
        return $this->db()->rowCount();
    }

    /**
     * 同mysql_insert_id函数
     *
     * @return int 成功返回last_id,失败时返回false
     */
    public function lastId(){
        return $this->db()->lastInsertId();
    }


    /**
     *  同mysql_real_escape_string
     *
     * @param string $str
     * @return string
     */
    public function escape($str){
        return addslashes($str);//$this->db,
    }

    /**
     * 返回错误码
     *
     *
     * @return int
     */
    public function errno(){
        return $this->errno;
    }

    /**
     * 返回错误信息
     *
     * @return string
     */
    public function error(){
        return $this->error;
    }

    private function db(){
        if(!isset($this->db))
            $this->db=$this->connect();
        return $this->db;
    }

    private function save_error($db){
        $this->error=$db->errorInfo();
        $this->errno=$db->errorCode();
    }
}
