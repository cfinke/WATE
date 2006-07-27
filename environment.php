<?php

error_reporting(E_ALL);

session_start();

if (get_magic_quotes_gpc()) {
	foreach ($_POST as $key => $val) if (!is_array($val)) $_POST[$key] = trim(stripslashes($val));
	foreach ($_GET as $key => $val) if (!is_array($val)) $_GET[$key] = trim(stripslashes($val));
	foreach ($_REQUEST as $key => $val) if (!is_array($val)) $_REQUEST[$key] = trim(stripslashes($val));
}
else {
	foreach ($_POST as $key => $val) if (!is_array($val)) $_POST[$key] = trim($val);
	foreach ($_GET as $key => $val) if (!is_array($val)) $_GET[$key] = trim($val);
	foreach ($_REQUEST as $key => $val) if (!is_array($val)) $_REQUEST[$key] = trim($val);
}

if (isset($_REQUEST["action"]) && ($_REQUEST["action"] == 'login')){
	$ftp = ftp_connect("localhost");
	$login_result = ftp_login($ftp, $_REQUEST["username"], $_REQUEST["password"]);
	
	if ($login_result){
		$_SESSION["wate"]["username"] = $_REQUEST["username"];
		$_SESSION["wate"]["password"] = $_REQUEST["password"];
	}
	else {
		session_destroy();
		$_SESSION["wate"] = array();
	}
	
	ftp_close($ftp);
}

if (!isset($_SESSION["wate"]["username"])){
	header("Location: index.php");
	exit;
}

define("FTP_SERVER","localhost");

?>
