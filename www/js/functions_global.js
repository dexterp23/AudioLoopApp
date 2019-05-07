var local_chk = 1;
/*
0 - local app full
1 - mob app full
*/

if (local_chk == 1) {
	//var global_host = "http://audioloopapp.teamsnapp.com"; //hosting
	var global_host = "http://192.168.0.13/audio_loop_app"; //local
} else if (local_chk == 0) {
	//var global_host = "http://127.0.0.2/audio_loop_app"; //local
	var global_host = "http://192.168.0.13/audio_loop_app"; //local
}
//putanja u mobu: file://android_asset/www/

var global_app_title = "Audio Loop";
var global_ajax_timeout = 20000;//20sec
var global_lang = "en";
var global_browser;
var global_platform;
var global_model;
var global_width;
var global_height;
var global_current_page;
var global_geolocationWatchTimer;
var global_geolocationWatchTimer_chk = 0;
var global_audio_data = new Array();


/* INIT */
	
	jQuery.noConflict();
	$.ui.autoLaunch = false;
	$.ui.animateHeaders = false;
	$.ui.useOSThemes = false;
	$.ui.autoLaunch = false;
			
	$(document).ready(function(){
		if (local_chk == 0) { //local
			global_platform = "Android";
			$.ui.setSideMenuWidth('260px');
			homePage();
		}
		global_browser = WhichBrowser();
	});
						
	
	var onDeviceReady=function(){                             // called when Cordova is ready
		if( window.Cordova && navigator.splashscreen ) {     // Cordova API detected
			$.ui.setSideMenuWidth('260px');
			$.ui.disableSideMenu();
			navigator.splashscreen.hide() ;                 // hide splash screen
			if (local_chk == 1) {
				document.addEventListener("offline", getNetChk, false);
				document.addEventListener("online", getNetChk, false);
				global_platform = device.platform;
				global_model = device.model;
				Keyboard.shrinkView(true);
				homePage();
			}
			//global_platform = "iOS";
		}
	} ;
	document.addEventListener("deviceready", onDeviceReady, false) ;
	window.addEventListener("resize", function(){ sizeIt(); }, false);

/* INIT END */




function homePage () {
	
	homePage_init ();

	//nextPage('test');

}


function homePage_init () {
	
	$.ui.hideMask();
	$.ui.clearHistory();
	global_width = window.innerWidth;
	global_height = window.innerHeight;
	StartApp();

}


function StartApp () {
	
	WelcomePage ();
	
}


function aboutPage () {
	
	nextPage('aboutPage');

}


