<?php
/*****************************************************************************************
	文件： plugins/collection/uninstall.php
	备注： 采集器<插件卸载>
	版本： 4.x
	网站： www.phpok.com
	作者： phpok.com
	时间： 2015年08月24日 08时45分
*****************************************************************************************/
class uninstall_collection extends phpok_plugin
{
	public $me;
	public function __construct()
	{
		parent::plugin();
		$this->me = $this->plugin_info();
	}
	//插件卸载时，执行的方法，如删除表，或去除其他一些选项
	public function index()
	{
		//执行一些自定义的动作
		$this->model('sysmenu')->delete($this->me['param']['sysmenu_id']);
		//删除表操作
		$sql = "DROP TABLE ".$this->db->prefix."collection";
		$this->db->query($sql);
		$sql = "DROP TABLE ".$this->db->prefix."collection_fields";
		$this->db->query($sql);
		$sql = "DROP TABLE ".$this->db->prefix."collection_files";
		$this->db->query($sql);
		$sql = "DROP TABLE ".$this->db->prefix."collection_format";
		$this->db->query($sql);
		$sql = "DROP TABLE ".$this->db->prefix."collection_list";
		$this->db->query($sql);
		$sql = "DROP TABLE ".$this->db->prefix."collection_site";
		$this->db->query($sql);
		$sql = "DROP TABLE ".$this->db->prefix."collection_tags";
		$this->db->query($sql);
	}
	
}