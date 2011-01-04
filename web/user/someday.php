
<div id='someday'>
    <div class='header'>
        <a href="#" class="triangle open"></a>
        <h2>Someday <a href="#">(<?php echo $total_someday ?>)</a></h2>
        <form action="user/create_todo.php" method="post">
            <input maxlength='260' name='todo' type='text' />
            <input name='do_on' type='hidden' value='1970-12-01' />
        </form>
    </div>
    <div id='someday_list'>
        <?php
        for($i=1;$i<=5;$i++) {
            if($i == 5) {$divClass = "someday list_items last";}else {$divClass = "someday list_items";}
            $date_l  = strtotime("1970-12-0".$i);
            require("user/todoitem_someday.php");
        }
        ?>
    </div>
</div>