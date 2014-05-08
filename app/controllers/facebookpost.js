var args = arguments[0] || {};

var imagePath = '';
var blob='';

var fb = Alloy.Globals.Facebook;

// First make sure this permission exists
fb.permissions = ['publish_stream'];
fb.authorize();

// ...
// ...



$.btnPostMsg.addEventListener('click',function(e){
	// Now create the status message after you've confirmed that authorize() succeeded
	fb.requestWithGraphPath('me/feed', {message: $.txtPostMsgOnFB.value}, 
	         "POST", function(e) {
	    if (e.success) {
	        alert("Success!  From FB: " + e.result);
	    } else {
	        if (e.error) {
	            alert(e.error);
	        } else {
	            alert("Unkown result");
	        }
	    }
	});
});


$.btnPickImage.addEventListener('click',function(e){
	selectImage();
});

//Create a dialog with options
var dialog = Titanium.UI.createOptionDialog({
    //title of dialog
    title: 'Choose an image source...',
    //options
    options: ['Camera','Photo Gallery', 'Cancel'],
    //index of cancel button
    cancel:2
});
 
//add event listener
dialog.addEventListener('click', function(e) {
    //if first option was selected
    if(e.index == 0)
    {
        //then we are getting image from camera
        Titanium.Media.showCamera({
            //we got something
            success:function(event)
            {
                //getting media
                // var image = event.media;
                // blob=event.media;
                
                // var heightOfImage = image.height;
                // var widthOfImage = image.width;
                // var aspectRatio = heightOfImage / widthOfImage;
// 
                // if (heightOfImage > widthOfImage) {
                    // var newHeight = 50;
                    // var new_width = Math.round(newHeight / aspectRatio);
                    // var advance_image = image_factory.imageAsResized(image, {
                        // width : new_width,
                        // height : newHeight,
                    // });
// 
                    // Ti.API.info("image size 1: " + advance_image.width + "," + advance_image.height);
                    // writeTempFile(advance_image);
                // } else {
                    // var new_width = 50;
                    // var newHeight = Math.round(new_width * aspectRatio);
                    // var advance_image = image_factory.imageAsResized(image, {
                        // width : new_width,
                        // height : newHeight,
                    // });
                    // Ti.API.info("image size:2 " + advance_image.width + "," + advance_image.height);
                    // writeTempFile(advance_image);
                // };
                //checking if it is photo
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                {
                    //we may create image view with contents from image variable
                    //or simply save path to image
                     blob=event.media;
                    postImageOnFB();
                    // isImagePosted = true;
                    // ext = imagePath.split('.');
                    
                }
            },
            cancel:function()
            {
                //do somehting if user cancels operation
            },
            error:function(error)
            {
                //error happend, create alert
                var a = Titanium.UI.createAlertDialog({title:'Camera'});
                //set message
                if (error.code == Titanium.Media.NO_CAMERA)
                {
                    a.setMessage('Device does not have camera');
                }
                else
                {
                    a.setMessage('Unexpected error: ' + error.code);
                }
                // show alert
                a.show();
            },
            allowImageEditing:true,
            saveToPhotoGallery:true
        });
    }
    else if(e.index == 1)
    {
        //obtain an image from the gallery
        Titanium.Media.openPhotoGallery({
            success:function(event)
            {
                //getting media
                // var image = event.media;
                
                // var heightOfImage = image.height;
                // var widthOfImage = image.width;
                // var aspectRatio = heightOfImage / widthOfImage;
// 
                // if (heightOfImage > widthOfImage) {
                    // var newHeight = 120;
                    // var new_width = Math.round(newHeight / aspectRatio);
                    // var advance_image = image_factory.imageAsResized(image, {
                        // width : new_width,
                        // height : newHeight,
                    // });
// 
                    // //     var imag = image_factory.imageAsResized(image,  {width:120, height:40});
                    // Ti.API.info("image size 1: " + advance_image.width + "," + advance_image.height);
                    // writeTempFile(advance_image);
                // } else {
                    // var new_width = 120;
                    // var newHeight = Math.round(new_width * aspectRatio);
                    // var advance_image = image_factory.imageAsResized(image, {
                        // width : new_width,
                        // height : newHeight,
                    // });
                    // Ti.API.info("image size:2 " + advance_image.width + "," + advance_image.height);
                    // writeTempFile(advance_image);
                // };
                 
                //checking if it is photo
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
                {
                    //we may create image view with contents from image variable
                    //or simply save path to image
                    blob=event.media;
                    postImageOnFB();
                    // isImagePosted = true;
                    // ext = imagePath.split('.');
                    
                }  
            },
            cancel:function()
            {
                //user cancelled the action from within
                //the photo gallery
            }
        });
    }
    else
    {
        //cancel was tapped
        //user opted not to choose a photo
    }
});
 
function selectImage(){
    //show dialog
    dialog.show();
};

function postImageOnFB(){
    // Now post the photo after you've confirmed that authorize() succeeded
    // var f = Titanium.Filesystem.getFile(imagePath);
//	var f = Ti.Filesystem.getFile('pumpkin.jpg');
	// var blob = f.read();
	var data = {
	    message: 'This is a test image',
	    picture: blob
	};
	fb.requestWithGraphPath('me/photos', data, 'POST', function(e){
	    if (e.success) {
	        alert("Success!  From FB: " + e.result);
	    } else {
	        if (e.error) {
	            alert(e.error);
	        } else {
	            alert("Unkown result");
	        }
	    }
	});
	// blo
};

function writeTempFile(image) {
    var writeFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'default.png');
    if (writeFile.exists()) {
        //delete writefile
    }
    writeFile.write(image);
    imagePath = writeFile.nativePath;
    Ti.API.info("ImageFile path is: " + writeFile.nativePath);
//    alert(writeFile.nativePath);
}