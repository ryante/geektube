<?php
define("PHPOK_SET",1);
require_once('utils/dxcsdk.class.php');
require_once('utils/dataModel.class.php');
require_once('utils/dataFormat.class.php');
$dxc_api = new dxc_api();
class dxc_api{
    public $dataModelObj;
    public $dataFormatObj;
    function __construct(){
        $sdk = new dxcsdk();
        $this->dataModelObj = DataModel::getInstance();
        $this->dataFormatObj = DataFormat::getInstance();
        $sdk->charset = 'utf-8';//编码 gbk 或 utf-8
        $action = $_POST['action'];
    	$api_key = $_POST['api_key'];


        //这里做一些判断
        if(empty($action) || empty($api_key)) return;

		$allow_actions = array('api_info', 'category_list',  'field_data', 'post_data', 'attach_upload');
		if(!in_array($action, $allow_actions)) return;


		$result_data = array('status' => 0, 'msg'=> 'ok', 'data' => array());


        ob_end_clean();
        ob_start();

        //每次需要检测密钥是否正确
		if(DXC_API_SECRET != $api_key){
			$result_data['status'] = -1;
			$result_data['msg'] = '密钥错误';
			echo $sdk->json_encode($result_data);
			exit();
		}


		echo $sdk->json_encode($this->$action());
		exit();


    }

    //连接接口
    function api_info(){
    	$result_data = array('status' => 0, 'msg'=> 'ok', 'data' => array());
        $system['cms_type'] = '自定义网站';//cms类型 比如discuz、wordpress、phpwind等等。如果是自定义，可选
        $system['cms_vertion'] = '1.0.0';//版本号，可选
    	$system['api_version'] = '1.0.0';//接口的版本，可选
    	$system['charset'] = 'utf-8';//编码，必填。
        $result_data['data'] = $system;
        return $result_data;
    }

    //栏目接口
    function category_list(){
        $result_data = array('status' => 0, 'msg'=> 'ok', 'data' => array());
		$categery_data = array();

        /*
        数据说明:
        id 分类的id
        name 分类名称
        parent_id 上级分类id
        disabled 分类是否可以选择 1表示只是列出，用户不能选择。
        */
        $cateList = $this->dataModelObj->getCateList();
        if (!empty($cateList)) {
            foreach ($cateList as $key => $value) {
                $categery_data[$key]['id'] = $value['id'];
                $categery_data[$key]['parent_id'] = $value['parent_id'];
                $categery_data[$key]['name'] = $value['title'];
                $categery_data[$key]['disabled'] = $value['parent_id'] != 0 ? 0 :1;//父类ID不允许选择
            }
        }

		$result_data['data']['categery_data'] = $categery_data;
        $result_data['data']['multiselect'] = 0;//栏目是否多选 1多选 0单选
		return $result_data;
    }


    //字段接口
    function field_data(){
    	$result_data = array('status' => 0, 'msg'=> 'ok', 'data' => array());
        //分类id。当用户选择分类之后，发送api请求，返回字段列表。根据分类ID，返回不同的字段数据。
        $catid = $_POST['cat_data']['catid'];

        //字段数据，按照下面的格式
        $fields = $this->dataModelObj->getFields($catid);
        if (!empty($fields)) {
            foreach ($fields as $key => $value) {
                $tpl_data[$value['identifier']] = ['name' => $value['title'] ];
            }
        }
        $result_data['data']['bind'] = $tpl_data;

        //辅助设置的扩展字段
        $result_data['data']['ext'] = array(
            'hits' => [
                'type' => 'text',
                'name' => '文章查看数',
                'desc' => '',
                'default_val' => '0'
            ],
            'uid' => [
                'type' => 'text',
                'name' => '发布者UID',
            ],
            'status' => [
                'type' => 'radio',
                'name' => '审核',
                'desc' => '选择需要审核，发布的数据需要人工在后台审核后才可以发布到站点上，选择不需要审核，发布的数据直接发布到站点上',
                'data' => array('0' => '需要', '1' => '不需要'),
                'default_val' => '0'
            ],
            'view_num' => ['type' => 'hide'],
            'public_time' => ['type' => 'hide'],
            'public_uid' => ['type' => 'hide'],
            'reply_uid' => ['type' => 'hide'],
            'reply_time' => ['type' => 'hide'],

        );

        return $result_data;

    }

