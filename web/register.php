<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(logged_in()) {
    $current_member = new Members();
}
else {
    $current_member = Doctrine::getTable('Members')->find($_SESSION['id_user']);
}

if(isset($_POST['commit'])) {

    $f = true;
    if(trim($_POST['name']) == "") {
        $a_flash['notice']['name'] = "Name can't be left blank";
        $f = false;
    }
    if(trim($_POST['email']) == "") {
        $a_flash['notice']['email'] = "Email can't be left blank";
        $f = false;
    }
    elseif(!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $_POST['email'])) {
        $a_flash['notice']['email'] = "Email should look like an email address.";
        $f = false;
    }
    else {
        $o_member = Doctrine::getTable("Members")->findOneByEmailAndId(trim($_POST['email']), $current_member->id);
        if($o_member) {
            $a_flash['notice']['email'] = "Email has already been taken.";
            $f = false;
        }
    }

    if(trim($_POST['password'] == "")) {
        $a_flash['notice']['password'] = "Password can't be blank";
        $f = false;
    }
    elseif(strlen(trim($_POST['password'])) < 6) {
        $a_flash['notice']['password'] = "Password is too short (minimum is 6 characters)";
        $f = false;
    }
    elseif($_POST['password'] != $_POST['password_confirmation']) {
        $a_flash['notice']['password'] = "Password doesn't match confirmation.";
        $f = false;
    }
    if($_POST['timezone'] == 0) {
        $a_flash['notice']['timezone'] = "Select Timezone Please";
        $f = false;
    }



    /*if(preg_match("/^[a-zA-Z0-9_]*$/", $_POST['name'])) {
        echo "true";
    }
    else {
        echo "false";
    }*/


    
    $current_member->name = trim($_POST['name']);
    $current_member->email = trim($_POST['email']);
    $current_member->mytimezone = $_POST['timezone'];

    if($f) {
        if($_POST['password']) {
            $current_member->salt = md5();
            $current_member->encpwd = md5(md5($_POST['password']).$current_member->salt);
        }
        $current_member->created_at = $this->isNew() ? date("Y-m-d H:i:s",time()) : $current_member->created_at ;
        $current_member->updated_at = date("Y-m-d H:i:s",time());
        $current_member->save();
        $_SESSION['id_user'] = $current_member->id;
        $a_flash['notice']['save'] = "Member was successfully updated.";
        if($this->isNew())
            redirect_to("list.php");
    }
}

/* Get Template Contents */
$content_file='template/settings.php';

/* Render Gloable Main Template  */
include('main.php');

require_once('unsetConfig.php');
