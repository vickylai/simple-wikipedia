// Instantiate new modal
var modal = new Custombox.modal({
  content: {
    effect: 'fadein',
    target: '#modal'
  }
});

// Open
$(function(){
        $('#searchWiki').on('click', function() {
        modal.open();
    });
});

$(document).ready(function() {
	// Stuff to do when page loads
	// function();
});