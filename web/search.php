<?php

//Include Main Config
define('ROOT_DIR', realpath(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'));
require_once(ROOT_DIR.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'globalConfig.php');

if(!logged_in()) {
    redirect_to("login.php");
}

/* Current Loggin user */
$current_member = Doctrine::getTable('Members')->find($_SESSION['id_user'])->toArray(true);

//print_r($_GET);
//print_r($current_member);

if(isset($_GET['sdate']) && isset($_GET['edate']))
    $ss__criteria = "member_id = '".$current_member['id']."' AND todo LIKE '%".$_GET['task']."%' AND do_on > '".strftime('%Y-%m-%d %H:%M:%S', strtotime($_GET['sdate']))."'"." AND do_on < '".strftime('%Y-%m-%d %H:%M:%S', strtotime($_GET['edate']))."'";
elseif (isset($_GET['sdate']))
    $ss__criteria = "member_id = '".$current_member['id']."' AND todo LIKE '%".$_GET['task']."%' AND do_on > '".strftime('%Y-%m-%d %H:%M:%S', strtotime($_GET['sdate']))."'";
elseif (isset($_GET['edate']))
    $ss__criteria = "member_id = '".$current_member['id']."' AND todo LIKE '%".$_GET['task']."%' AND do_on < '".strftime('%Y-%m-%d %H:%M:%S', strtotime($_GET['edate']))."'";
else
    $ss__criteria = "member_id = '".$current_member['id']."' AND todo LIKE '%".$_GET['task']."%'";

$q = Doctrine_Query::create()
        ->select('id, member_id, do_on, done, todo')
        ->from('Todos')
        ->where($ss__criteria)
        ->orderBy("do_on ASC");
$Todo = $q->execute(array(),Doctrine::HYDRATE_ARRAY);
//print_r($Todo);
$q->free();
?>

<?php if($Todo): ?>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tmp">
    <tr class="ligtht_box_bg2">
        <th height="31" valign="middle" style="padding-left:5px;">Task</th>
      <th valign="middle">Do On</th>
        <th valign="middle">Done</th>
  </tr>
    
        <?php foreach ($Todo as $k=>$t): ?>
    <tr class="ligtht_box_bg3 <?php echo $k%2 == 0 ? "odd" : "even" ;?>">
        <td height="31" style="padding-left:5px;"><?php echo $t['todo']?></td>
        <td><?php echo strftime('%d-%b-%Y', strtotime($t['do_on'])); ?></td>
        <td><?php echo $t['done']?></td>
  </tr>
        <?php endforeach; ?>
</table>
<?php else: ?>
<center>There is no Task found with <strong><?php echo $_GET['task'] ?></strong>.</center>
<?php endif; ?>

