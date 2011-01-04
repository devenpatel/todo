<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(!logged_in()) {
    exit();
}

if(!validateDate($_GET['date'])) {
    exit();
}

/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user'])->toArray(true);

if(count($_POST['todo_item']) > 0 && isset($_POST['todo_item'])) {
    $today = date("Y-m-d",add_day(time(),0,$current_member['mytimezone']));
    $update = date('Y-m-d', strtotime($_GET['date']));
    $counter = 1;
    foreach ($_POST['todo_item'] as $id ) {

        $cStatus = true;
        $todo = Doctrine::getTable('Todos')->find($id);
        $c_do_on = date('Y-m-d', strtotime($todo->do_on));

        if($update == $c_do_on || date('Y', strtotime($_GET['date'])) == "1970") {
            $todo->do_on = $update;
            $todo->ord = $counter;
        }
        elseif((strtotime($update) < strtotime($today)) && date('Y', strtotime($todo->do_on)) == "1970") {
            $order = getNewOrder($today);
            $todo->do_on = $today;
            $todo->ord = $order;
            $cStatus = false;
        }
        elseif((strtotime($update) > strtotime($c_do_on) || strtotime($update) < strtotime($c_do_on)) && (strtotime($update) >= strtotime($today))) {

            $todo->do_on = $update;
            $todo->ord = $counter;
        }
        else {
            $cStatus = false;
        }
        $todo->updated_at = date("Y-m-d H:i:s", $today);
        $todo->save();
        unset($todo);
        if($cStatus) {
            $counter++;
        }
    }
}

require_once('unsetConfig.php');
