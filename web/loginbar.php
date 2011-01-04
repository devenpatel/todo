<?php if(logged_in()): ?>
<ul id='user_controls'>
    <li>
        <span><a href="list.php"><?php echo ucfirst($current_member['name']);?></a></span>
    </li>
    <li>
        <a href="settings.php">My Account</a>
    </li>
    <li class='settings'>
        <a href="logout.php">Logout</a>
    </li>
</ul>    
<?php else: ?>
<ul id='user_controls'>
    <li>

        <a href="signup.php">Sign up</a>
    </li>
    <li class='settings'>
        <a href="login.php">Log in</a>
    </li>
</ul>
<?php endif; ?>
