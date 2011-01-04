<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(!logged_in()) {
    exit();
}

/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user'])->toArray(true);

$do_on = strtotime($_POST['do_on']);
$current_date = strtotime((strftime("%y-%m-%d",add_day(time(),0,$current_member['mytimezone']))));
if(logged_in() && isset($_POST['todo']) &&($do_on >= $current_date || strftime("%Y", $do_on) == "1970")) {
    $order = getNewOrder($_POST['do_on']);
    $Todo = new Todos();
    $Todo->member_id = $_SESSION['id_user'];
    $Todo->todo = trim($_POST['todo']);
    $Todo->done = "No";
    $Todo->ord = $order;
    $Todo->do_on = $_POST['do_on'];
    $Todo->created_at = date("Y-m-d H:i:s",$current_date);
    $Todo->save();
}

?>

<li class='todo_item' id='todo_item_<?php echo $Todo->id; ?>'>
    <div class='overflow_abs'>
        <p class='todo'><?php echo $Todo->todo; ?></p>
        <p class='ellipsis'>...</p>
        <a href="user/destroy_todo.php?id=<?php echo $Todo->id; ?>" class="delete">x</a>
    </div>
</li>

<?php
unset ($q);
unset ($Todo);
?>
