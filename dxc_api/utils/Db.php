<?php
/*
 * 数据库类 用PHP内置的类mysqli二次封装
 * author: huasong
 * */
class Db
{
    private $all_conn=array(); // 已连接的数据库对象数组,key为连接名,value为连接对象
    private $mysqli = NULL; // mysqli对象,数据库连接切换时复用
    public $db = NULL; // 类内当前正在使用的mysqli对象
    public $sql = ''; // // 执行的SQL
    public $debug = true; // // DEBUG设定

    function __construct($debug=true){
        $this->debug = $debug;
    }
    function __destruct(){// mysqli关闭
        if( $this->db ){
            $this->db->close();
        }
        if( $this->all_conn ){
            foreach( $this->all_conn as $_db ){
                if( is_resource($_db) ){
                    $_db->close();
                }
            }
        }
        if( is_resource($this->mysqli) ){
            $this->mysqli->close();
        }
    }

    /*
     * 数据库连接 mysqli对象会存为变量db并存入all_conn
     * */
    function use_db( $conn_name ){
        if( isset( $this->all_conn[$conn_name] ) ){
            $this->db = $this->all_conn[$conn_name];
        }else{
            global $DB_CONFIG;
            if(!isset($DB_CONFIG[$conn_name])){
                if($this->debug){
                    die("db {$conn_name} config name not exist !");
                }else{
                    exit;
                }
            }
            $config = $DB_CONFIG[$conn_name];
            $config_count = count($config);
            if($config_count > 1){ //一般是多个从库的情况，这里简单地采用随机连一个数据库
                $config = $config[rand(0, $config_count - 1)];
            }else{
                $config = $config[0];
            }
            if( ! isset( $this->mysqli ) ){
                //$this->db = $this->mysqli = new mysqli();
            }
            $this->db = $this->mysqli = new mysqli();//当前在用->db
            $this->mysqli->connect( $config['host'], $config['user'], $config['password'], $config['dbname'], $config['port']);
            //var_dump( $this->db );exit();
            if( $this->mysqli->connect_errno ){
                die( "can not connect to the db '{$conn_name}' ! {$this->mysqli->connect_error}\n" );
            }
            $this->db->query("set names {$config['charset']}");
            $this->all_conn[ $conn_name ] = $this->db;
        }
        //return $this;
    }

    /*
     * 查询 返回数组 或 直接结果
     * */
    function query( $sql ){
        if( ! $this->db ){
            die("no db connected, please use the function use_db( conn_name ) to connect one db first !");
        }
        $_query_result = $this->db->query( $sql );
        if( is_object( $_query_result ) ){
            $result = array();
            while( $_result = $_query_result->fetch_array(MYSQL_ASSOC) ){
                $result[] = $_result;
            }
            $_query_result->free();
            return $result;
        }
        else{
            return $_query_result;
        }
    }

    /**
     * 执行查询
     * 
     * @param string $table 操作的表
     * @param mixed  $fields 查询的字段信息,字符串|数组
     * @param mixed $where WHERE查询
     * @param string $order 排序
     * @param string $limit 结果集条目
     * @return array 返回结果数组
     */

    public function select($table, $fields = "*", $where = "", $order = "", $limit = "") {
        if(is_array($fields)){
            $fields = implode(',', $fields);
        }elseif(!is_string($fields) || $fields==''){
            return false;
        }
        if($order){
            $order = " ORDER BY {$order}";
        }
        if($limit){
            $limit = "LIMIT {$limit}";
        }
        $where = self::get_where($where);
        $this->sql = "SELECT {$fields} FROM {$table} WHERE 1 = 1 {$where} {$order} {$limit}"; 
        return self::query($this->sql);
    }

    /**
     * 执行插入
     *
     * @param string $table 操作的表
     * @param array $data 数组，使用字段为键名，如array('id'=>1,'name'=>'hello');
     * @param array $onDuplicateUpdateData数组，字段为建名，如array( 'id'=>1, 'name'=>hello )
     * @return bool 返回结果
     */

    public function insert($table, $data, $onDuplicateUpdateData=array()){
        foreach($data as $key => $value){
            $data[$key] = $this->db->real_escape_string($value);
        }
        $column = implode("`,`",array_keys($data));
        $values = implode("','",array_values($data));

        if( $onDuplicateUpdateData ){
            $onDuplicateUpdateData_sql =  "on duplicate key update ";
            $onDuplicateUpdateData_count = count( $onDuplicateUpdateData );
            $separate = ',';
            $num = 0;
            foreach( $onDuplicateUpdateData as $key => $value ){
                $num++;
                if( $onDuplicateUpdateData_count == $num ){
                    $separate = '';
                }
                $onDuplicateUpdateData_sql .= "`{$key}`='{$this->db->real_escape_string($value)}'{$separate}";
            }
        }

        $this->sql = "INSERT INTO {$table} (`{$column}`) VALUES ('{$values}') {$onDuplicateUpdateData_sql}";
        return self::query($this->sql);
    }


    /**
     * 执行更新
     *
     * @param string $table 操作的表
     * @param array $data 更新数据
     * @param string $where WHERE查询
     * @param string $other_where 其他不规则的WHERE字句
     * @return bool 返回结果
     */

    public function update($table, $data, $where, $other_where=''){
        $fv = array();
        foreach($data as $key => $value){
            $fv[] = "`$key` = '".$this->db->real_escape_string($value)."'";
        }
        $where = self::get_where($where);
        if($other_where){
            $other_where = " AND $other_where";
        }
        $this->sql = "UPDATE {$table} SET ";
        $this->sql .= implode(",", $fv);
        $this->sql .= " WHERE 1 = 1 {$where}{$other_where}";
        return self::query($this->sql);
    }


    /**
     * 执行删除
     *
     * @param string $table 操作的表
     * @param mixed $in_name SQL里的WHERE,字符串|数组
     * @param string $other_where 其他不规则的WHERE字句
     * @return bool 返回结果
     */

    public function del($table, $where, $other_where = ""){
        $where = self::get_where($where);
        if($other_where){
            $other_where = " AND $other_where";
        }
        $this->sql = "DELETE FROM {$table} WHERE 1 = 1 {$where} {$other_where}";
        return self::query($this->sql);
    }

    /**
     *
     *
     *
     */
    public function next_id(){
        if( ! isset( $this->db ) ) return false;
        return $this->db->insert_id;
    }
    /**
     * 组织sql WHERE 字句
     *
     * @param mixed $in_data 字符串|数组
     * @return string 返回字句
     */

    public function get_where($where){
        if(!$where) return '';
        if(is_string($where)){
            $where = "AND $where";
        }
        elseif(is_array($where)){
            $cv = array();
            foreach($where as $key=>$value){
                if(is_array($value)){
                    $cv[] = self::get_in($key, $value);
                }else{
                    $cv[] = "AND `$key`='".$this->db->real_escape_string($value)."' ";
                }
            }
            $where = implode(" ", $cv);
        }
        return $where;
    }
    /**
     * 组织sql IN 字句，用or代替IN
     * @param $field 字段
     * @param array $data 数组
     * @return string 返回字句
     */
    public function get_in($field, $data){
        //AND (`f` = $data1 OR `f` = $data2....)
        $out = array();
        foreach($data as $d){
            $out[] = "`$field` = '$d'";
        }
        return "AND (" . implode(" OR ", $out) . ")";

    }
}
