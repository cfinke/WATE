function Replacer(){
	this.dialog = document.getElementById("replaceDialog");
	this.find = document.getElementById("replaceFindInput");
	this.replace = document.getElementById("replaceInput");
	this.submitter = document.getElementById("replaceSubmit");
	this.replaceAll = document.getElementById("replaceAllSubmit");
	
	this.caseSensitive = document.getElementById('replaceMatchCase');
	
	this.closeButton = document.getElementById("closeReplaceDialog");
	
	this.closeButton.onclick = function temp(evt){
		document.getElementById("replaceDialog").style.visibility = 'hidden';
	};
}