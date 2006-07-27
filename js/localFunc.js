function confirmDelete(filename){
	if (confirm("Are you sure you want to delete " + filename + "?")){
		deleteFile(filename);
	}
}

function confirmDeleteDirectory(dir){
	if (confirm("Are you sure you want to delete " + dir + "?")){
		deleteDirectory(dir);
	}
}

function insert(input, theText){
	if (typeof input.selectionStart != 'undefined'){
		var start = input.selectionStart;
		var end = input.selectionEnd;
		input.value = input.value.substr(0, start) + theText + input.value.substr(end);
		input.selectionStart = start + theText.length;
		input.selectionEnd = start + theText.length;
		input.focus;
	}
}


function statusArea(message, length){
	if (!message){
		if (currentDocument){
			message = currentDocument.filename;
		}
		else {
			message = '';
		}
	}
	
	document.getElementById('statusArea').innerHTML = message;
	
	if (length){
		if (currentDocument){
			setTimeout('statusArea(\'' + currentDocument.filename + '\')',(length * 1000));
		}
		else {
			setTimeout('statusArea(\'\')',(length * 1000));
		}
	}
}

function setCurrentDocument(DocObject){
	for (x in documents){
		documents[x].textarea.style.display = 'none';
		documents[x].lineNumbers.style.display = 'none';
	}
	
	currentDocument = DocObject;
	
	if (currentDocument){
		currentDocument.textarea.style.display = '';
		currentDocument.lineNumbers.style.display = '';
		
		statusArea(currentDocument.filename);
		
		currentDocument.textarea.scrollTop = currentDocument.saveScrollTop;
		
		currentDocument.textarea.selectionStart = currentDocument.saveSelectionStart;
		currentDocument.textarea.selectionEnd = currentDocument.saveSelectionEnd;
		
		currentDocument.textarea.focus();
	}
	else {
		statusArea('');
	}
}

function scrollLineNumbers(){
	if (currentDocument){
		currentDocument.lineNumbers.scrollTop = currentDocument.textarea.scrollTop;
		currentDocument.saveScrollTop = currentDocument.textarea.scrollTop;
		currentDocument.saveSelectionStart = currentDocument.textarea.selectionStart;
		currentDocument.saveSelectionEnd = currentDocument.textarea.selectionEnd;
	}
		
	setTimeout('scrollLineNumbers();',50);
}

function closeFile(){
	// Remove file from document list
	
	oldDocuments = documents;
	documents = [];
	
	for (x in oldDocuments){
		if (oldDocuments[x] != currentDocument){
			documents.push(oldDocuments[x]);
		}
	}
	
	// Remove textarea
	
	document.getElementById('documents').removeChild(currentDocument.textarea);
	
	// Remove line numbers
	
	document.getElementById('lineNumbers').removeChild(currentDocument.lineNumbers);
	
	// Remove from document list
	
	var documentsOpen = document.getElementById('documentMenu').getElementsByTagName("li");
	
	for (var i = 0; i < documentsOpen.length; i++){
		if (documentsOpen[i].getAttribute("filename") == currentDocument.filename){
			document.getElementById('documentMenu').removeChild(documentsOpen[i]);
			break;
		}
	}
	
	if (documents.length > 0){
		for (x in documents){
			setCurrentDocument(documents[x]);
			break;
		}
	}
	else {
		setCurrentDocument(null);
	}
}

function closeAllFiles(){
	while (currentDocument != null){
		closeFile();
	}
}

function findString(){
	FindDialog.dialog.style.visibility = '';
	FindDialog.findInput.focus();
}

function doFind(){
	var toFind = FindDialog.findInput.value;
	var origToFind = toFind;
	var haystack = currentDocument.textarea.value;
	
	if (!FindDialog.caseSensitive){
		toFind = toFind.toLowerCase();
		haystack = haystack.toLowerCase();
	}
	
	var position = haystack.indexOf(toFind);
	
	if (position != 1){
		currentDocument.textarea.selectionStart = position;
		currentDocument.textarea.selectionEnd = position + toFind.length;
		
		currentDocument.textarea.focus();
	}
	else {
		alert('Could not find string "' + origToFind + '"');
	}
}

function doFindNext(){
	var oldSelEnd = currentDocument.textarea.selectionEnd || 0;
	var toFind = FindDialog.findInput.value;
	var origToFind = toFind;
	var haystack = currentDocument.textarea.value.substr(oldSelEnd);

	if (!FindDialog.caseSensitive){
		toFind = toFind.toLowerCase();
		haystack = haystack.toLowerCase();
	}
	
	var position = haystack.indexOf(toFind);
	
	if (position > 0){
		position += oldSelEnd;
		
		currentDocument.textarea.selectionStart = position;
		currentDocument.textarea.selectionEnd = position + toFind.length;
		
		currentDocument.textarea.focus();
	}
	else {
		if (confirm('No more occurences of "' + origToFind + '" found.  Continue from beginning?')){
			currentDocument.textarea.selectionStart = 0;
			currentDocument.textarea.selectionEnd = 0;
			doFindNext();
		}
	}
}

function replaceString(){
	ReplaceDialog.dialog.style.visibility = '';
}

function doReplace(){
	var mods = 'i';
	
	if (ReplaceDialog.caseSensitive.checked){
		mods = '';
	}
	
	var find = new RegExp(ReplaceDialog.find.value, mods);
	var replace = ReplaceDialog.replace.value;
	
	currentDocument.textarea.value = currentDocument.textarea.value.replace(find, replace);
}

function doReplaceAll(){
	var mods = 'ig';
	
	if (ReplaceDialog.caseSensitive.checked){
		mods = 'g';
	}
	
	var find = new RegExp(ReplaceDialog.find.value, mods);
	var replace = ReplaceDialog.replace.value;
	
	currentDocument.textarea.value = currentDocument.textarea.value.replace(find, replace);
}

function showDirContextMenu(clickEvent){
	var menu = document.getElementById("dirContextMenu");
	
	var left = clickEvent.clientX + (window.pageXOffset || document.body.scrollLeft);
	var top = clickEvent.clientY + (window.pageYOffset || document.body.scrollTop);
	
	menu.style.top = top;
	menu.style.left = left;
	menu.style.visibility = '';
}

function handleDirClick(dirNode, evt){
	if (evt.which == 1){
		loadFiles(dirNode.getAttribute("directory"));
	}
}

function hideContextMenus(){
	document.getElementById('dirContextMenu').style.visibility = 'hidden';
}