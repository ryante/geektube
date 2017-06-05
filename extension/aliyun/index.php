<?php
/**
 * 阿里云SDK信息，请配合插件或是网关路由使用
 * @package phpok\extension\aliyun
 * @作者 qinggan <admin@phpok.com>
 * @版权 2015-2016 深圳市锟铻科技有限公司
 * @主页 http://www.phpok.com
 * @版本 4.x
 * @授权 http://www.phpok.com/lgpl.html PHPOK开源授权协议：GNU Lesser General Public License
 * @时间 2017年02月27日
**/
if(!defined("PHPOK_SET")){exit("<h1>Access Denied</h1>");}
include_once ROOT.'extension/aliyun/aliyun-php-sdk-core/Config.php';
use Sms\Request\V20160927 as Sms;
use Dm\Request\V20151123 as Dm;
class aliyun_lib
{
	private $access_key = '';
	private $access_secrect = '';
	private $access_id = 'cn-hangzhou';
	private $signature = '锟铻科技';
	private $sms_template_id = 0;

	private $dm_account = '';
	private $dm_name = '锟铻科技';
	
	public function __construct()
	{
		//
	}

	public function access_id($val='')
	{
		if($val){
			$this->access_id = $val;
		}
		return $this->access_id;
	}

	public function access_key($val='')
	{
		if($val){
			$this->access_key = $val;
		}
		return $this->access_key;
	}

	public function access_secrect($val='')
	{
		if($val){
			$this->access_secrect = $val;
		}
		return $this->access_secrect;
	}

	public function signature($val='')
	{
		if($val){
			$this->signature = $val;
		}
		return $this->signature;
	}

	public function sms_template_id($val='')
	{
		if($val){
			$this->sms_template_id = $val;
		}
		return $this->sms_template_id;
	}

	public function dm_account($val='')
	{
		if($val){
			$this->dm_account = $val;
		}
		return $this->dm_account;
	}

	public function dm_name($val='')
	{
		if($val){
			$this->dm_name = $val;
		}
		return $this->dm_name;
	}

	public function email($title='',$content='',$mailto='')
	{
		if(!$title || !$content || !$mailto){
			return $this->error(P_Lang('参数传递不完整'));
		}
		if(!$this->access_key){
			return $this->error(P_Lang('未指定Access Key'));
		}
		if(!$this->access_secrect){
			return $this->error(P_Lang('未指定Access Secret'));
		}
		if(!$this->signature){
			return $this->error(P_Lang('未配置标签'));
		}
		if(!$this->dm_account){
			return $this->error(P_Lang('未配置发信地址'));
		}
		if(!$this->dm_name){
			return $this->error(P_Lang('未配置发信人昵称'));
		}
		$iClientProfile = DefaultProfile::getProfile($this->access_id, $this->access_key,$this->access_secrect);
		$client = new DefaultAcsClient($iClientProfile);    
		$request = new Dm\SingleSendMailRequest();     
		$request->setAccountName($this->dm_account);
		$request->setFromAlias($this->dm_name);
		$request->setAddressType(1);
		$request->setTagName($this->signature);
		$request->setReplyToAddress("true");
		$request->setToAddress($mailto);        
		$request->setSubject($title);
		$request->setHtmlBody(stripslashes($content));        
		try {
			$response = $client->getAcsResponse($request);
			return $this->success();
		}
		catch (ClientException  $e) {
			return $this->error($e->getErrorMessage(),$e->getErrorCode());
		}
		catch (ServerException  $e) {
			return $this->error($e->getErrorMessage(),$e->getErrorCode());
		}
	}

	public function sms($mobile,$data='')
	{
		if(!$mobile){
			return $this->error(P_Lang('未指定手机号'));
		}
		if(!$this->sms_template_id){
			return $this->error(P_Lang('未指定模板ID'));
		}
		if(!$this->access_key){
			return $this->error(P_Lang('未指定Access Key'));
		}
		if(!$this->access_secrect){
			return $this->error(P_Lang('未指定Access Secret'));
		}
		if(!$this->signature){
			return $this->error(P_Lang('未配置签名'));
		}
		
		$iClientProfile = DefaultProfile::getProfile($this->access_id, $this->access_key,$this->access_secrect);
		$client = new DefaultAcsClient($iClientProfile);
		$request = new Sms\SingleSendSmsRequest();
		$request->setSignName($this->signature);/*签名名称*/
		$request->setTemplateCode($this->sms_template_id);/*模板code*/
		$request->setRecNum($mobile);/*目标手机号*/
		if($data){
			$data = json_encode($data);
			$request->setParamString($data);
		}
		try {
			$response = $client->getAcsResponse($request);
			return $this->success();
		}
		catch (ClientException  $e) {
			return $this->error($e->getErrorMessage(),$e->getErrorCode());
		}
		catch (ServerException  $e) {        
			return $this->error($e->getErrorMessage(),$e->getErrorCode());
		}
	}

	/**
	 * 错误返回
	 * @参数 $error 错误内容
	 * @参数 $errid 错误ID
	 * @返回 数组
	**/
	private function error($error='',$errid=0)
	{
		if(!$error){
			$error = '异常';
		}
		$array = array('status'=>false,'error'=>$error);
		if($errid){
			$array['errid'] = $errid;
		}
		return $array;
	}

	private function success($info='')
	{
		return array('status'=>true,'info'=>$info);
	}
}
