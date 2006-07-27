<?php

require("environment.php");

// open.php

// arguments
// string filename

if (!isset($_REQUEST["filename"]) || !$_REQUEST["filename"]){
	header("X-Return-Value: 0");
	header("X-Error-Message: No filename specified.");
	exit;
}

if ($ftp = ftp_connect("localhost")){
	$login_result = ftp_login($ftp, $_SESSION["wate"]["username"], $_SESSION["wate"]["password"]);
	
	if ($login_result){
		$tmp_name = tempnam("/tmp","");
		
		if (@ftp_get($ftp, $tmp_name, $_REQUEST["filename"], FTP_ASCII)){
			$contents = file_get_contents($tmp_name,"r");
	
			header("X-Return-Value: 1");
			header("X-Lines: ".(substr_count($contents, "\n") + 1));
	
			echo $contents;
			exit;
		}
		else {
			header("X-Return-Value: 0");
			header("X-Error-Message: Could not open file " . $_REQUEST["filename"]);
			exit;
		}
		
		ftp_close($ftp);
	}
	else {
		header("X-Return-Value: 0");
		header("X-Error-Message: FTP login failed");
		exit;
	}
}
else {
	header("X-Return-Value: 0");
	header("X-Error-Message: Could not connect to FTP host");
	exit;
}

?>