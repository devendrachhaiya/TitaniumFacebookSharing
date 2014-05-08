function Controller() {
    function doClick() {
        alert($.label.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        top: Alloy.Globals.appTop,
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.viewBtn = Ti.UI.createView({
        height: "30dp",
        width: "100%",
        id: "viewBtn"
    });
    $.__views.index.add($.__views.viewBtn);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        visible: false,
        text: "Hello, World",
        id: "label"
    });
    $.__views.viewBtn.add($.__views.label);
    doClick ? $.__views.label.addEventListener("click", doClick) : __defers["$.__views.label!click!doClick"] = true;
    $.__views.fbButton = Alloy.Globals.Facebook.createLoginButton({
        id: "fbButton",
        ns: "Alloy.Globals.Facebook"
    });
    $.__views.viewBtn.add($.__views.fbButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var facebook = Alloy.Globals.Facebook;
    facebook.appid = 677418828983959;
    facebook.permissions = [ "read_stream" ];
    $.fbButton.style = facebook.BUTTON_STYLE_WIDE;
    facebook.addEventListener("login", function(e) {
        if (e.success) {
            Ti.API.info("loged In");
            changeView("profiledetails");
        } else e.error ? alert(e.error) : e.cancelled && alert("Canceled");
    });
    facebook.addEventListener("logout", function() {
        alert("Logged out");
    });
    $.index.open();
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;