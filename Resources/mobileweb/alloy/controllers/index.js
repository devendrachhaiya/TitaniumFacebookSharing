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
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId8 = Ti.UI.createView({
        id: "__alloyId8"
    });
    $.__views.index.add($.__views.__alloyId8);
    $.__views.fbButton = Alloy.Globals.Facebook.createLoginButton({
        id: "fbButton",
        ns: "Alloy.Globals.Facebook"
    });
    $.__views.__alloyId8.add($.__views.fbButton);
    $.__views.tblInfo = Ti.UI.createTableView({
        id: "tblInfo"
    });
    $.__views.index.add($.__views.tblInfo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var facebook = Alloy.Globals.Facebook;
    facebook.appid = 677418828983959;
    facebook.permissions = [ "read_stream" ];
    $.fbButton.style = facebook.BUTTON_STYLE_WIDE;
    facebook.addEventListener("login", function(e) {
        if (e.success) {
            Ti.API.info("loged In");
            getUserFbProfileInfo();
        } else e.error ? alert(e.error) : e.cancelled && alert("Canceled");
    });
    facebook.addEventListener("logout", function() {
        alert("Logged out");
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;