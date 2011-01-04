
<?php
if (isset($_POST['goto']) && ($_POST['goto'] == strftime("%Y-%m-%d", $date_l)))
    $divClass = "daily_list five blue";
elseif ((strftime("%Y-%m-%d", $current_date) == strftime("%Y-%m-%d", $date_l)) and $i == 5)
    $divClass = "daily_list red five last";
elseif (strftime("%Y-%m-%d", $current_date) == strftime("%Y-%m-%d", $date_l))
    $divClass = "daily_list red five";
elseif (strftime("%Y-%m-%d", $current_date) > strftime("%Y-%m-%d", $date_l))
    $divClass = "daily_list grey five";
elseif (strftime("%Y-%m-%d", $current_date) < strftime("%Y-%m-%d", $date_l))
    $divClass = "daily_list five";
?>
