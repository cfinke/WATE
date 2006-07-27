<?php

require("environment.php");

if (!isset($_REQUEST["filename"]) || !$_REQUEST["filename"]){
	header("X-Return-Value: 0");
	header("X-Error-Message: No filename specified");
	exit;
}

if ($ftp = ftp_connect("localhost")){
	$login_result = ftp_login($ftp, $_SESSION["wate"]["username"], $_SESSION["wate"]["password"]);
	
	if ($login_result){
		$deleteResult = intval(@ftp_delete($ftp, $_REQUEST["filename"]));
		
		header("X-Return-Value: ".intval($deleteResult));
		
		if (!$deleteResult){
			header("X-Error-Message: " . $_REQUEST["filename"] . " could not be deleted.");
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