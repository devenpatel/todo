
<?php $date_l = $f_day; ?>
<?php if (!isset($_GET['today'])) : ?>
    <div id='todo_list'>
        <div id='scrollContainer'>
        <?php endif; ?>
        <?php $current_date = isset($_POST['goto']) ? add_day(time(), 0, $current_member['mytimezone']) : $current_date; ?>
        <?php for ($i = 1; $i < 6; $i++): ?>
        <?php require("user/select_class.php"); ?>
            <div class='<?php echo $divClass; ?>' <?php echo $divClass == "daily_list red five" || $divClass == "daily_list red five last" ? "id='today'" : ""; ?> >
            <?php require("user/tododayitem.php") ?>
        </div>
        <?php //$date_l = add_day($f_day, $i, $current_member['mytimezone']); ?>
        <?php $date_l = $f_day + (ONE_DAY * $i); ?>
        <?php endfor; ?>
        <?php if (!isset($_GET['today'])) : ?>
            </div>
        </div>
<?php require_once("user/someday.php") ?>
<?php endif; ?>
