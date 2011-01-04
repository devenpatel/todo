<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..'));
require_once(ROOT_DIR . DIRECTORY_SEPARATOR . 'include' . DIRECTORY_SEPARATOR . 'globalConfig.php');

if (!logged_in()) {
    redirect_to("login.php");
}

/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user']);

if (isset($_POST['commit'])) {

    $f = true;
    if (trim($_POST['name']) == "") {
        $a_flash['notice']['name'] = "Name can't be left blank";
        $f = false;
    }
    if (trim($_POST['email']) == "") {
        $a_flash['notice']['email'] = "Email can't be left blank";
        $f = false;
    } elseif (!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $_POST['email'])) {
        $a_flash['notice']['email'] = "Email should look like an email address.";
        $f = false;
    } else {
        $o_member = Doctrine::getTable("Members")->findOneByEmail(trim($_POST['email']));
        if ($o_member && $o_member->id != $current_member->id) {
            $a_flash['notice']['email'] = "Email has already been taken.";
            $f = false;
        }
    }
    if ($_POST['password'] && !$_POST['password_confirmation']) {
        $a_flash['notice']['password'] = "Password confirmation can't be blank";
        $f = false;
    } elseif ($_POST['password'] && strlen(trim($_POST['password'])) < 6) {
        $a_flash['notice']['password'] = "Password is too short (minimum is 6 characters)";
        $f = false;
    } elseif ($_POST['password'] && $_POST['password_confirmation'] && $_POST['password'] != $_POST['password_confirmation']) {
        $a_flash['notice']['password'] = "Password doesn't match confirmation.";
        $f = false;
    }
    if ($_POST['timezone'] === 0) {
        $a_flash['notice']['timezone'] = "Select Timezone Please";
        $f = false;
    }

    $current_member->name = trim($_POST['name']);
    $current_member->email = trim($_POST['email']);
    $current_member->mytimezone = $_POST['timezone'];


    if ($f) {
        if ($_POST['password']) {
            $current_member->salt = md5();
            $current_member->encpwd = md5(md5($_POST['password']) . $current_member->salt);
        }
        $current_member->updated_at = date("Y-m-d H:i:s", time());
        $current_member->save();
        $a_flash['notice']['save'] = "Member was successfully updated.";
    }
}


/* Get Template Contents */
$content_file = 'template/settings.php';

/* Render Gloable Main Template  */
include('main.php');

require_once('unsetConfig.php');
