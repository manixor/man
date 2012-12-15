function VisualSlideShow(options) {
	if (options.effect && options.effect.toLowerCase() == "fade") {
		options.effect = "";
	}
	var path = "";
	var regexp = /^(.*)visualslideshow\.js$/;
	Array.each($$("script"), function(item, index, object) {
		if (regexp.test(item.src)) {
			var res = regexp.exec(item.src);
			path = res[1];
		}
	});
	function writeScript(src, text) {
		document.write("<scr" + "ipt type=\"text/javascript\""
				+ (src ? " src=\"" + path + src + "\"" : "") + ">"
				+ (text || "") + "</scr" + "ipt>");
	}
	writeScript("slideshow.js");
	if (options.effect) {
		writeScript("slideshow." + options.effect.toLowerCase() + ".js");
	}
	if (options.sound) {
		writeScript("swfobject.js");
	}
	window
			.addEvent(
					"domready",
					function() {
						if (options.sound) {
							window.vssSoundListener = {
								onInit : function() {
								}
							};
							$(options.id).grab(new Element("div", {
								id : "vssSound"
							}));
							swfobject
									.createSWF(
											{
												data : path
														+ "player_mp3_js.swf",
												width : "1",
												height : "1"
											},
											{
												allowScriptAccess : "always",
												loop : true,
												FlashVars : "listener=vssSoundListener&loop=1&autoplay=1&mp3="
														+ options.sound
											}, "vssSound");
						}
						$$("#" + options.id + " div.slideshow-images img").set(
								{
									styles : {
										position : "absolute"
									}
								});
						var Instance;
						if (options.effect) {
							Instance = new Slideshow[options.effect](
									options.id, null, options);
						} else {
							Instance = new Slideshow(options.id, null, options);
						}
						if (!window.visualslideshow) {
							window.visualslideshow = [];
						}
						window.visualslideshow[window.visualslideshow.length] = Instance;
						var AP = $$("#" + options.id + " div.slideshow-images");
						var t = "";
						if (AP && t) {
							var c = new Element("div", {
								styles : {
									position : "absolute",
									right : 0,
									bottom : 0,
									padding : "0 3px 2px",
									'background-color' : "#EEE",
									'z-index' : 999999
								},
								events : {
									contextmenu : function(eventObject) {
										return false;
									}
								}
							});
							AP.grab(c);
							d = new Element("a", {
								href : "http://" + t.toLowerCase(),
								html : t,
								styles : {
									color : "#555",
									font : "10px Arial,Verdana,sans-serif",
									padding : "0 6px 3px",
									width : "auto",
									height : "auto",
									margin : "0 0 0 0",
									outline : "none"
								}
							});
							c.grab(d);
						}
					});
}
VisualSlideShow({
	"duration" : 3400,
	"delay" : 700,
	"sound" : "audio/0082. Kelly Family - An Angel.mp3",
	"id" : "show",
	"width" : 900,
	"height" : 620,
	"captions" : false,
	"controller" : false,
	"thumbnails" : false,
	"loop" : true,
	"paused" : false,
	"effect" : "KenBurns"
});