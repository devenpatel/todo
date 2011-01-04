<div align="center" style="color: red;"><?php echo isset($a_flash['error']) ? $a_flash['error'] : ""; ?></div>

<div class="loginForm">
    <div class="login_form_top"></div>
    <div class="login_form_bg">
        <div class="login_frm_inner">
            <form action="" method="post">
                <ul>
                    <li>
                        <div class="label1">Email</div>
                        <div class="input_txt_bg">
                            <div class="text_field_bg_left"> </div>
                            <div class="text_field_bg_mid">
                                <input id="username" name="email" type="text" class="input_style1" value="<?php echo isset($_POST['email']) ? $_POST['email'] : "" ; ?>"/>
                            </div>
                            <div class="text_field_bg_right"> </div>
                        </div>
                    </li>

                    <li> <div class="label1">Password</div>
                        <div class="input_txt_bg">
                            <div class="text_field_bg_left"> </div>
                            <div class="text_field_bg_mid">
                                <input id="password" name="password" class="input_style1" type="password" />
                            </div>
                            <div class="text_field_bg_right"> </div>
                        </div>
                    </li>
                    <!-- Uncomment this if you want this functionality
                    <li>
                    <div class="label1">Remember me</div>
                    <input id="remember_me" name="remember_me" type="checkbox" value="1" />
                    </li>
                    -->
                    <li>
                        <div class="label1">&nbsp;</div>
                        <input name="commit" type="submit" class="login_btn" value="Log in" /></li>
                </ul>
            </form>
        </div>
    </div>
    <div class="login_form_btm"></div>
</div>
<br /><br />
