
<?php

/*
 * Set DataBase
 */
$db_type = "mysql";
$db_uname = "deven";
$db_pass = "devenm206";
$db_server = "localhost";
$db_name = "deven_php_todo";
$db_dsn = $db_type.'://'.$db_uname.':'.$db_pass.'@'.$db_server.'/'.$db_name;


// compile.php
define('SANDBOX_PATH', dirname(__FILE__));
define('DOCTRINE_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'lib');
define('DATA_FIXTURES_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'fixtures');
define('MODELS_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'models');
define('MIGRATIONS_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'migrations');
define('SQL_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'sql');
define('YAML_SCHEMA_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'schema');
define('DB_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'sandbox.db');
define('DSN', $db_dsn);

require_once(DOCTRINE_PATH . DIRECTORY_SEPARATOR . 'Doctrine.php');

spl_autoload_register(array('Doctrine', 'autoload'));

echo Doctrine::compile('Doctrine.compiled.php', array('mysql'));
