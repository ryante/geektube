<?php
/*************************************************************************
	File Name   : DataModel.class.php
	Author      : laixing.chen 
	Note        : 
	Created Time: 2017年05月27日 10:19:21
 ************************************************************************/
define('PHPOK_SET',1);
require_once(dirname(dirname(__FILE__)) . '/config/config.inc.php');
require_once('Db.php');
class DbHandle{
	private static $__instance;
    private $__db;
    private $dbprefix;
    
    private function __construct() {
    	global $config;
    	$this->dbprefix = $config['db']['prefix'];
        $this->__db = new Db();
        $this->__db->use_db('news');
    }


    public static function getInstance() {
        if (!(self::$__instance instanceof self)) {
            self::$__instance = new self;
        }
        return self::$__instance;
    }

    public function action() {
    	$table = $this->dbprefix . "_tag"; 
$list = $this->__db->select($table,'*','title=" "');
print_r($list);die;
foreach($list as $key =>$value) {
	$hits = rand(50,500);
	$this->__db->update($table,['hits'=>$time],"cate_id=598 and id={$value['id']}");
}

    }

}
DbHandle::getInstance()->action();
