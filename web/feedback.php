
<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(!logged_in()) {
    redirect_to("login.php");
}


/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user'])->toArray(true);


if(trim($_POST['message'])) {
    $o_feedbk = new Feedbacks();
    $o_feedbk->member_id = $_SESSION['id_user'];
    $o_feedbk->feedback = $_POST['message'];
    $o_feedbk->created_at = date("Y-m-d H:i:s",add_day(time(),0,$current_member['mytimezone']));
    $o_feedbk->save();
    echo "true";
}
else {
    echo "false";
}

// Include Global Un Config
require_once('unsetConfig.php');

