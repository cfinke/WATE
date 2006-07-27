<?php

require("environment.php");

$ftp = ftp_connect("localhost");

if ($ftp){
	$login_result = ftp_login($ftp, $_SESSION["wate"]["username"], $_SESSION["wate"]["password"]);
	
	if ($login_result){
		if (!isset($_REQUEST["dir"]) || !$_REQUEST["dir"]){
			$_REQUEST["dir"] = "~";
		}
		
		$entries = array();
		
		$entries = @ftp_nlist($ftp, $_REQUEST["dir"]);
		ftp_close($ftp);
		
		$entries[] = "..";

		$directory = $entries[0];
		$directory = explode("/",strrev($directory), 2);
		
		if (count($directory) == 2){
			$directory = strrev($directory[1]) . "/";
		}
		else {
			$directory = $_REQUEST["dir"];
		}

		header("Content-Type: text/xml");
		header("X-Directory: ".$directory);
		header("X-Return-Value: 1");
		
		echo '<contents>';
		
		if (count($entries) > 0){
			foreach ($entries as $e){
				$eDisplay = str_replace($directory, "", $e);
				
				if (($eDisplay != 'CVS')){
					if (is_dir($e)){
				
						echo '<directory';
					}
					else {
						echo '<file';
					}
					
					echo ' name="'.htmlspecialchars($eDisplay).'" />';
				}
			}
		}
		
		echo '</contents>';
		
		exit;
	}
	else {
		ftp_close($ftp);
		
		header("X-Return-Value: 0");
		header("X-Error-Message: Could not login to FTP server");
		exit;
	}
}
else {
	header("X-Return-Value: 0");
	header("X-Error-Message: Could not connect to FTP server");
	exit;
}

?>