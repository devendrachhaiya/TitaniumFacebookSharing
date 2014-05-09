var args = arguments[0] || {};

var facebook= Alloy.Globals.Facebook;
// (function(){
// 	
// });

function getUserFbProfileInfo() {
	facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		if (e.success) {
			// alert(e.result);
			parseFbProfileInfo(e.result);
		} else if (e.error) {
			alert(e.error);
		} else {
			alert('Unknown response');
		}
	});
}

function parseFbProfileInfo(result) {
	// Ti.API.info(result);
	var resultArray = JSON.parse(result);
	$.tblInfo.scrollable = true;
	
	// Ti.API.info(resultArray);
	//{"id":"","timezone":5.5,"username":"","link":"","location":{"id":"112027728823762","name":" "},"locale":"","education":[{"type":"High School","school":{"id":"210435959023390","name":"Mca"}},{"type":"College","year":{"id":"142963519060927","name":"2010"},"school":{"id":"482199398530751","name":"S D Bansal College Of Technology, Indore"}},{"type":"College","school":{"id":"150111418378134","name":"Sushila Devi Bansal College of Technology, Indore"}},{"type":"Graduate School","year":{"id":"142963519060927","name":"2010"},"degree":{"id":"128909403846469","name":"MCA"},"school":{"id":"131412266892586","name":"Sushila Devi Bahsal College of Technology (SDBCT)"}},{"type":"Graduate School","year":{"id":"113125125403208","name":"2004"},"degree":{"id":"106692286037894","name":"B.C.A"},"school":{"id":"248191401877628","name":"Shri Vaishnav Institute of Management (SVIM)"}}],"languages":[{"id":"112969428713061","name":"Hindi"},{"id":"106059522759137","name":"English"}],"hometown":{"id":"108086619211960","name":"Mhow"},"last_name":"","email":"","verified":true,"gender":"","name":" ","work":[{"position":{"id":"416940894990201","name":"Software Developer"},"start_date":"2011-06-24","location":{"id":"112027728823762","name":"Indore, India"},"employer":{"id":"158773330821426","name":"Cyber Infrastructure Pvt. Ltd."}},{"end_date":"2011-06-23","position":{"id":"108480125843293","name":"Web Developer"},"start_date":"2010-11-01","location":{"id":"112027728823762","name":"Indore, India"},"employer":{"id":"652353498117110","name":"Eclat Infotech Pvt Ltd Indore"}}],"first_name":"","updated_time":"2014-03-23T04:22:11+0000"}

	var tbl_data = [{
		title : 'Username : ' + resultArray.username
	}, {
		title : 'Firstname : ' + resultArray.first_name
	}, {
		title : 'link : ' + resultArray.link
	}];

	// // now assign that array to the table's data property to add those objects as rows
	// var table = Titanium.UI.createTableView({
	// data : tbl_data
	// });

	// alternatively, you could do
	$.tblInfo.setData(tbl_data);
}

$.btnPostPage.addEventListener('click',function(e){
	changeView('facebookpost');
});

getUserFbProfileInfo();

