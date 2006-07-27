var dcmFocus = false;

document.getElementById("goHome").onclick = function temp(){
	loadFiles("~");
};

document.getElementById('deleteCommand').onclick = function temp(){
	confirmDelete(currentDocument.filename);
};

document.getElementById('saveCommand').onclick = function temp(){
	saveFile();
};

document.getElementById('newCommand').onclick = function temp(){
	var filename = prompt("Filename?", currentDirectory);
	
	setCurrentDocument(new Doc(filename));
};

document.getElementById('saveAsCommand').onclick = function temp(){
	var filename = prompt("Save as...", currentDocument.filename);
	
	setCurrentDocument(new Doc(filename, currentDocument.textarea.value, currentDocument.lines));
	
	document.getElementById('saveCommand').onclick();
};

document.getElementById('closeCommand').onclick = function temp(){
	closeFile();
};

document.getElementById('closeAllCommand').onclick = function temp(){
	closeAllFiles();
};

document.getElementById('findCommand').onclick = function temp(){
	findString();
};

document.getElementById('replaceCommand').onclick = function temp(){
	replaceString();
};

document.getElementById('viewFilesCommand').onclick = function () {
	if (document.getElementById('files').style.display == 'none'){
		document.getElementById('editor').style.width = '80%';
		document.getElementById('files').style.display = '';
	}
	else {
		document.getElementById('files').style.display = 'none';
		document.getElementById('editor').style.width = '100%';
	}
};

document.getElementById('hideListing').onclick = document.getElementById('viewFilesCommand').onclick;

document.getElementById("openDirectory").onclick = function temp(){
	loadFiles(cmDirectory);
};

document.getElementById("deleteDirectory").onclick = function temp(){
	confirmDeleteDirectory(cmDirectory);
};

document.getElementById("renameDirectory").onclick = function temp(){
	renameDirectory(cmDirectory);
};

document.onmousedown = function (e) {
	var targ;
	if (!e) var e = window.event;
	
	if (e.target) {
		targ = e.target;
	}
	else if (e.srcElement) {
		targ = e.srcElement;
	}
	
	if (targ.nodeType == 3) {
		// defeat Safari bug
		targ = targ.parentNode;
	}
	
	// Drag and drop possibilities go here.
	
	while (targ && targ.tagName != 'BODY'){
		if (targ.tagName == 'INPUT'){
			return true;
		}
		
		for (var i = 0; i < draggableObjectIDs.length; i++){
			if (draggableObjectIDs[i] == targ.id){
				dragObject = targ;
				break;
			}
		}
		
		targ = targ.parentNode;
	}
	
	if (dragObject){
		dragObject.lastX = e.clientX;
		dragObject.lastY = e.clientY;
	}
};

document.onmousemove = function (e) {
	if (dragObject){
		dragObject.style.left = parseInt(parseInt(dragObject.style.left.replace(/px/,'')) + (e.clientX - dragObject.lastX)).toString() + 'px';
		dragObject.style.top = parseInt(parseInt(dragObject.style.top.replace(/px/,''))	+ (e.clientY - dragObject.lastY)).toString() + 'px';
		dragObject.lastX = e.clientX;
		dragObject.lastY = e.clientY;
	}
};

document.onmouseup = function (e) {
	dragObject = null;
};