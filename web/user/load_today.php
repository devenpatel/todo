<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(!logged_in()) {
    exit();
}

/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user'])->toArray(true);
?>


<?php
$q = Doctrine_Query::create()
    ->select('id, member_id, do_on, done, todo')
    ->from('Todos')
    ->where("member_id = '".$current_member['id']."' AND DATE_FORMAT(do_on, '%Y-%m-%d') = '".strftime('%Y-%m-%d', add_day(time(),0,$current_member['mytimezone']))."'")
    ->offset(0)
    ->limit(17)
    ->orderBy("ord ASC");
$Todo = $q->execute(array(),Doctrine::HYDRATE_ARRAY);
?>


    <ul class='list_items' id='list_items_<?php echo strftime("%Y-%m-%d", add_day(time(),0,$current_member->mytimezone)); ?>'>
        <?php foreach ($Todo as $ti): ?>
        <li class='todo_item <?php echo $ti['done'] == "Yes" ? "done" : "" ?>' id='todo_item_<?php echo $ti['id'] ?>'>
            <div class='overflow_abs'>
                <p class='todo'><?php echo $ti['todo'] ?></p>
                <p class='ellipsis'>...</p>
                <a href="user/destroy_todo.php?id=<?php echo $ti['id'] ?>" class="delete">x</a>
            </div>
        </li>
        <?php endforeach; ?>
        <li style='display: none;'>
            &nbsp;
        </li>
    </ul>



<?php require_once('unsetConfig.php'); ?>