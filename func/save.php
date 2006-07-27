<?php

// save.php

// arguments:
// string filename
// string contents

require("environment.php");

if (!isset($_POST["filename"]) || !$_POST["filename"]){
	header("X-Return-Value: 0");
	header("X-Error-Message: No filename provided");
	exit;
}

$ftp = ftp_connect(FTP_SERVER);

if ($ftp){
	$login_result = ftp_login($ftp, $_SESSION["wate"]["username"], $_SESSION["wate"]["password"]);

	if ($login_result){
		if ($_POST["filename"]{strlen($_POST["filename"])-1} == "/"){
			$_POST["filename"] = substr($_POST["filename"],0,strlen($_POST["filename"])-1);
		}
		
		$dir = explode("/",$_POST["filename"]);
		
		array_pop($dir);
		
		$path = "/";
		
		foreach ($dir as $nextDir){
			$path .= $nextDir . "/";
			
			if(!@ftp_chdir($ftp,$path)){
				@ftp_chdir($ftp,"/");
				
				if(!@ftp_mkdir($ftp,$path)){
					ftp_close($ftp);
					
					header("X-Return-Value: 0");
					header("X-Error-Message: Could not create directory " . $path);
					exit;
				}
			}
		}
		
		if (!isset($_POST["contents"])){
			$_POST["contents"] = '';
		}

		$tempName = tempnam("/tmp","");
		$tf = fopen($tempName, "w");
		fwrite($tf, $_POST["contents"]);
		fclose($tf);
		
		if (@ftp_put($ftp, $_POST["filename"], $tempName, FTP_ASCII)){
			header("X-Return-Value: 1");
		}
		else {
			header("X-Return-Value: 0");
			header("X-Error-Message: Could not write to file ".$_POST["filename"]);
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