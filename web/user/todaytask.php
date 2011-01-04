<a href="list.php?date=<?php echo date("Y-m-d", $n_day); ?>" class="nextmonth" >&nbsp;</a>

<div id='sidepanel'>

    <div class="sheaderr">
        <a href="#" class="striangle open"></a>
        <h4>Today's Task</h4>
    </div>
    <div style="clear:both;"></div>

    <?php
    $q = Doctrine_Query::create()
        ->select('id, member_id, do_on, done, todo')
        ->from('Todos')
        ->where("member_id = '".$current_member['id']."' AND DATE_FORMAT(do_on, '%Y-%m-%d') = '".strftime('%Y-%m-%d', add_day(time(),0,$current_member['mytimezone']))."'")
        ->offset(0)
        ->limit(20)
        ->orderBy("ord ASC");
    $Todo = $q->execute(array(),Doctrine::HYDRATE_ARRAY);
    ?>

    <div id='tlist' class="boxes_brd_pdng">
    	<div class="clear"></div>
        <ul class='list_items' id='list_items_<?php echo strftime("%Y-%m-%d", add_day(time(),0,$current_member->mytimezone)); ?>' >
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

    </div>

</div>

<?php
unset ($q);
unset ($Todo);
?>
