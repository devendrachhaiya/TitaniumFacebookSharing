function Controller() {
    function selectImage() {
        dialog.show();
    }
    function postImageOnFB() {
        var data = {
            message: "This is a test image",
            picture: blob
        };
        fb.requestWithGraphPath("me/photos", data, "POST", function(e) {
            e.success ? alert("Success!  From FB: " + e.result) : e.error ? alert(e.error) : alert("Unkown result");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "facebookpost";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.facebookpost = Ti.UI.createWindow({
        backgroundColor: "white",
        top: Alloy.Globals.appTop,
        layout: "vertical",
        id: "facebookpost"
    });
    $.__views.facebookpost && $.addTopLevelView($.__views.facebookpost);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Facebook post",
        id: "__alloyId0"
    });
    $.__views.facebookpost.add($.__views.__alloyId0);
    $.__views.txtPostMsgOnFB = Ti.UI.createTextField({
        backgroundColor: "white",
        top: "10dp",
        height: "40dp",
        width: "80%",
        borderColor: "gray",
        borderRadius: 3,
        id: "txtPostMsgOnFB"
    });
    $.__views.facebookpost.add($.__views.txtPostMsgOnFB);
    $.__views.btnPostMsg = Ti.UI.createButton({
        title: "Post",
        id: "btnPostMsg"
    });
    $.__views.facebookpost.add($.__views.btnPostMsg);
    $.__views.btnPickImage = Ti.UI.createButton({
        title: "Pick Image",
        id: "btnPickImage"
    });
    $.__views.facebookpost.add($.__views.btnPickImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var blob = "";
    var fb = Alloy.Globals.Facebook;
    fb.permissions = [ "publish_stream" ];
    fb.authorize();
    $.btnPostMsg.addEventListener("click", function() {
        fb.requestWithGraphPath("me/feed", {
            message: $.txtPostMsgOnFB.value
        }, "POST", function(e) {
            e.success ? alert("Success!  From FB: " + e.result) : e.error ? alert(e.error) : alert("Unkown result");
        });
    });
    $.btnPickImage.addEventListener("click", function() {
        selectImage();
    });
    var dialog = Titanium.UI.createOptionDialog({
        title: "Choose an image source...",
        options: [ "Camera", "Photo Gallery", "Cancel" ],
        cancel: 2
    });
    dialog.addEventListener("click", function(e) {
        0 == e.index ? Titanium.Media.showCamera({
            success: function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    blob = event.media;
                    postImageOnFB();
                }
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Device does not have camera") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            allowImageEditing: true,
            saveToPhotoGallery: true
        }) : 1 == e.index && Titanium.Media.openPhotoGallery({
            success: function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    blob = event.media;
                    postImageOnFB();
                }
            },
            cancel: function() {}
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;