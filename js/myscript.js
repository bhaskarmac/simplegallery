jQuery(document).ready(function() {
	console.log('document is ready now!');

	//Retrieving the image json data from imageData.json file
	$.getJSON('js/imageData.json', function(data) {
		console.log('data=>', data);
		if(data){
			displayImages(data.images);
		}else{
			console.log('Oops! something went wrong with json file.');
		}
	}); //getJSON ends here

	/**
	 * [displayImages : method to append the images in body and display]
	 * @param  {[JSON Array]} imageJSON [accepts the JSON array of images to display]
	 */
	function displayImages(imageJSON) {
		console.log('In displayImages=>', imageJSON);
		var singleImage;
		for (var i = 0;i<imageJSON.length; i++) {
			singleImage = '<div class="gallery">'+
			'<a href="'+imageJSON[i].imgSource+'">'+
			'<img src="'+imageJSON[i].imgSource+'" alt="'+imageJSON[i].name+'" width="300" height="200">'+
			'</a>'+
			'<div class="desc">'+imageJSON[i].name+'</div>'+
			'</div>';

			jQuery('.galleryContainer').append(singleImage);
		} // for loop ends here
		

	} //displayImages ends here


}); //document ready ends here