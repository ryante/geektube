<?php
/*************************************************************************
	File Name   : DataFormat.class.php
	Author      : laixing.chen 
	Note        : 
	Created Time: 2017年05月27日 10:19:21
 ************************************************************************/
require_once('imageManage.class.php');
class DataFormat{
	private static $__instance;
    public $imageObj;

    private function __construct() {
        $this->imageObj = ImageMannage::getInstance();
    }

    public static function getInstance() {
        if (!(self::$__instance instanceof self)) {
            self::$__instance = new self;
        }
        return self::$__instance;
    }

    public function tagFormat($tagData){
        if (empty($tagData)) {
            return false;
        }
        return ltrim($tagData,',');
    }


    public function thumbFormat($thumbAttach, $attach_dir) {
        if (empty($thumbAttach) || !is_array($thumbAttach) || empty($attach_dir)) {
            return '';
        }
        $thumbId = $this->imageObj->saveThumb($thumbAttach, $attach_dir);

        return $thumbId ? $thumbId : '';
    }

    public function contentFormat($content, $contentAttach, $attach_dir) {
        if (empty($contentAttach)) {
            return $content;
        }

        //处理a标签 
        $linkReplace = [];
        foreach($contentAttach as $key => $value){
            if($value['isimage'] == 1){
                continue;
            }
            $text = $value['text'] ? $value['text'] : $value['url'];
            $linkReplace['search'][$key] = $value['ref'];
            $linkReplace['replace'][$key] = '<a href="'.$value['url'].'" >'.$text.'</a>';
            if(empty($value['content']) || empty($value['ext'])) {
                continue;
            }
        }
        $content = str_replace($linkReplace['search'], $linkReplace['replace'], $content);


        //处理img标签
        $imagereplace = [];
        foreach($contentAttach as $key => $value){
            if($value['isimage'] == 0){
                continue;
            }
            $imagereplace['search'][$key] = $value['ref'];
            $filePath = $attach_dir . $value['fileName'];
            if (!file_exists(DXC_UPLOAD_DIR . $filePath)) {
                $filePath = $value['url'];
            }
            $imagereplace['replace'][$key] = '<img src="'.$filePath.'" alt="'.$value['text'].'" />';
            if(empty($value['content']) || empty($value['ext'])) {
                continue;
            }
        }
        $content = str_replace($imagereplace['search'], $imagereplace['replace'], $content);

        return $content;
    }

    
}
