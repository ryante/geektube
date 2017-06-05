<?php
/*************************************************************************
	File Name   : imageMannage.class.php
	Author      : laixing.chen 
	Note        : 附件处理类
	Created Time: 2017年05月27日 10:19:21
 ************************************************************************/
require_once(dirname(dirname(__FILE__)) . '/config/config.inc.php');
require_once(dirname(dirname(dirname(__FILE__))) . '/framework/libs/gd.php');
require_once('Db.php');
class ImageMannage{
	private static $__instance;
    private $__db;
    private $dbprefix;
    public $gdObj;

    private function __construct() {
        global $config;
        $this->dbprefix = $config['db']['prefix'];
        $this->__db = new Db();
        $this->__db->use_db('news');
        $this->gdObj = new gd_lib();
    }


    public static function getInstance() {
        if (!(self::$__instance instanceof self)) {
            self::$__instance = new self;
        }
        return self::$__instance;
    }

    //获取GD生成方案
    public function getGdList() {
        $table = $this->dbprefix . "gd"; 
        $gdList = $this->__db->select($table, '*');
        if (empty($gdList)) {
            return false;
        } 
        return $gdList;
    }

    //按GD方案生成缩略图
    public function createThumb($attach_dir, $fileName, $resId) {
        $table = $this->dbprefix . "res_ext"; 
        $gdlist = $this->getGdList();
        if (empty($gdlist)) {
            return false;
        }
        $filepath = $attach_dir . $fileName;
        foreach($gdlist as $key=>$value){
            $array = array();
            $array["res_id"] = $resId;
            $array["gd_id"] = $value["id"];
            $array["filetime"] = time();
            $gd_tmp = $this->gdObj->gd(DXC_UPLOAD_DIR . $filepath,$resId,$value);
            if($gd_tmp){
                $array["filename"] = $attach_dir . $gd_tmp;
                $exist = $this->__db->select($table,'res_id,gd_id',"res_id={$resId} and gd_id={$value['id']}");
                if (empty($exist)) {
                    $this->__db->insert($table,$array);
                } else {
                    $this->__db->update($table,$array,"res_id={$resId} and gd_id={$value['id']}");
                }
            }
        }

    }

    //后台缩略图
    public function createIco($filepath, $resId, $ext) {
        $ico = $this->gdObj->thumb(DXC_UPLOAD_DIR . $filepath, $resId);
        if(!$ico){
            $ico = "images/filetype-large/". $ext .".jpg";
            if(!file_exists('./'.$ico)){
                $ico = "images/filetype-large/unknown.jpg";
            }
        }
        return $ico;
    }


    //保存缩略图
    public function saveThumb($thumbAttach, $attach_dir) {
        if (empty($thumbAttach) || $thumbAttach['isimage'] == 0) {
            return false;
        }
        $table = $this->dbprefix . "res"; 
        $attrArr= ['width' => $thumbAttach['width'], 'height' => $thumbAttach['height']];    
        $attr =  serialize($attrArr);
        $filename = $thumbAttach['fileName'];
        $filepath = $attach_dir . $filename;
        $ext = $thumbAttach['ext'];
        if (!file_exists(DXC_UPLOAD_DIR . $filepath)) {
            return false;
        }
        $saveData = [
            'cate_id' => 1,
            'folder' => $attach_dir,
            'name' => $filename,
            'ext' => $ext,
            'filename' => $filepath,
            'addtime' => time(),
            'title' => $thumbAttach['alt'],
            'attr' => $attr,
            'admin_id' => OPERATOR_ID,
        ];
        $exist = $this->__db->select($table,'id',"name='{$filename}'");
        if (empty($exist)) {
            $inserResult = $this->__db->insert($table,$saveData);
            $resId = $this->__db->next_id();
        } else {
            $resId = $exist[0]['id'];
            $this->__db->update($table, $saveData, ['id' => $resId]);
        }
        if ($resId) {
            $ico = $this->createIco($filepath, $resId, $ext);
            $this->__db->update($table, ['ico' => $attach_dir . $ico], "id={$resId}");
            $this->createThumb($attach_dir, $filename, $resId);
            return $resId;
        } else{
            return false;
        }
    }


}

