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
	 * [showOverlay : method to show overlay]
	 */
	 function showOverlay() {
	 	jQuery('.overlay').css('width', '100%');;
	 }

	/**
	 * [hideOverlay : method to hide overlay]
	 */
	 function hideOverlay() {
	 	jQuery('.overlay').css('width', '0%');;
	 }

	/**
	 * [displayImages : method to append the images in body and display]
	 * @param  {[JSON Array]} imageJSON [accepts the JSON array of images to display]
	 */
	 function displayImages(imageJSON) {
	 	console.log('In displayImages=>', imageJSON);
	 	var singleImage;
	 	for (var i = 0; i<imageJSON.length; i++) {
	 		singleImage = '<div class="gallery">'+
	 		'<a href="'+imageJSON[i].imgSource+'" class="imgLink">'+
	 		'<img src="'+imageJSON[i].imgSource+'" alt="'+imageJSON[i].name+'" width="300" height="200">'+
	 		'</a>'+
	 		'<div class="desc">'+imageJSON[i].name+'</div>'+
	 		'</div>';

	 		jQuery('.galleryContainer').append(singleImage);
		} // for loop ends here
	} //displayImages ends here

	//Event handler for image link when clicked 
	jQuery(document).on('click','.imgLink',function(e){
		e.preventDefault();
		console.log('imgLink clicked');
		showOverlay();
		return false;
	});

	//Event handler for close button on overlay to close it
	jQuery('.closebtn').click(function(event) {
		hideOverlay();
	});



}); //document ready ends here