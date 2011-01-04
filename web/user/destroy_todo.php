<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(!logged_in()) {exit();}

if(isset($_GET['id'])) {

    $Todo = Doctrine::getTable('Todos')->find($_GET['id']);
    if($Todo && $Todo->member_id == $_SESSION['id_user']) {
        $formatted_date = date('Y-m-d', strtotime($Todo->do_on));
        $Todo->delete();
        reOrderTodo($formatted_date);
    }
}
?>

<?php
unset ($q);
unset ($Todo);
?>
