<?php
/*****************************************************************************************
	文件： plugins/collection/setting.php
	备注： 采集器<插件配置>
	版本： 4.x
	网站： www.phpok.com
	作者： phpok.com
	时间： 2015年08月24日 08时45分
*****************************************************************************************/
class setting_collection extends phpok_plugin
{
	public $me;
	public function __construct()
	{
		parent::plugin();
		$this->me = $this->plugin_info();
	}
	//插件配置参数时，增加的扩展表单输出项
	public function index()
	{
		$top_menu_list = $this->model('sysmenu')->get_list(0,1);
		$this->assign('top_menu_list',$top_menu_list);
		$rescatelist = $this->model('rescate')->get_all();
		$this->assign('res_catelist',$rescatelist);
		return $this->plugin_tpl('install.html');
	}
	//插件配置参数时，保存扩展参数
	public function save()
	{
		$id = $this->plugin_id();
		$ext = array();
		$ext['root_id'] = $this->get('root_id');
		if($ext['root_id'] != $this->me['param']['root_id'] && $this->me['param']['sysmenu_id']){
			$array = array('parent_id'=>$ext['root_id']);
			$this->model('sysmenu')->save($array,$this->me['param']['sysmenu_id']);
		}
		$ext['sysmenu_id'] = $this->me['param']['sysmenu_id'];
		$ext['rescate'] = $this->get('rescate','int');
		$ext['keyfrom'] = $this->get('keyfrom');
		$ext['keyid'] = $this->get('keyid');
		$this->plugin_save($ext,$id);
	}
	//插件执行审核动作时，执行的操作
	public function status()
	{
		//执行一些自定义的动作
		$rs = $this->plugin_info();
		$this->model('sysmenu')->update_status($rs['param']['sysmenu_id'],$rs['status']);
	}
	
}