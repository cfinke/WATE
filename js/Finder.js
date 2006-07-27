function Finder(){
	this.dialog = document.getElementById("findDialog");
	this.findInput = document.getElementById("findInput");
	this.submitter = document.getElementById("findSubmit");
	this.findNext = document.getElementById("findNextSubmit");
	
	this.caseSensitive = document.getElementById('caseSensitiveCB');
	
	this.closeButton = document.getElementById("closeFindDialog");
	
	this.closeButton.onclick = function (evt) {
		document.getElementById("findDialog").style.visibility = 'hidden';
	};	
}