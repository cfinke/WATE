<?php

require("environment.php");

if (!isset($_POST["old"]) || !$_POST["old"]){
	header("X-Return-Value: 0");
	header("X-Error-Message: No source provided");
	exit;
}

if (!isset($_POST["new"]) || !$_POST["new"]){
	header("X-Return-Value: 0");
	header("X-Error-Message: No destination provided");
	exit;
}

$ftp = ftp_connect(FTP_SERVER);

if ($ftp){
	$login_result = ftp_login($ftp, $_SESSION["wate"]["username"], $_SESSION["wate"]["password"]);

	if ($login_result){
		if (@ftp_rename($ftp, $_POST["old"], $_POST["new"])){
			header("X-Return-Value: 1");
		}
		else {
			header("X-Return-Value: 0");
			header("X-Error-Message: Could not rename ".$_POST["old"]." to ".$_POST["new"]);
		}
		
		ftp_close($ftp);
		
		exit;
	}
	else {
		ftp_close($ftp);

		header("X-Return-Value: 0");
		header("X-Error-Message: Could not login to FTP server.");
		exit;
	}
	
}
else {
	header("X-Return-Value: 0");
	header("X-Error-Message: Could not connect to FTP server");
	exit;
}

?>