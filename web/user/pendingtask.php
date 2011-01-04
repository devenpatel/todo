<!-- Previous day pending (not done) tasks list -->


<a href="list.php?date=<?php echo date("Y-m-d", $p_day); ?>" class="premonth" >&nbsp;</a>

<div id='sidepanel'>

    <div class="sheaderl">
        <a href="#" class="striangle open"></a>
        <h4>Pending Task</h4>
    </div>
    <div style="clear:both;"></div>

    <?php
    $q = Doctrine_Query::create()
            ->select('id, member_id, do_on, done, todo')
            ->from('Todos')
            ->where("DATE_FORMAT(do_on, '%Y') != '1970' AND done = 'No' AND member_id = '".$current_member['id']."' AND DATE_FORMAT(do_on, '%Y-%m-%d') < '".strftime('%Y-%m-%d', add_day(time(),0,$current_member['mytimezone']))."'")
            ->offset(0)
            ->limit(17)
            ->orderBy("do_on DESC, ord ASC");
    $Todo = $q->execute(array(),Doctrine::HYDRATE_ARRAY);
    ?>

    <div id='pplist' class="boxes_brd_pdng" >
    <div class="clear"></div>
        <ul class='list_items' id='list_items' >
            <?php foreach ($Todo as $ti): ?>
            <li class='todo_item <?php $ti['done'] == "Yes" ? "done" : "" ?>' id='todo_item_<?php echo $ti['id'] ?>'>
                <div class='overflow_abs' title="<?php echo strftime("%B %d, %Y",strtotime($ti['do_on'])); ?>">
                    <p class='todo'><?php echo$ti['todo'] ?></p>
                    <p class='ellipsis'>...</p>
                    <a href="user/destroy_todo/<?php echo $ti['id'] ?>" class="delete">x</a>
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