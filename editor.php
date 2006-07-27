<?php

require("environment.php");

?>
<html>
	<head>
		<title>WATE: Web Advanced Text Editor</title>
		<link rel="stylesheet" type="text/css" href="css/main.css" />
		<link rel="stylesheet" type="text/css" href="css/menu.css" />
		<script type="text/javascript" src="js/config.js"></script>
		<script type="text/javascript" src="js/serverFunc.js"></script>
		<script type="text/javascript" src="js/localFunc.js"></script>
		<script type="text/javascript" src="js/Doc.js"></script>
		<script type="text/javascript" src="js/Finder.js"></script>
		<script type="text/javascript" src="js/Replacer.js"></script>
		<!--[if IE]>
			<style type="text/css" media="screen">
			
				#menu{float:none;} /* This is required for IE to avoid positioning bug when placing content first in source. */
				
				/* IE Menu CSS */
				
				/* csshover.htc file version: V1.21.041022 - Available for download from: http://www.xs4all.nl/~peterned/csshover.html */
				
				body{behavior:url(/v2/css/csshover.htc);
				
				font-size:100%; /* to enable text resizing in IE */
				}
				
				#menu ul li{float:left; width: 100%;}
				#menu h2, #menu a{height:1%;font: 0.7em/1.4em arial,helvetica,sans-serif;}
				#menu a { font-weight: bold; }
				
			</style>
		<![endif]-->
	</head>
	<body onload="loadFiles(); scrollLineNumbers();" onclick="hideContextMenus();">
		<div id="menu">
			<ul>
				<li>
					<h2>File</h2>
					<ul>
						<li><a id="newCommand">New...</a></li>
						<hr />
						<li><a id="saveCommand">Save</a></li>
						<li><a id="saveAsCommand">Save As...</a></li>
						<hr />
						<li><a id="deleteCommand">Delete</a></li>
						<hr />
						<li><a id="closeCommand">Close</a></li>
						<li><a id="closeAllCommand">Close All</a></li>
						<hr />
						<li><a href="index.php">Quit</a></li>
					</ul>
				</li>
			</ul>
			<ul>
				<li>
					<h2>Edit</h2>
					<ul>
						<li><a id="findCommand">Find...</a></li>
						<li><a id="replaceCommand">Replace</a></li>
					</ul>
				</li>
			</ul>
			<ul>
				<li>
					<h2>View</h2>
					<ul>
						<li><div id="viewFilesCheck"></div><a id="viewFilesCommand">Files Pane</a></li>
					</ul>
				</li>
			</ul>
			<ul>
				<li>
					<h2>Documents</h2>
					<ul id="documentMenu">
					</ul>
				</li>
			</ul>
		</div>
		<div id="statusArea"></div>
		<div id="menuBar"></div>
		<div id="main">
			<div id="files">
				<div id="toolbar">
					<img src="images/homeButton.gif" id="goHome" style="cursor: pointer; border: 1px black solid;" />
					<img src="images/closeButton.gif" id="hideListing" style="cursor: pointer; border: 1px black solid;" />
				</div>
				<div id="listing">
				</div>
			</div>
			<div id="editor">
				<div id="lineNumbers">
				</div>
				<div id="documents">
				</div>
			</div>
		</div>
		<div id="dialogs">
			<table cellspacing="0" id="findDialog" class="dialog" style="visibility: hidden; top: 200px; left: 200px;">
				<thead>
					<tr id="findDragBar">
						<td>Find...</td>
						<td><div class="closeButton" id="closeFindDialog">X</div></td>
					</tr>
				</thead>
				<tr>
					<td colspan="2">
						<table>
							<tr>
								<td>
									<input type="text" id="findInput" />
									<input type="submit" value="Find" id="findSubmit" onclick="doFind();" />
									<input type="submit" value="Find Next" id="findNextSubmit" onclick="doFindNext();"/>
								</td>
							</tr>
							<tr>
								<td><input type="checkbox" id="caseSensitiveCB" /> Match case</td>
								<td>&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table cellspacing="0" id="replaceDialog" class="dialog" style="visibility: hidden; top: 200px; left: 200px;">
				<thead>
					<tr>
						<td>Replace...</td>
						<td class="closeButton" id="closeReplaceDialog">X</td>
					</tr>
				</thead>
				<tr>
					<td colspan="2">
						<table border="1">
							<tr>
								<td>Find:</td>
								<td><input type="text" id="replaceFindInput" /></td>
								<td><input type="submit" value="Replace Once" id="replaceSubmit" onclick="doReplace();" /></td>
							</tr>
							<tr>
								<td>Replace:</td>
								<td><input type="text" id="replaceInput" /></td>
								<td>
									<input type="submit" value="Replace All" id="replaceAllSubmit" onclick="doReplaceAll();"/>
								</td>
							</tr>
							<tr>
								<td><input type="checkbox" id="replaceMatchCase" /> Match case</td>
								<td><input type="checkbox" id="inSelection" /> Replace in selection only</td>
								<td></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
		<div id="contextMenus">
			<div id="dirContextMenu" style="visibility: hidden;">
				<a id="openDirectory">Open</a>
				<a id="deleteDirectory">Delete</a>
				<a id="renameDirectory">Rename</a>
			</div>
		</div>
		<script type="text/javascript" src="js/objectInit.js"></script>
		<script type="text/javascript" src="js/events.js"></script>
		<script type="text/javascript" src="js/menu.js"></script>
	</body>
</html>