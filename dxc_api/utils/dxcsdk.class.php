<?php


class dxcsdk{

	var $charset = 'utf-8';

	function json_encode($data){
		$data = $this->iconv_data($data);
		return json_encode($data);
	}

	function iconv_data($data){

		if(is_array($data)){
			foreach($data as $k => $v){
				$data[$k] = $this->iconv_data($v);
			}
		}else{
			$data = $this->str_iconv_to_utf8($data);
		}

	    return $data;
	}

	function str_iconv_to_utf8($str){
		if($this->charset == 'gbk' || $this->charset == 'gb2312'){
			$str = $this->piconv($str, 'GBK', 'UTF-8');
		}else{
			if($this->charset == 'big5') {
				$str = $this->piconv($str, 'BIG5', 'UTF-8');
			}else{
			}
	  	}

		return $str;
	}

	function piconv($str, $in, $out){
		if(function_exists('mb_convert_encoding')) {
			$str = $in == 'UTF-8' ? str_replace("\xC2\xA0", ' ', $str) : $str;
			$str = mb_convert_encoding($str, $out, $in);
		}else{
			$str = iconv($in, "".$out."//IGNORE", $str);
		}
		return $str;
	}



	static function base64_decode($data) {

		if(is_array($data)){
			foreach($data as $k => $v){
				$data[$k] = self::base64_decode($v);
			}
		}else{
			if(strlen($data) > 0){
				$data = base64_decode(str_replace(" ", "+", $data));
			}
		}

	    return $data;

	}

	static function random($length, $numeric = 0) {

		$seed = base_convert(md5(microtime().$_SERVER['DOCUMENT_ROOT']), 16, $numeric ? 10 : 35);
		$seed = $numeric ? (str_replace('0', '', $seed).'012340567890') : ($seed.'zZ'.strtoupper($seed));
		if($numeric) {
			$hash = '';
		} else {
			$hash = chr(rand(1, 26) + rand(0, 1) * 32 + 64);
			$length--;
		}
		$max = strlen($seed) - 1;
		for($i = 0; $i < $length; $i++) {
			$hash .= $seed{mt_rand(0, $max)};
		}
		return $hash;

	}

	static function upload($attach_dir){

		$filename = self::base64_decode($_POST['filename']);
	    $data_id = self::base64_decode($_POST['data_id']);
	    $content = self::base64_decode($_POST['content']);

		$attach_dir = $attach_dir.$data_id.'/';

	    self::dmkdir($attach_dir);
	    $filepath = $attach_dir.$filename;

	    if(!$fp = fopen($filepath, 'wb')) {
			return -1;
	    } else {
	        flock($fp, 2);
	        fwrite($fp, $content);
	        fclose($fp);
	    }

		return 0;

	}

	static function read_attach($post_data, $attach_dir){
		//读取附件
	    // $attach_temp_dir = $attach_dir.'/'.$post_data['id'];
	    // foreach ($post_data['attach_list'] as $key => $value) {
	    //     foreach ($value as $key2 => $value2) {
	    //         if (array_key_exists("fileName", $value2)){
	    //             $filepath = $attach_temp_dir.'/'.$value2['fileName'];
	    //             $post_data['attach_list'][$key][$key2]['content'] = file_get_contents($filepath);
	    //         }
	    //     }
	    // }


		//self::removedir($attach_temp_dir);


		return $post_data;
	}


	static function strtotime($str){
		return strtotime($str);
	}

	static function removedir($dirname, $keepdir = FALSE) {
	    if(!is_dir($dirname)) {
	        return FALSE;
	    }
	    $handle = opendir($dirname);
	    while(($file = readdir($handle)) !== FALSE) {
	            if($file != '.' && $file != '..') {
	                    $dir = $dirname . DIRECTORY_SEPARATOR . $file;
	                    is_dir($dir) ? self::removedir($dir) : unlink($dir);
	            }
	    }
	    closedir($handle);
	    return !$keepdir ? (@rmdir($dirname) ? TRUE : FALSE) : TRUE;
	}

	static function dmkdir($dir, $mode = 0777, $makeindex = TRUE){
		if(!is_dir($dir)) {
			self::dmkdir(dirname($dir), $mode, $makeindex);
			@mkdir($dir, $mode);
			if(!empty($makeindex)) {
				@touch($dir.'/index.html'); @chmod($dir.'/index.html', 0777);
			}
		}
		return true;
	}

	static function get_rand_data($data){
        if(self::strexists($data, ',')){
            $temp_arr = self::format_wrap($data, ',');
            return rand($temp_arr[0], $temp_arr[1]);
        }else if(self::strexists($data, '|')){
            $data_arr = self::format_wrap($data, '|');
            $key = array_rand($data_arr);
            return $data_arr[$key];
        }else{
            return intval($data);
        }
    }

	static function format_wrap($str, $exp_type = PHP_EOL){
	    if(!$str) return false;
	    $arr = explode($exp_type, trim($str));
	    $arr = array_map('trim',$arr);
	    $arr = array_filter($arr);
	    return $arr;
	}

	static function get_post_data($attach_dir){
		$post_data = json_decode(self::base64_decode($_POST['data']), true);
		$post_data = self::base64_decode($post_data);
		$post_data = self::read_attach($post_data, $attach_dir);
		return $post_data;
	}


	static function strexists($string, $find) {
		return !(strpos($string, $find) === FALSE);
	}

	static function create_public_time($api_info, $article_dateline = '', $num = 1, $is_reply = 0, $now_time){
		$now_time = $now_time ? $now_time : time();

		if($is_reply != 1) {
			$time_type = intval($api_info['type']);
			if($time_type == 1){//发布时的时间
				return $now_time;
			}else if($time_type == 2){//随机时间段
				$public_time_start  = strtotime($api_info['start']);
				$public_time_end  = strtotime($api_info['end']);
				$public_time_start = $public_time_start > ($now_time - 20*365*24*3600) ? $public_time_start : $now_time + $api_info['start']*3600;
				$public_time_end = $public_time_end > ($now_time - 20*365*24*3600) ? $public_time_end : $now_time + $api_info['end']*3600;
				return rand($public_time_start, $public_time_end);
			}else{
				return $now_time;
			}
		}else{
			$reply_time_arr = explode(',', $api_info['reply_time']);
			if(count($reply_time_arr) == 1) {
				$reply_time_arr[1] = $reply_time_arr[0] * 3600;
				$reply_time_arr[0] = 30*60;
			}else{
				$reply_time_arr[0] = $reply_time_arr[0] ? $reply_time_arr[0] * 3600 : 30*60;
				$reply_time_arr[1] = $reply_time_arr[1] ? $reply_time_arr[1] * 3600 : 3600*2;
			}
			for($i = 0;$i < $num;$i++){
				$re_arr[$i] = $article_dateline + rand($reply_time_arr[0], $reply_time_arr[1]);
			}
		}
		sort($re_arr);
		return $re_arr;
	}

}

?>
