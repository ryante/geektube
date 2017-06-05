<?php
/*************************************************************************
	File Name   : DataFormat.class.php
	Author      : laixing.chen 
	Note        : 
	Created Time: 2017年05月27日 10:19:21
 ************************************************************************/
define('PHPOK_SET', 1);
require_once(dirname(dirname(__FILE__)) . '/config/config.inc.php');
require_once(dirname(dirname(__FILE__)) . '/utils/Db.php');
class DataCheck{
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

    public function getExtc($identifier) {
        if (empty($identifier)) {
            return false;
        }
        $extTable = $this->dbprefix . 'ext';
        $extcTable = $this->dbprefix . 'extc';
        $query = "SELECT a.identifier,b.content FROM {$extTable} a INNER JOIN {$extcTable} b ON a.id = b.id WHERE a.identifier='{$identifier}'";
        $result = $this->__db->query($query);
        return $result[0]['content'];
    }

    public function getCheckList($startTime) {
        if (empty($startTime) || !is_numeric($startTime)) {
            return false;
        }
        $listTable = $this->dbprefix . 'list';
        $detailTable = $this->dbprefix . 'list_22';
        $endTime = $startTime - 60;//计划任务每分钟运行一遍，所以减60
        $query = "SELECT a.id FROM {$listTable} a INNER JOIN {$detailTable} b ON a.id = b.id WHERE a.status=0 AND b.publish_time >= {$startTime} AND b.publish_time < {$endTime}";
        $result = $this->__db->query($query);
        if (empty($result)) {
            return false;
        } else {
            return $result;
        }
    }

    public function publish($id) {
        if (empty($id) || !is_numeric($id)) {
            return false;
        }
        $listTable = $this->dbprefix . "list";
        $detailTable = $this->dbprefix . "list_22";
        $result = $this->__db->update($listTable,['status' => 1], "id={$id}");
        if (!$result) {
            return false;
        }
        $this->__db->update($detailTable,['publish_time' => 0], "id={$id}");//,通过会将publish_time设置为0,
        return true;
    }

    public function main() {
        $listTable = $this->dbprefix . "list";
        $checkTime = $this->getExtc('collection_check_time');
        if ($checkTime > 0) {
            $startTime = time() - $checkTime * 60;
            $newsList = $this->getCheckList($startTime);
            if (empty($newsList)) {
                return false;
            }
            foreach ($newsList as $key => $value) {
                $result = $this->publish($value['id']);
                $resultStr = $result ? 'success' : 'error';
                echo date('Y-m-d H:i:s') . "  id:{$value['id']}  update:{$resultStr}\n";
            }
        } else {
            echo date('Y-m-d H:i:s') . "just allow man check\n";
        }
    }
    
}
DataCheck::getInstance()->main();
