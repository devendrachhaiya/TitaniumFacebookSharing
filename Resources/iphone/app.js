function changeView(nextView) {
    Ti.App.Properties.setBool("load_users", false);
    var nextView = Alloy.createController(nextView);
    nextView.getView().open();
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Facebook = require("facebook");

Alloy.Globals.appTop = "20dp";

// var image_factory = require("ti.imagefactory");

Alloy.createController("index");