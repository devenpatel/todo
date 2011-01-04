
<div class='daily_list_wrapper'>
    <h3 class='day'><span><?php echo strtoupper(strftime("%A",$date_l)); ?></span></h3>
    <h4 class='date'><?php echo strtoupper(strftime("%B %d, %Y",$date_l)); ?></h4>
    <form action="user/create_todo.php" method="post">
        <input class='todo_item_entry' maxlength='260'<?php echo strftime("%Y%m%d", $current_date) > strftime("%Y%m%d",$date_l) ? "disabled='disabled'" : "" ?>name='todo' type='text' />
        <input name='do_on' type='hidden' value='<?php echo strftime("%Y-%m-%d",$date_l) ?>' />
    </form>
    <?php require("user/todoitem.php") ?>
</div>