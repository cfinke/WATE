<?php




session_start();

session_destroy();

$_SESSION["wate"] = array();

?>
<html>
	<head>
		<title>WATE: Web Advanced Text Editor</title>
	</head>
	<body>
		<form method="POST" action="editor.php">
			<input type="hidden" name="action" value="login" />
			<input type="text" name="username" />
			<input type="password" name="password" />
			<input type="submit" value="Login" />
		</form>
	</body>
</html>