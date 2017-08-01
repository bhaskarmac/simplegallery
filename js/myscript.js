jQuery(document).ready(function() {
	console.log('document is ready!');

	$.getJSON('js/imageData.json', function(data) {
		console.log('data=>', data);
	});


});