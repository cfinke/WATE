function loadFiles(directory){
	if (directory) {
		var buffer = directory.split("/");
		directory = [];
		
		for (x in buffer){
			if (buffer[x] == "."){
			}
			else if (buffer[x] == ".."){
				directory.pop();
			}
			else {
				directory.push(buffer[x]);
			}
		}
		
		directory = directory.join("/");
	
		statusArea('Loading directory ' + directory);
	}
	
	var filePane = document.getElementById('listing');
	
	filePane.innerHTML = '';
	
	var httpRequest;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	var requestURL = "func/ls.php";
	
	if (directory) {
		requestURL += "?dir=" + encodeURIComponent(directory);
	}
	
	httpRequest.open("GET",requestURL,true);
					
	httpRequest.onreadystatechange = function (evt) {
		if (httpRequest.readyState == 4){
			if (httpRequest.status == 200){
				if (httpRequest.getResponseHeader("X-Return-Value") == '1'){
					directory = httpRequest.getResponseHeader("X-Directory");
					
					currentDirectory = directory;
					
					var xml = httpRequest.responseXML;
					
					var directories = xml.getElementsByTagName("directory");
					var files = xml.getElementsByTagName("file");
					
					var dirArray = [];
					var fileArray = [];
					
					for (var i = 0; i < directories.length; i++){
						dirArray.push(directories[i].getAttribute("name"));
					}
					
					for (var i = 0; i < files.length; i++){
						fileArray.push(files[i].getAttribute("name"));
					}
					
					dirArray.sort();
					fileArray.sort();
					
					for (var i = 0; i < dirArray.length; i++){
						filePane.innerHTML += '<div class="dirLink" oncontextmenu="cmDirectory = \'' + directory + dirArray[i] + '\';showDirContextMenu(event);return false;" onclick="handleDirClick(this, event);" directory="' + directory + dirArray[i] + '">' + dirArray[i] + '</div>';
					}
					
					for (var i = 0; i < fileArray.length; i++){
						filePane.innerHTML += '<div class="fileLink" onclick="openFile(\'' + directory + fileArray[i] + '\');">' + fileArray[i] + '</div>';
					}
					
					statusArea('Directory ' + directory + ' has been loaded.',3);
				}
				else {
					alert(httpRequest.getResponseHeader("X-Error-Message"));
					alert(httpRequest.getResponseHeader("X-Return-Value"));
					alert(directory);
					statusArea();
				}
			}
		}
	};
	
	httpRequest.send(null);
}

function openFile(file){
	for (x in documents){
		if (documents[x].filename == file){
			setCurrentDocument(documents[x]);
			return true;
		}
	}
	
	statusArea('Retrieving file ' + file);
	
	var httpRequest;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	}
					
	httpRequest.open("GET","func/open.php?filename=" + encodeURIComponent(file),true);
					
	httpRequest.onreadystatechange = function (evt) {
		if (httpRequest.readyState == 4){
			if (httpRequest.status == 200){
				if (httpRequest.getResponseHeader("X-Return-Value") == '1'){
					setCurrentDocument(new Doc(file, httpRequest.responseText, httpRequest.getResponseHeader("X-Lines")));
					
					statusArea('Retrieved file ' + file, 3);
					currentDocument.textarea.focus();
				}
				else {
					alert(httpRequest.getResponseHeader("X-Error-Message"));
					statusArea();
				}
			}
		}
	};
	
	httpRequest.send(null);
}

function deleteFile(filename){
	var httpRequest;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	var requestURL = "func/delete.php";
	var postString = "filename=" + encodeURIComponent(filename);
	
	httpRequest.open("POST", requestURL, true);
	httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	httpRequest.onreadystatechange = function (evt) {
		if (httpRequest.readyState == 4){
			if (httpRequest.status == 200){
				if (httpRequest.getResponseHeader("X-Return-Value") == '1'){
					statusArea(filename + ' was deleted successfully.');
					closeFile();
					loadFiles(currentDirectory);
				}
				else {
					alert(httpRequest.getResponseHeader("X-Error-Message"));
					statusArea();
				}
			}
		}
	};
	
	httpRequest.send(postString);
}

function deleteDirectory(dir){
	var httpRequest;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	var requestURL = "func/deleteDir.php";
	var postString = "dir=" + encodeURIComponent(dir);
	
	httpRequest.open("POST", requestURL, true);
	httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	httpRequest.onreadystatechange = function (evt) {
		if (httpRequest.readyState == 4){
			if (httpRequest.status == 200){
				if (httpRequest.getResponseHeader("X-Return-Value") == '1'){
					statusArea(dir + ' was deleted successfully.');
					loadFiles(currentDirectory);
				}
				else {
					alert(httpRequest.getResponseHeader("X-Error-Message"));
					statusArea();
				}
			}
		}
	};
	
	httpRequest.send(postString);
}

function saveFile(){
	statusArea('Saving ' + currentDocument.filename);
	var contents = currentDocument.textarea.value;
	
	var httpRequest;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	var postString = "filename=" + encodeURIComponent(currentDocument.filename) + "&contents=" + encodeURIComponent(currentDocument.textarea.value);
					
	httpRequest.open("POST","func/save.php",true);
	httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	httpRequest.onreadystatechange = function (evt) {
		if (httpRequest.readyState == 4){
			if (httpRequest.status == 200){
				if (httpRequest.getResponseHeader("X-Return-Value") == '1'){
					statusArea(currentDocument.filename + ' saved successfully.', 3);
				}
				else {
					alert(httpRequest.getResponseHeader("X-Error-Message"));
					statusArea();
				}
			}
		}
	};
	
	httpRequest.send(postString);
}

function renameDirectory(oldDir){
	var newDir = prompt("Rename " + oldDir + " to:",oldDir);
	
	statusArea('Renaming ' + oldDir);
	
	var httpRequest;

	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	}
	
	var postString = "old=" + encodeURIComponent(oldDir) + "&new=" + encodeURIComponent(newDir);
					
	httpRequest.open("POST","func/rename.php",true);
	httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	httpRequest.onreadystatechange = function (evt) {
		if (httpRequest.readyState == 4){
			if (httpRequest.status == 200){
				if (httpRequest.getResponseHeader("X-Return-Value") == '1'){
					statusArea(oldDir + " successfully renamed to " + newDir, 3);
					loadFiles(currentDirectory);
				}
				else {
					alert(httpRequest.getResponseHeader("X-Error-Message"));
					statusArea();
				}
			}
		}
	};
	
	httpRequest.send(postString);
}