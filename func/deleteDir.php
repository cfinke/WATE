<?php

require("environment.php");

if (!isset($_REQUEST["dir"]) || !$_REQUEST["dir"]){
	header("X-Return-Value: 0");
	header("X-Error-Message: No directory specified");
	exit;
}

if ($ftp = ftp_connect("localhost")){
	$login_result = ftp_login($ftp, $_SESSION["wate"]["username"], $_SESSION["wate"]["password"]);
	
	if ($login_result){
		$deleteResult = intval(@ftp_rmdir($ftp, $_REQUEST["dir"]));
		
		header("X-Return-Value: ".intval($deleteResult));
		
		if (!$deleteResult){
			header("X-Error-Message: " . $_REQUEST["dir"] . " could not be deleted.");
		}
	}
	else {
		header("X-Return-Value: 0");
		header("X-Error-Message: Could not login to FTP server");
	}
	
	ftp_close($ftp);
	exit;
}
else {
	header("X-Return-Value: 0");
	header("X-Error-Message: Could not connect to FTP server");
	exit;
}

?>