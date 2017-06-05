/**
 * Tag标签的增删查改操作
 * @作者 qinggan <admin@phpok.com>
 * @版权 深圳市锟铻科技有限公司
 * @网站 http://www.phpok.com
 * @版本 4.x
 * @授权 GNU Lesser General Public License (LGPL)
 * @日期 2017年04月20日
**/
;(function($){
	$.phpok_tag = {
		add:function()
		{
			var url = get_url('tag','set');
			$.dialog.open(url,{
				'title':p_lang('添加标签'),
				'width':'560px',
				'height':'360px',
				'lock':true,
				'okVal':p_lang('提交保存'),
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
		},
		edit:function(id)
		{
			var url = get_url('tag','set','id='+id);
			$.dialog.open(url,{
				'title':p_lang('修改标签'),
				'width':'560px',
				'height':'360px',
				'lock':true,
				'okVal':p_lang('提交保存'),
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
		},
		del:function(id,title)
		{
			$.dialog.confirm(p_lang('确定要删除标签 {title} 吗？删除后相关标签数据也会删除','<span class="red">'+title+'</span>'),function(){
				var url = get_url('tag','delete','id='+id);
				$.phpok.json(url,function(data){
					if(data.status){
						$.phpok.reload();
						return true;
					}
					$.dialog.alert(data.info);
					return false;
				});
			});
		},
		config:function()
		{
			var url = get_url('tag','config');
			$.dialog.open(url,{
				'title':p_lang('配置标签参数'),
				'width':'500px',
				'height':'150px',
				'lock':true,
				'okVal':p_lang('提交保存'),
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