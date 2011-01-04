<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..'));
require_once(ROOT_DIR . DIRECTORY_SEPARATOR . 'include' . DIRECTORY_SEPARATOR . 'globalConfig.php');

if (!logged_in()) {
    redirect_to("login.php");
}

/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user'])->toArray(true);

/* Process Part */

if (isset($_POST['goto'])) {
    $current_date = $f_day = strtotime($_POST['goto']);
    $c_day_i = strftime("%w", $current_date);
} else {
    $current_date = $f_day = add_day(time(), 0, $current_member['mytimezone']);
    $c_day_i = strftime("%w", $current_date);
}


if ($c_day_i == 0) {
    $p_day = $f_day - ONE_DAY * 1;
    $n_day = $f_day + ONE_DAY * 5;
} elseif ($c_day_i == 6) {
    $f_day = $current_date - ONE_DAY * 4;

    $p_day = $f_day - ONE_DAY * 1;
    $n_day = $current_date + ONE_DAY * 1;
} else {
    $f_day = $current_date - ONE_DAY * ($c_day_i - 1);

    $p_day = $current_date - ONE_DAY * $c_day_i;
    $n_day = $current_date + ONE_DAY * (6 - $c_day_i);
}


/* Get Template Contents */
$content_file = 'user/list.php';

if (isset($_GET['today'])) {
    require_once $content_file;
} else {
    /* Render Gloable Main Template  */
    require_once('main.php');

// Include Global Un Config
    require_once('unsetConfig.php');
}
