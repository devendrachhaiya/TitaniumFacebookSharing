function doClick(e) {
	alert($.label.text);
}

var facebook = Alloy.Globals.Facebook;
facebook.appid = 677418828983959;
facebook.permissions = ['read_stream'];
$.fbButton.style = facebook.BUTTON_STYLE_WIDE;
//$.btnLogout.hide();
facebook.addEventListener('login', function(e) {
	if (e.success) {
		// alert('Logged In');
		Ti.API.info('loged In');
		changeView('profiledetails');
		//$.profiledetails.open();
		// getUserFbProfileInfo();
	} else if (e.error) {
		alert(e.error);
	} else if (e.cancelled) {
		alert("Canceled");
	}
});

// facebook.reauthorize(['public_profile'],'me',function(e){
// Ti.API.info('Reauthorized permission'+e);
// });





// function addProfileDetailsRowUi(item, value){
// var tableRow=tableRow();
// }

facebook.addEventListener('logout', function(e) {
	alert('Logged out');
});

$.index.open();