    //附件上传接口
    function attach_upload(){
		$result_data = array('status' => 0, 'msg'=> 'ok', 'data' => array());
        $temp_dir = DXC_UPLOAD_DIR . 'res/attach/';//图片上传的临时路径。文章发布时，先把图片上传到临时目录，然后再发布到数据库，请确保这个目录有可写权限。
		$re = dxcsdk::upload($temp_dir);
	    if($re < 0) {
	        $result_data['status'] = -2;
	        $result_data['msg'] = '服务器的 '.$temp_dir.' 目录必须设置可写权限';
			return $result_data;
	    } else {
	        return $result_data;
	    }
	}


    //数据接收接口
    function post_data(){
		$result_data = array('status' => 0, 'msg'=> 'ok', 'data' => array());
        $attach_temp_dir = 'res/attach/';//图片临时目录,跟attach_upload保持一致
        //这一步主要是接收post过来的数据
		$post_data = dxcsdk::get_post_data($attach_temp_dir);

        //数据是否存在
        $id = $this->dataModelObj->existData($post_data['id'], $post_data['field_data']['linkurl']);
        if ($id) {
            $result_data['data']['data_url'] = 'http://' . $_SERVER['HTTP_HOST'] . '/index.php?id=' . $id;
            $result_data['data']['data_id'] = $post_data['id'];
            return $result_data;
        }

        /*
        $post_data数据结构说明：
        $post_data['post_config'] 存放辅助设置
        $post_data['field_data'] 存放字段数据，比如 $post_data['field_data']['title']是获取标题，如果一个字段是循环获取，有多条，那么$post_data['field_data']['title']就是一个数组
        $post_data['attach_list'] 存放附件信息，  比如 $post_data['attach_list']['title'] 存放的是title的附件信息。
        */
        $cateid = $post_data['post_config']['cat_data']['catid'];
        $hits = $post_data['post_config']['field_ext']['hits'];
        $uid = $post_data['post_config']['field_ext']['uid'];
        $status = $post_data['post_config']['field_ext']['status'];
        $fields = $this->dataModelObj->getFields($cateid);

        foreach ($fields as $k => $v) {
            if ($v['identifier'] == 'tag') {
                continue;
            }
            if (empty($post_data['field_data'][$v['identifier']])) {
                $result_data['status'] = -1;
                $result_data['msg'] = $v['title'] . '不能为空';
                return $result_data;
            } 
        }
        $saveData['hits'] = $hits;
        $saveData['uid'] = $uid;
        $saveData['cate_id'] = $cateid;
        $saveData['data_id'] = $post_data['id'];
        $saveData['publish_time'] = time();
        $saveData['status'] = $status;
        $saveData['title'] = $post_data['field_data']['title'];
        $saveData['linkurl'] = $post_data['field_data']['linkurl'];
        $saveData['tag'] = $this->dataFormatObj->tagFormat($post_data['field_data']['tag']);
        $saveData['dateline'] = $post_data['field_data']['dateline'];
        $saveData['note'] = $post_data['field_data']['note'];
        $saveData['thumb'] = $this->dataFormatObj->thumbFormat($post_data['attach_list']['thumb']['attach'], $attach_temp_dir . $post_data['id'].'/');
        $saveData['content'] = $this->dataFormatObj->contentFormat($post_data['field_data']['content'], $post_data['attach_list']['content'], $attach_temp_dir . $post_data['id'].'/');
        $insertId = $this->dataModelObj->save($saveData);

        $logData = json_encode($saveData);
        $log = date('Y-m-d H:i:s') . "  ip:{$_SERVER['REMOTE_ADDR']}   linkurl:{$post_data['field_data']['linkurl']}    dataid:{$post_data['id']}    cateid:{$cateid}   insertId:{$insertId}";
        file_put_contents('tmp/publish.log', $log . "\n", FILE_APPEND );

        //数据发布成功之后，返回两个东西
        //data_url 发布之后的文章地址
        //data_id 发布之后的文章id
		$result_data['data']['data_url'] = 'http://' . $_SERVER['HTTP_HOST'] . '/index.php?id=' . $insertId;
		$result_data['data']['data_id'] = $post_data['id'];
		return $result_data;

	}

   


}



?>
