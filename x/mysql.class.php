<?php 

class SaeMysql{

	/*运行Sql语句,不返回结果集*/
	public function runSql($sql){
		$db=$this->db();
		
		$result=mysql_query($sql,$db);
		$this->save_error($db);
		return $result;
	}

	/*运行Sql,以多维数组方式返回结果集*/
	public function getData($sql,$type=1){
		$data=Array();

		$db=$this->db();
		
		$result=mysql_query($sql,$db);
		$this->save_error($db);

		if(is_bool($result))
			return $result;

		if($type==1)
			while($a=mysql_fetch_array($result,MYSQL_ASSOC))
				$data[]=$a;
		elseif($type==2)
			while($a=mysql_fetch_row($result))
				$data[]=$a;
			
		mysql_free_result($result);
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
		return mysql_affected_rows($this->db());
	}
 
	/**
	 * 同mysql_insert_id函数
	 *
	 * @return int 成功返回last_id,失败时返回false
	 */
	public function lastId(){
		return mysql_insert_id($this->db());
	}
 
	/**
	 * 关闭数据库连接
	 *
	 * @return bool 
	 */
	public function closeDb(){
		if(isset($this->db))
			@mysql_close($this->db);
	}
 
	/**
	 *  同mysql_real_escape_string
	 *
	 * @param string $str 
	 * @return string 
	 */
	public function escape($str){
		return addslashes($str);//$this->db(),
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

	private function connect(){
		$host='localhost';
		if(defined('MYSQL_DATABASE')){
			$dbname=MYSQL_DATABASE;
			$user=MYSQL_USERNAME;
			$pwd=MYSQL_PASSWORD;
		}else{
			$dbname='imouto';
			$user='root';
			$pwd='root';
		}

		$db=mysql_connect($host,$user,$pwd,true);
		mysql_select_db($dbname,$db);
		mysql_set_charset('utf8',$db);

		return $db;
	}

	private function db(){
		if(!isset($this->db)||!mysql_ping($this->db))
			$this->db=$this->connect();

		return $this->db;
	}

	private function save_error($db){
		$this->error=mysql_error($db);
		$this->errno=mysql_errno($db);
	}
}
$sql=new SaeMysql();