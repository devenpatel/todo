<table width="800" border="0" align="center" cellpadding="0" cellspacing="0" class="timeform"> 
	<tr>
        <td align="left" valign="top" ><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="">
            <td width="15" height="15" align="left" valign="top"><img src="../images/main_left_top_curve.jpg"  alt="alt" width="15" height="15" border="0" /></td>
            <td width="770" height="15" class="main_box_mid_top"></td>
            <td width="15" height="15" align="right" valign="top"><img src="../images/main_right_top_curve.jpg" alt="alt" width="15" height="15" /></td>
          </tr>
        </table></td>
    </tr>
    <tr>
        <td align="center" valign="top" class="main_box_mid_mid_bg">
        	<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
        <td width="72%" align="left" valign="top">
                <table width="432" border="0" cellpadding="0" cellspacing="0" class="dateleftpart">
                    <form name="goto" action="search.php" method="post" >
                        <tr>
                            <td width="80" align="left" valign="middle">
                            	<lable class="main_box_lable">Date From :</lable>
                            </td> 
                            <td width="137" align="left" valign="middle">		
                            	<input class="main_box_input_bg_input" type="text" name="datef" id="datef" value="yyyy-mm-dd" size="10" />
                            </td>
                            <td width="78" align="left" valign="middle">
                              <lable class="main_box_lable">Date To :</lable>
                            </td> 
                            <td width="135" align="left" valign="middle">
                                <input class="main_box_input_bg_input" type="text" name="datet" id="datet" value="yyyy-mm-dd" size="10" />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" valign="middle"><lable class="main_box_lable">Task :</lable></td> 
                            <td align="left" valign="middle">
                            	<input class="main_box_input_bg_input" type="text" name="task" id="task" size="10" />
                            </td>
                            <td align="left" valign="middle"><a name="commit" class="thickboxlink" href="search.php">
                                <img src="../images/search_btn.gif" alt="alt" width="37" height="31" border="0" /></a>
                      </td>
                            <td>&nbsp;</td>
                       </tr>
                    </form>
                </table>            
          </td>
        <td width="28%" valign="top">
            <table width="269" border="0" align="right" cellpadding="0" cellspacing="0">
                <form name="goto" action="" method="POST" onsubmit="return submitGoto()">
                    <tr>
                        <td width="80" align="left" valign="middle">
                        	<lable class="main_box_lable">Goto Day :</lable></td>
                    <td width="137" align="left" valign="middle"><input class="main_box_input_bg_input" type="text" name="goto" id="goto" value="<?php echo isset($_POST['goto']) ? $_POST['goto'] : 'yyyy-mm-dd';?>" size="10"/></td>
                    <td width="50" align="right" valign="middle"><input type="submit" name="submit" class="go_btn" value="" /></td>
                    </tr>
                </form>
            </table>
        </td>
  </tr>
  <tr>
    <td colspan="2" align="right" valign="top"><a href="#" class="today" id="today"><img src="../images/today_bg.gif" alt="alt" width="94" height="31" border="0" /></a></td>
    </tr>
  
          </table>

      </td>
    </tr>
    <tr align="center">
        <td align="center" colspan="2">
            
        </td>
    </tr>
    <tr align="center">
      <td align="center" colspan="2"><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="">
          <td width="15" height="15" align="left" valign="top"><img src="../images/main_left_btm_curve.jpg"  width="15" height="15" /></td>
          <td width="770" height="15" class="main_box_mid_btm"></td>
          <td width="15" height="15" align="right" valign="top"><img src="../images/main_btm_right_curve.jpg" alt="alt" width="15" height="15" /></td>
        </tr>
      </table></td>
    </tr>
    <tr align="center">
      <td align="center" colspan="2"><img src="../images/main_btm_shading.jpg" alt="btm" width="800" height="7" border="0" /></td>
    </tr>
</table>

<!--
<script type="text/javascript">


    $(document).ready(function(){
        $("a.thickboxlink").click(function(){            
            if (isDate($("#datef").val()) && isDate($("#datef").val())) {
                if(!$("#task").val()){
                    alert('Please Enter Task.'); return false;
                }
                var ss__href = this.href;
                ss__href += "?task=" + $("#task").val() + "&sdate=" + $("#datef").val() + "&edate=" + $("#datet").val();
                tb_show('Search',ss__href);
                this.blur();
            }
            else {
                alert('Invalid date format! it must be yyyy-mm-dd.');
            }
            return false;
        });

        $("#datef").click(function(){
            if(this.value == "yyyy-mm-dd")
                this.value = "";
        });
        $("#datef").focusout(function() {
            if(!this.value)
                this.value = "yyyy-mm-dd";
        });

        $("#datet").click(function(){
            if(this.value == "yyyy-mm-dd")
                this.value = "";
        });
        $("#datet").focusout(function() {
            if(!this.value)
                this.value = "yyyy-mm-dd";
        });

    });
</script>

-->