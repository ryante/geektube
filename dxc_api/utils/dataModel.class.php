<?php
/*************************************************************************
	File Name   : DataModel.class.php
	Author      : laixing.chen 
	Note        : 
	Created Time: 2017年05月27日 10:19:21
 ************************************************************************/
require_once(dirname(dirname(__FILE__)) . '/config/config.inc.php');
require_once('Db.php');
class DataModel{
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

    public function getCateList() {
    	$table = $this->dbprefix . "cate"; 
    	$cateList = $this->__db->select($table,'id,parent_id,title',"status=1 and site_id=1");
    	return empty($cateList) ? 0 : $cateList;
    }

    public function getCateParentId($cateid) {
    	$table = $this->dbprefix . "cate"; 
    	$cateInfo = $this->__db->select($table,'parent_id',"status=1 and site_id=1  and id={$cateid}");
    	return empty($cateInfo[0]['parent_id']) ? null : $cateInfo[0]['parent_id'];
    }

    public function getProjectInfo($parent_cateid) {
    	$table = $this->dbprefix . "project"; 
    	$project = $this->__db->select($table,'id,module,alias_title,is_tag',"status=1 and site_id=1 and cate={$parent_cateid}",'',1);
    	return empty($project[0]) ? null : $project[0];
    }

    public function getFields($cateid) {
    	$table = $this->dbprefix . "module_fields"; 
    	$parent_cateid = $this->getCateParentId($cateid);
    	$projectInfo = $this->getProjectInfo($parent_cateid);
    	$mid = $projectInfo['module'];
    	$alias_title = empty($projectInfo['alias_title']) ? '标题' : $projectInfo['alias_title'];
    	$fields = $this->__db->select($table,'title,identifier',"module_id={$mid}",'');
    	$fields[] = ['title' => $alias_title, 'identifier' => 'title'];
    	$fields[] = ['title' => '时间', 'identifier' => 'dateline'];
    	if (!empty($projectInfo['is_tag'])) {
    		$fields[] = ['title' => '标签', 'identifier' => 'tag'];
    	}
    	return $fields;
    }

    public function saveTag($titleId,$tag) {
        if (empty($tag)) {
            return false;
        }
        $tag = explode(',', $tag);
        $listTable = $this->dbprefix . "tag"; 
        $relateTable = $this->dbprefix . "tag_stat"; 
        foreach ($tag as $key => $value) {
            $exist = $this->__db->select($listTable, 'id', "title='{$value}'");
            if (!empty($exist)) {
                $tagId = $exist[0]['id'];
            } else {
                $listData = [
                    'site_id' => 1,
                    'title' => $value,
                ];
                $listResult = $this->__db->insert($listTable,$listData);
                $tagId = $this->__db->next_id();
            }

            if (!empty($tagId)) {
                $relateData = [
                    'title_id' => $titleId,
                    'tag_id' => $tagId,
                ];
                $exist = $this->__db->select($relateTable, 'id', "title_id={$titleId} and tag_id={$tagId}");
                if (empty($exist[0]['id'])) {
                    $relateResult = $this->__db->insert($relateTable,$relateData);
                    if (!$relateResult) {
                         $this->__db->del($listTable,"id=$listId");
                         return false;
                    }
                }
            }
        }
    }

    public function existData($data_id, $linkurl) {
        $newsTable = $this->dbprefix . "list_22"; 
        $exist = $this->__db->select($newsTable, 'id', "data_id='{$data_id}' or linkurl='{$linkurl}'");
        if (!empty($exist[0]['id'])) {
            return $exist[0]['id'];
        } else {
            return false;
        }
    }


    public function save($data) {
    	if (empty($data) || !is_array($data) || empty($data['cate_id'])) {
            return false;
        }

        $listTable = $this->dbprefix . "list"; 
        $newsTable = $this->dbprefix . "list_22"; 
        $relateTable = $this->dbprefix . "tag_stat";
        $listCateTable = $this->dbprefix . "list_cate";
        $exist = $this->__db->select($newsTable, 'id', "data_id='{$data[data_id]}' or linkurl='{$data[linkurl]}'");
        if (!empty($exist)) {
            $this->__db->del($listTable,"id={$exist[0][id]}");
            $this->__db->del($newsTable,"id={$exist[0][id]}");
            //删除Tag相关
            $this->__db->del($relateTable,"title_id={$exist[0][id]}");
            //删除扩展分类
            $this->__db->del($listCateTable,"id={$exist[0][id]}");
            //删除相关的回复信息
            $this->__db->del( $this->dbprefix . "reply","tid={$exist[0][id]}");
        }

        $parent_cateid = $this->getCateParentId($data['cate_id']);
        $projectInfo = $this->getProjectInfo($parent_cateid);
        $mid = $projectInfo['module'];
        $project_id = $projectInfo['id'];
        $listData = [
            'parent_id' => 0,//主题的父ID
            'cate_id' => $data['cate_id'],
            'module_id' => $mid,
            'project_id' => $project_id,
            'site_id' => 1,
            'title' => $data['title'],
            'dateline' => $data['dateline'],
            'status' => $data['status'],
            'hits' => $data['hits'],
            'tag' => $data['tag'],
            'user_id' => $data['uid']
        ];

        $listResult = $this->__db->insert($listTable,$listData);
        $listId = $this->__db->next_id();
        $detailData = [
            'id' => $listId,
            'project_id' => $project_id,
            'cate_id' => $data['cate_id'],
            'site_id' => 1,
            'note' => $data['note'],
            'linkurl' => $data['linkurl'],
            'data_id' => $data['data_id'],
            'thumb' => $data['thumb'],
            'publish_time' => $data['publish_time'],
            'content' => $data['content']
        ];

        if (!$listResult) {
            return false;
        }

        $detailResult = $this->__db->insert($newsTable,$detailData);
        $this->__db->insert($listCateTable, ['id' => $listId, 'cate_id' => $data['cate_id']]);
        if (!$detailResult) {
             $this->__db->del($listTable,"id=$listId");
             return false;
        }

        $this->saveTag($listId, $data['tag']);
        return $listId;

    }

}
