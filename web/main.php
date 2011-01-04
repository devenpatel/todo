<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang='en' xml:lang='en' xmlns='http://www.w3.org/1999/xhtml'>
    <head>
      <!-- <script src='http://www.google.com/jsapi'></script> 
        <script type='text/javascript'>
            /*
             //<![CDATA[
             google.load("jquery", "1.4");
             google.load("jqueryui", "1.7.2");
             //]]>
             */
        </script>
        -->

        <script src="js/jquery-1.4.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui-1.7.2.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="js/jquery.thickbox.js"></script>
        <link rel="stylesheet" href="css/thickbox.css" type="text/css" media="screen" />

      
        <script type='text/javascript'>
            //<![CDATA[
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-11554093-1']);
            _gaq.push(['_trackPageview']);
            /*
          (function(){
            var ga = document.createElement('script');
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            ga.setAttribute('async', 'async');
            document.getElementsByTagName('head')[0].appendChild(ga);

          })();
             */
            //]]>
        </script>

        <title>ToDo</title>
        <meta content='application/xhtml+xml; charset=UTF-8' http-equiv='content-type' />
        <meta content='This is the home page of todo the 13th greatest invention of all time.' name='description' />
        <meta content='to do list, to do lists, to do, to dos' name='keywords' />
        <meta content='index,follow,noarchive' name='robots' />
        <meta content='noarchive' name='googlebot' />
        <link href="css/base_packaged.css" media="screen" rel="stylesheet" type="text/css" />
        <script src="js/todo_list_cufon.js" type="text/javascript"></script>
        <style type="text/css">
            img, div, input, #container a.premonth, #container a.premonth, #container a.nextmonth, #container a.right,#container a.left   { behavior: url("js/iepngfix.htc") }
        </style>
          <!--[if IE 6]>
            <script type="text/javascript" src="js/iepngfix_tilebg.js"></script>
            <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
        <![endif]-->

    </head>

    <?php $action_name = basename($_SERVER['PHP_SELF']); ?>
    <body id='<?php echo $action_name == "list.php" ? "users_todo_list" : $action_name == "settings.php" ? "users_todo_settings" : "users_todo_index" ?>'>

        <div class='clearFix' id='container'>

            <div class="sidebar_boxe_outer">
                <?php if ($action_name == "list.php"): ?>



                    <!-- Previous Day > Navigation Link  -->
                    <a href="list.php?date=<?php echo strftime('%Y-%m-%d', $p_day); ?>" class="left"></a>

                    <!-- Previous day pending (not done) tasks list -->
                    <div class="pendTask"><?php require_once("user/pendingtask.php"); ?></div>

                <?php endif; ?>
                </div>

                <!-- Main Header login logout signup -->
                <div class='<?php echo $action_name == "list.php" ? "clearFix" : "" ?>' id='content_wrapper' <?php echo $action_name == "list.php" ? "style='float:left;'" : "" ?> >
                    <div id='header'>
                        <h1 class='fontme logo'><a href="/list.php">ToDo</a></h1>
                    <?php require_once("loginbar.php") ?>
                </div>

                <!-- Notice -->
                <?php if (isset($a_flash['notice'])): ?>
                <?php foreach ($a_flash['notice'] as $k => $v): ?>
                            <div id="flash<?php echo $k ?>" class="flash" align="center">
                    <?php echo $v ?>
                        </div>
                <?php endforeach; ?>
                <?php endif; ?>
                            <div class="clear">&nbsp;</div>

                            <!-- Search Crieria and goto -->
                <?php if ($action_name == "list.php"): ?>
                <?php require_once("user/gotoday_form.php"); ?>



                <?php endif; ?>

                                <!-- Render Dynamic Content File -->
                <?php require_once($content_file); ?>

                                <!-- Footer -->
                                <div id='footer'>
                                    <p class='copyright'>
                                        Copyright © 2010 <a href="#">Privacy Policy</a>
                                    </p>
                                    <p class='copyright'>
                                    </p>
                                </div>
                            </div>

                            <div class="sidebar_boxe_outer">
                                <!-- Next Day > Navigation Link  -->
                <?php if ($action_name == "list.php"): ?>
                                    <a href="list.php?date=<?php echo strftime('%Y-%m-%d', $n_day); ?>" class="right"></a>

                                    <!-- Today Task List -->
                                    <div class="todayTask"><?php include("user/todaytask.php"); ?></div>

                                    <!-- Feedback -->


                <?php endif; ?>
                                </div>
            <?php if ($action_name == "list.php"): ?>
            <?php require_once("template/feedback.php"); ?>
            <?php endif; ?>

        </div>

        <!-- Load Javascript -->
        <script src="js/todo_packaged.js" type="text/javascript"></script>
    </body>
</html>





