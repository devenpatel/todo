<ul class='<?php echo $divClass; ?>' id='<?php echo strftime("%Y-%m-%d", $date_l); ?>'>
    <?php
    $q = Doctrine_Query::create()
        ->select('id, member_id, do_on, done, todo')
        ->from('Todos')
        ->where("member_id = '".$current_member['id']."' AND DATE_FORMAT(do_on, '%Y-%m-%d') = '".strftime("%Y-%m-%d", $date_l)."'")
        ->orderBy("ord ASC");
    $Todo = $q->execute(array(),Doctrine::HYDRATE_ARRAY);
    ?>
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
