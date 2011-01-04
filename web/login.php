<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(logged_in()) {redirect_to("list.php");}

if($_SERVER['REQUEST_METHOD'] == "POST") {
    $o_member = Doctrine::getTable("Members")->findOneByEmail($_POST['email']);
    if($o_member) {
        if($o_member->encpwd == md5(md5($_POST['password']).$o_member->salt)) {
            $_SESSION['id_user'] = $o_member->id;
            $a_flash['notice'][] = "Logged in successfully";
            redirect_to('list.php');
        }
        else {
            $a_flash['error'] = "Invalid Email / Password";
        }
    }
    else {
        $a_flash['error'] = "Invalid Email / Password";
    }
}

/* Get Template Contents */
$content_file='template/login.php';

/* Render Gloable Main Template  */
include('main.php');

require_once('unsetConfig.php');

