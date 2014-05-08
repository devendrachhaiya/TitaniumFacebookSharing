function Controller() {
    function getUserFbProfileInfo() {
        facebook.requestWithGraphPath("me", {}, "GET", function(e) {
            e.success ? parseFbProfileInfo(e.result) : e.error ? alert(e.error) : alert("Unknown response");
        });
    }
    function parseFbProfileInfo(result) {
        var resultArray = JSON.parse(result);
        $.tblInfo.scrollable = true;
        var tbl_data = [ {
            title: "Username : " + resultArray.username
        }, {
            title: "Firstname : " + resultArray.first_name
        }, {
            title: "link : " + resultArray.link
        } ];
        $.tblInfo.setData(tbl_data);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profiledetails";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.profiledetails = Ti.UI.createWindow({
        backgroundColor: "white",
        top: Alloy.Globals.appTop,
        layout: "vertical",
        id: "profiledetails"
    });
    $.__views.profiledetails && $.addTopLevelView($.__views.profiledetails);
    $.__views.lblShowProfile = Ti.UI.createLabel({
        text: "Profile Details",
        id: "lblShowProfile"
    });
    $.__views.profiledetails.add($.__views.lblShowProfile);
    $.__views.btnPostPage = Ti.UI.createButton({
        title: "Post page",
        id: "btnPostPage"
    });
    $.__views.profiledetails.add($.__views.btnPostPage);
    $.__views.viewTableView = Ti.UI.createView({
        id: "viewTableView"
    });
    $.__views.profiledetails.add($.__views.viewTableView);
    $.__views.tblInfo = Ti.UI.createTableView({
        id: "tblInfo"
    });
    $.__views.viewTableView.add($.__views.tblInfo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var facebook = Alloy.Globals.Facebook;
    $.btnPostPage.addEventListener("click", function() {
        changeView("facebookpost");
    });
    getUserFbProfileInfo();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;