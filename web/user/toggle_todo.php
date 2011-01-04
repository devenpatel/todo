<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(!logged_in()) {
    exit();
}

/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user'])->toArray(true);


if(isset($_GET['id'])) {

    $Todo = Doctrine::getTable('Todos')->find($_GET['id']);
    if($Todo && $Todo->member_id == $_SESSION['id_user']) {
        $Todo->done = ($Todo->done == "Yes" ? "No" : "Yes");
        $Todo->updated_at = date("Y-m-d H:i:s",$current_member['timezone']);
        $Todo->save();
    }

}
require_once('unsetConfig.php');

?>
