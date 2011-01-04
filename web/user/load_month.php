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

<?php if(!validateDate($_GET['date'])) {
    exit();
} ?>

<?php

$sb__s = $_GET['status'];
$date_l =  $sb__s=="true" ? strtotime($_GET['date']) : sub_day(strtotime($_GET['date']),29,$current_member['mytimezone']);
$current_date = add_day(time(),0,$current_member['mytimezone']);
$time = $date_l; 
?>

<?php for ($i = 0; $i < 30; $i++): ?>
    <?php require("user/select_class.php") ?>
        <div class='<?php echo $divClass; ?>'>
            <?php require("user/tododayitem.php") ?>
        </div>
    <?php $date_l = add_day($time,$i+1,$current_member['mytimezone']); ?>
<?php endfor; ?>


<?php require_once('unsetConfig.php'); ?>