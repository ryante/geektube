/**
 * 内容管理
 * @作者 qinggan <admin@phpok.com>
 * @版权 深圳市锟铻科技有限公司
 * @网站 http://www.phpok.com
 * @版本 4.x
 * @授权 http://www.phpok.com/lgpl.html PHPOK开源授权协议：GNU Lesser General Public License
 * @日期 2017年04月21日
**/
;(function($){
	$.phpok_list = {
		set:function(id)
		{
			var url = get_url('list','set','id='+id);
			$.dialog.open(url,{
				'title':p_lang('编辑项目') +" #"+id,
				'lock':true,
				'width':'780px',
				'height':'60%',
				'ok':function(){
					var iframe = this.iframe.contentWindow;
					if (!iframe.document.body) {
						alert('iframe还没加载完毕呢');
						return false;
					};
					iframe.save();
					return false;
				},
				'cancel':true
			});
		}
	}
})(jQuery);