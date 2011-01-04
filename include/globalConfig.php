<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
*/

/*
 * Stop Reporting Worrning and other Notice.
*/
error_reporting("E_ALL ^ E_NONE ^ E_WARNING ^ E_NOTICE");


// set default time zone if required
//date_default_timezone_set("Asia/Kolkata");


/*
 *  Set PHP Include Path
*/
define('INC_PATH', ROOT_DIR.DIRECTORY_SEPARATOR.'include');
define('INC_WEB_PATH', ROOT_DIR.DIRECTORY_SEPARATOR.'web');
ini_set('include_path',ini_get('include_path').PATH_SEPARATOR.INC_PATH.PATH_SEPARATOR.INC_PATH);
ini_set('include_path',ini_get('include_path').PATH_SEPARATOR.INC_PATH.PATH_SEPARATOR.INC_WEB_PATH);

/*define day constanct*/
define("ONE_DAY", 60*60*24);
/*
 *  Set Models PAth for dctrin
*/
define('MODEL_PATH', ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'models');

/*
 *  Start Session if not
*/
if(!isset($_SESSION)) {
    session_start();
}

/*
 * Set DataBase
*/
$db_type = "mysql";
$db_uname = "deven";
$db_pass = "devenm206";
$db_server = "localhost";
$db_name = "deven_php_todo";

/*
* Create DSN
*/
$db_dsn = $db_type.'://'.$db_uname.':'.$db_pass.'@'.$db_server.'/'.$db_name;

/*
 *  Include DB Config
*/
require_once('config.php');

/*
 *  Include General Functions
*/
require_once('functions.php');

?>
