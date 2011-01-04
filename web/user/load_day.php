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

<?php if(isset($_GET['date'])): ?>
    <?php
    $date_l =  strtotime($_GET['date']);
    $current_date = add_day(time(),0,$current_member['mytimezone']);
    ?>

        <?php require("user/select_class.php") ?>
<div class='<?php echo $divClass; ?>'>
    <?php require("user/tododayitem.php") ?>
</div>
<?php endif; ?>

<?php require_once('unsetConfig.php'); ?>