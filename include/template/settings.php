
<div class="sign_up_box">
	<div class="sign_up_box_top">&nbsp;</div>
		<div class="sign_up_box_bg">
			<div class="sign_up_box_inner">
    <form action="" method="post">
    	<ul>
       	<li>
            <label id="name" class="sign_up_label">Name</label>
            <input id="member_name" name="name" size="30" class="input_style1" type="text" value="<?php echo $current_member->name; ?>" />
		</li>
        <li>
        	<label id="email" class="sign_up_label">Email</label>
            <input id="member_email" name="email" size="30" class="input_style1" type="text" value="<?php echo $current_member->email; ?>"/>
        </li>
        <li>
        	<label id="password" class="sign_up_label">Password</label>
        	<input id="member_password" name="password" size="30" class="input_style1" type="password" />
        </li>
        <li>
        	<label id="password_confirmation" class="sign_up_label">Confirm Password</label>
            <input id="member_password_confirmation" name="password_confirmation" class="input_style1"  size="30" type="password" />
       </li>
        <li>
        	<label id="time_zone" class="sign_up_label">Time Zone</label>
			  <select name="timezone" id="timezone" class="input_style1"  style="background-color:#fff;">
			    <option value="0" >Select Time Zone</option>
			    <?php foreach (getTimeZone() as $k=>$v): ?>
			    <?php if($current_member->mytimezone == $k): ?>
			    <option selected="selected" value="<?php echo $k; ?>"><?php echo $v ?></option>
			    <?php else: ?>
			    <option value="<?php echo $k; ?>"><?php echo $v ?></option>
			    <?php endif; ?>
			    <?php endforeach;?>
			    </select>
            </li>
        <li><label class="sign_up_label">&nbsp;</label><input class="login_btn" name="commit" type="submit" value="Save" /></li>
       </ul>
    </form>
    </div>
    </div>
    <div class="sign_up_box_btm"></div>
</div><br /><br />

