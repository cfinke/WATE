function Doc(filename, contents, lines){
	if (!contents) {
		contents = '';
	}
	
	this.filename = filename;
	
	// Create new textarea
	
	this.textarea = document.createElement("textarea");
	this.textarea.className = 'docContent';
	this.textarea.setAttribute("rows",30);
	this.textarea.setAttribute("cols",60);
	this.textarea.setAttribute("wrap","off");
	this.textarea.style.display = 'none';
	
	this.saveScrollTop = 0;
	this.saveSelectionStart = 0;
	this.saveSelectionEnd = 0;
	
	document.getElementById('documents').appendChild(this.textarea);
	
	this.textarea.value = contents;
	
	// Create new line number display
	
	this.lineNumbers = document.createElement("div");
	this.lineNumbers.className = 'docLineNumbers';
	
	if (lines){
		this.lines = lines;
	}
	else {
		this.lines = 0;
	}

	buffer = '';
	
	for (var i = 1; i <= (this.lines * 2); i++){
		buffer += i + '<br />';
	}
		
	buffer += '<br /><br /><br /><br />';
	
	this.lineNumbers.innerHTML = buffer;

	this.lineNumbers.style.display = "none";
	this.lineNumbers.scrollTop = 0;
	
	document.getElementById('lineNumbers').appendChild(this.lineNumbers);
	
	this.textarea.onkeydown = function keydowns(evt){
		var tempTop = this.scrollTop;
		var tempLeft = this.scrollLeft;
		
		if (evt.keyCode == 9){ // Tab
			if (this.selectionStart != this.selectionEnd){
				var find;
				var replace;
				
				if (evt.shiftKey){
					find = /\n\t/g;
					replace = "\n";
				}
				else {
					find = /\n/g;
					replace = "\n\t";
				}
				
				oldStart = this.selectionStart;
				oldEnd = this.selectionEnd;
				
				// If there is selected text, indent (or unindent)
				var haystack = this.value.substring(this.selectionStart, this.selectionEnd);
				
				haystack = haystack.replace(find, replace);
				
				this.value = this.value.substring(0, this.selectionStart) + haystack + this.value.substr(this.selectionEnd);
				this.selectionStart = oldStart;
				this.selectionEnd = oldStart + haystack.length;
			}				
			else {
				// If there is no selected text, just put the tab in
				insert(this, "\t");
			}
			
			this.scrollTop = tempTop;
			this.scrollLeft = tempLeft;
			
			return false;
		}
		else if ((evt.keyCode == 83) && evt.ctrlKey && evt.shiftKey){ // Ctrl-Shift-S
			document.getElementById('saveAsCommand').onclick();
			return false
		}
		else if ((evt.keyCode == 83) && evt.ctrlKey){ // Ctrl-S
			document.getElementById('saveCommand').onclick();
			return false;
		}
		else if ((evt.keyCode == 70) && evt.ctrlKey){ // Ctrl-F
			findString();
			return false;
		}
		else if ((evt.keyCode == 82) && evt.ctrlKey){ // Ctrl-R
			replaceString();
			return false;
		}
		else if ((evt.keyCode == 87) && evt.ctrlKey && evt.shiftKey){ // Ctrl-Shift-W
			closeAllFiles();
			return false;
		}
		else if ((evt.keyCode == 87) && evt.ctrlKey){ // Ctrl-W
			closeFile();
			return false;
		}		
		else if ((evt.keyCode == 13)){ // Enter		
			// Determine the previous tabbing level
			input = this;
			// Get the text before the current line
			var start = input.selectionStart;
			var prevLine = input.value.substr(0, start).split("\n");
			prevLine = prevLine[(prevLine.length - 1)];
			
			var insertString = "\n";
			
			for (var i = 0; i < prevLine.length; i++){
				if (prevLine[i] == "\t"){
					insertString += "\t";
				}
				else {
					break;
				}
			}
			
			insert(this, insertString);			
			
			this.scrollTop = tempTop;
			this.scrollLeft = tempLeft;
			
			return false;
		}
		
		if (this.scollTop == 0){
			this.scrollTop = tempTop;
			this.scrollLeft = tempLeft;
		}
	};
	
	// Add this to the list of documents
	
	documents.push(this);
	
	// Add to list of open documents
	
	var fileListEntry = document.createElement("li");
	fileListEntry.setAttribute("filename",filename);
	
	var fileListAnchor = document.createElement("a");
	onlyFileName = this.filename.split('/');
	onlyFileName = onlyFileName.pop();
	fileListAnchor.innerHTML = onlyFileName;
	
	fileListAnchor.onclick = function (){
		openFile(filename);
	}
	
	fileListEntry.appendChild(fileListAnchor);
	
	document.getElementById('documentMenu').appendChild(fileListEntry);
	
	this.textarea.onscroll = function (e) {
		alert(e);
	};
	
	return this;
}