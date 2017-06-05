<?php
/*************************************************************************
	File Name   : config.inc.php
	Author      : laixing.chen
	Note        : dxc采集器的配置文件 
	Created Time: 2017年05月27日 10:10:03
 ************************************************************************/
error_reporting(0);
define("DXC_API_DIR", dirname(dirname(__FILE__)));
define("DXC_API_SECRET", 'tSOwmpDXsNo7kxhyyClPRSfZjnl5mW');
define("DXC_UPLOAD_DIR", dirname(DXC_API_DIR) . '/');
define('OPERATOR_ID',2);
require_once(dirname(DXC_API_DIR) . '/config.php');
$DB_CONFIG = array(
    'news' => array(
        array(
            'host'     => $config["db"]["host"],
            'user'     => $config["db"]["user"],
            'password' => $config["db"]["pass"],
            'port'     => $config["db"]["port"] ,
            'dbname'   => $config["db"]["data"] ,
            'charset'  => 'utf8'
        ),
    ),
);
