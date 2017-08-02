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
	 	jQuery('.overlay').fadeIn('slow');
	 }

	/**
	 * [hideOverlay : method to hide overlay]
	 */
	 function hideOverlay() {
	 	jQuery('.overlay').fadeOut('slow');
	 }

	/**
	 * [displayImages : method to append the images in body and display]
	 * @param  {[JSON Array]} imageJSON [accepts the JSON array of images to display]
	 */
	 function displayImages(imageJSON) {
	 	console.log('In displayImages=>', imageJSON);
	 	var singleImage;
	 	for (var i = 0; i<imageJSON.length; i++) {
	 		singleImage = '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4">'+
	 		'<img class="img-responsive imgLink" alt="'+imageJSON[i].name+'" src="'+imageJSON[i].imgSource+'">'+
	 		'</li>';
	 		jQuery('.galleryContainer').append(singleImage);
		} // for loop ends here
	} //displayImages ends here

	//Event handler for image link when clicked 
	jQuery(document).on('click','.imgLink',function(e){
		e.preventDefault();
		console.log('imgLink clicked');
		showOverlay();

		//getting image data
		var imgSrc = jQuery(this).attr('src');
		var imgNumber = jQuery(this).parent('li').index();  

		//assigning the next and previous image numbers to navigate
		jQuery('.next').attr('href', imgNumber + 2);
		jQuery('.prev').attr('href', imgNumber);

		jQuery('.bigImage').attr('src', imgSrc).load(function() {
			jQuery(this).fadeIn('slow');
		});

		jQuery('a.navigationControls').trigger('click');
		return false;
	});

	//Event handler for close button on overlay to close it
	jQuery('.closebtn').click(function(event) {
		hideOverlay();
	});

	jQuery(document).keyup(function(e) {
		if (e.keyCode == 27) { 
			hideOverlay();
		}
	});

	jQuery(document).on('click','.overlay',function(e){
		hideOverlay();
		return false;
	});

	jQuery(document).on('click','.navigationControls',function(e){
		e.preventDefault();

		//retrieving the image data to process navigation details
		var imgNumber = jQuery(this).attr('href');
		var imgSrc = jQuery('ul.row li:nth-child('+ imgNumber +') img').attr('src');  
		var imgName = jQuery('ul.row li:nth-child('+ imgNumber +') img').attr('alt');  

		//Assigning the image in larger view           
		jQuery('.bigImage').attr('src', imgSrc);
		jQuery('.imageTitle').html(imgName);

		//Calculating the next and previous position
		var newPrevNo = parseInt(imgNumber) - 1; 
		var newNextNo = parseInt(newPrevNo) + 2; 

		//Assigning new positions
		if(jQuery(this).hasClass('prev')){               
			jQuery(this).attr('href', newPrevNo); 
			jQuery('a.next').attr('href', newNextNo);
		}else{
			jQuery(this).attr('href', newNextNo); 
			jQuery('a.prev').attr('href', newPrevNo);
		}

		var totalImages = jQuery('ul.row li').length + 1; 

		//Checking the total number of image to show/hide the navigation controls
		if(totalImages === newNextNo){
			jQuery('a.next').hide();
		}else{
			jQuery('a.next').show()
		}    

		if(newPrevNo === 0){
			jQuery('a.prev').hide();
		}else{
			jQuery('a.prev').show()
		}

		return false;
	});

}); //document ready ends here