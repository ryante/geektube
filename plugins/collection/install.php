<?php
/*****************************************************************************************
	文件： plugins/collection/install.php
	备注： 采集器<插件安装>
	版本： 4.x
	网站： www.phpok.com
	作者： phpok.com
	时间： 2015年08月24日 08时45分
*****************************************************************************************/
class install_collection extends phpok_plugin
{
	public $me;
	public function __construct()
	{
		parent::plugin();
		$this->me = $this->plugin_info();
	}
	//插件安装时，增加的扩展表单输出项
	public function index()
	{
		$top_menu_list = $this->model('sysmenu')->get_list(0,1);
		$this->assign('top_menu_list',$top_menu_list);
		$rescatelist = $this->model('rescate')->get_all();
		$this->assign('res_catelist',$rescatelist);
		return $this->plugin_tpl('install.html');
	}
	//插件安装时，保存扩展参数
	public function save()
	{
		$id = $this->plugin_id();
		$this->load_sql($id);
		$root_id = $this->get('root_id','int');
		//添加到菜单管理
		$array = array('title'=>'采集器','parent_id'=>$root_id);
		$array['status'] = 0;
		$array['appfile'] = 'plugin';
		$array['taxis'] = $this->get("taxis",'int');
		$array['func'] = 'exec';
		$array['ext'] = 'id='.$id.'&exec=manage';
		$array['if_system'] = 0;
		$array['site_id'] = $_SESSION['admin_site_id'];
		$insert_id = $this->model('sysmenu')->save($array);
		$ext = array();
		$ext['root_id'] = $root_id;
		$ext['sysmenu_id'] = $insert_id;
		$ext['rescate'] = $this->get('rescate','int');
		$ext['keyfrom'] = $this->get('keyfrom');
		$ext['keyid'] = $this->get('keyid');
		$this->plugin_save($ext,$id);
	}

	private function load_sql($id)
	{
		if(!file_exists($this->me['path'].'collection.sql')){
			$this->model('plugin')->delete($id);
			error('安装失败，缺少SQL文件',$this->url('plugin'),'error');
		}
		$sql = file_get_contents($this->me['path'].'collection.sql');
		$sql = str_replace("\r","\n",$sql);
		if($this->db->prefix != 'qinggan_'){
			$sql = str_replace("qinggan_",$this->db->prefix,$sql);
		}
		$ret = array();
		$num = 0;
		foreach(explode(";\n", trim($sql)) as $query){
			$queries = explode("\n", trim($query));
			foreach($queries as $query){
				$ret[$num] .= $query[0] == '#' || $query[0].$query[1] == '--' ? '' : $query;
			}
			$num++;
		}
		foreach($ret as $query){
			$query = trim($query);
			if($query){
				$this->db->query($query);
			}
		}
		return true;
	}
}