function scrollToSearch() {
    var target = $('#results');
    $('html, body').animate({
    scrollTop: target.offset().top
    }, 500);
    return false;
}

function makeResultLine(title, extract, articleURL) {
    var results = document.querySelector('#results');
    var resultLine = document.createElement('div')
    resultLine.setAttribute('class', 'resultLine');
    var titleP = document.createElement('p')
    titleP.setAttribute('class', 'articletitle');
    var titleA = document.createElement('a');
    titleA.setAttribute('href', articleURL);
    titleA.innerHTML = title;
    var extractP = document.createElement('p')
    extractP.setAttribute('class', 'articleextract');
    extractP.innerHTML = extract;

    titleP.appendChild(titleA);
    resultLine.appendChild(titleP);
    resultLine.appendChild(extractP);
    results.appendChild(resultLine);

}

$(document).ready(function() {
	// Stuff to do when page loads
    $('#searchWiki').on('click', function(e){
    e.preventDefault();

// Vars
var query = document.querySelector('#searchbox').value;
var apiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+query;

// Show loading graphic

// Request search results from Wikipedia
$.ajax({
    type: 'GET',
    dataType:'jsonp',
    url: apiURL,
    crossDomain: true,
    cache: false,
    success: function(json) {
        // Sort out results
        var pages = json.query.pages;
        for (var val in pages) {
            var title = pages[val].title;
            var extract = pages[val].extract;
            var articleURL = 'https://en.wikipedia.org/?curid='+pages[val].pageid;
            makeResultLine(title, extract, articleURL);
        }
        // Scroll to results section
        scrollToSearch();
    }// end success
});// end ajax
}); // end on click
}); // end document ready
