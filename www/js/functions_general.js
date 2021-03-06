function nextPage (idHash) {
	
	$.ui.loadContent(idHash,false,false,'slide');
	$.ui.disableSideMenu();
	global_current_page = idHash;

}


function GoBack () {
	
	$.ui.goBack();
	
}


function OpenSideMenu () {

	$.ui.enableSideMenu();
	$.ui.toggleSideMenu();
	
}


function custom_alert (text, id) {
	
	if (typeof(id) == 'undefined') id = "CustomAlert";
	
	var id_find = $('#NoNetAlert').attr('id');
	
	if (typeof(id_find) == 'undefined') {
	
		$("#afui").popup({ 
						id:id,
						title:global_app_title,
						message:text,
						cancelText:"OK", 
						cancelOnly:true
						});
						
	}
	
}


function openURL (url) {
	
	cordova.InAppBrowser.open(url, '_blank', 'location=yes');

}


function sizeIt () {
	$('#afui, #content').css({'height': global_height+'px'});
}


function getNetChk () {
	
	if (navigator.connection.type=="none") {
		$.ui.hideMask();
		custom_alert("No Internet connection, make sure you have coverage and try again.");
	} else {
		homePage ();
	}

}


function clear_form_elements(ele) {

    jQuery(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
			case 'tel':
			case 'email':
			case 'number':
            case 'textarea':
                jQuery(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });

}


function randomPassword (length) {
  chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  pass = "";
  for(x=0;x<length;x++)
  {
    i = Math.floor(Math.random() * 62);
    pass += chars.charAt(i);
  }
  return pass;
}


function htmlspecialchars (unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}


function htmlspecialchars_custom (unsafe) {
  return unsafe
      .replace(/&/g, "")
	  .replace(/&amp;/g,"")
	  .replace(/amp;/g,"")
      .replace(/</g, "")
	  .replace(/&lt;/g,"")
	  .replace(/lt;/g,"")
      .replace(/>/g, "")
	  .replace(/&gt;/g,"")
	  .replace(/gt;/g,"")
      .replace(/"/g, "")
	  .replace(/&quot;/g,"")
	  .replace(/quot;/g,"")
      .replace(/'/g, "")
	  .replace(/&#039;/g,"")
	  .replace(/#039;/g,"");
}


function addslashes(str) {
	str=str.replace(/\\/g,'\\\\');
	str=str.replace(/\'/g,'\\\'');
	str=str.replace(/\"/g,'\\"');
	str=str.replace(/\0/g,'\\0');
	return str;
}



function stripslashes(str) {
	str=str.replace(/\\'/g,'\'');
	str=str.replace(/\\&quot;/g,'\&quot;');
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\0/g,'\0');
	str=str.replace(/\\\\/g,'\\');
	return str;
}


function rand (min, max) {
	
    return Math.floor(Math.random() * (max - min + 1)) + min;

}


function number_format (number, decimals, dec_point, thousands_sep) {

    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');    }
    return s.join(dec);
}


//izbacuje odredjeni value iz niza
function removeItem(array, item){
	for(var i in array){
		if(array[i]==item){
			array.splice(i,1);
			break;
			}
	}
}


function fromJSDateToDate (type, date) {
	
	var new_date;
	var d = new Date(date);
	var day = d.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
		
	switch(type) {
		case 'usaDate':
			new_date = month + '/' + day + '/' + year;
		break;
		case 'dbDate':
			new_date = year + '-' + month + '-' + day;
		break;
	}
	
	return new_date;
	
}


function setCookie(cname, cvalue, exdays) {
	
	localStorage.setItem(cname, cvalue);
	
}


function getCookie(cname) {
	
	return localStorage.getItem(cname);
	
}


function removeCookie (cname) {
	
	localStorage.setItem(cname, '');
	
}


function getLocationNetChk (callback) {
	
	if (navigator.connection.type=="none") {
		$.ui.hideMask();
		custom_alert("No Internet connection, make sure you have coverage and try again.");
	} else {
		setTimeout(function(){updateLocation (callback, true);}, 0);
	}

}
function updateLocation (callback, clearWatch_chk) {
	
	global_geolocationWatchTimer_chk = 1;
	var options = {timeout: 15000, maximumAge: 11000, enableHighAccuracy: true };
														  								  
	global_geolocationWatchTimer = navigator.geolocation.watchPosition(function(position) {
																if (position.coords.accuracy < global_accuracy_value) {
																	global_latitude = position.coords.latitude; 
																	global_longitude = position.coords.longitude;
																	global_accuracy = position.coords.accuracy;
																	if (clearWatch_chk == true) {
																		navigator.geolocation.clearWatch(global_geolocationWatchTimer);
																		global_geolocationWatchTimer_chk = 0;
																	}
																	if (callback != false) setTimeout(callback, 100);
																	$.ui.hideMask();
																} else {
																	navigator.geolocation.clearWatch(global_geolocationWatchTimer);
																	global_geolocationWatchTimer_chk = 0;
																	updateLocation (callback, clearWatch_chk);
																}
															  },updateLocationError,options);
															  
	
}
function updateLocationError (error) {
	
	$.ui.hideMask();
	navigator.geolocation.clearWatch(global_geolocationWatchTimer);
	global_geolocationWatchTimer_chk = 0;
	custom_alert("Cannot determine current location, ensure location services are on for the app and try again.");
	//custom_alert('code: ' + error.code + '\n' + 'message: ' + error.message);
	//alert(JSON.stringify(error.message));
  
}



function TimeFormat (value) {
	
	value = value / 1000;
	
	var out="";
	var mins=0;
	var secs=0;
	
	mins=Math.floor(value/60);
	value=value%60;
	secs=Math.floor(value);
		
	if (mins) {
		out += mins + 'm ';
	}
	//if (secs) {
		out += secs + 's ';
	//}
		
	return out;

}



function WhichBrowser () {
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    //M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    //if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    //return M.join(' ');
	return M[1];
}



//distanca izmedju dve tacke
function distanceCal(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}



// ### audio ### //
function LoadAudio (id) {
	
	//https://www.w3schools.com/jsref/dom_obj_audio.asp
	
	$('#audio_player_holder_'+id).remove();
	$('body').append('<audio id="audio_player_holder_'+id+'"><source src="'+global_audio_data[id]['audio']+'" type="audio/mpeg" /></audio>');
	
	global_audio_loop[id] = document.getElementById('audio_player_holder_'+id);
	
	if (id == 0) global_audio_loop[id].loop = true;
	global_audio_loop[id].load();
	
}

function PlayAudio (id) {

    global_audio_loop[id].play();
	
	if (parseInt (global_audio_data[id]['repeat']) > 0 && typeof(global_audio_setInterval[id]) == 'undefined') {
		var sec = parseInt (global_audio_data[id]['repeat']) * 1000;
		global_audio_setInterval[id] = setInterval(function(){ PlayAudio (id); }, sec);
	}
	
}

function StopAudio () {
	
	for (var key in global_audio_data) {
		global_audio_loop[key].pause();	
		clearInterval(global_audio_setInterval[key]);
	}
	
	global_audio_setInterval = new Array();
	
}
// ### audio - end ### //






















