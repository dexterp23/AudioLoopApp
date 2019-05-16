function WelcomePage () {
	
	$.ui.launch();
	nextPage('WelcomePage');
	$.ui.clearHistory();
	
	TemplatesListPage();
	
	/*
	
	global_audio_data[0] = {'path':global_host+"/audio_loop.mp3", 'repeat':0};
	global_audio_data[1] = {'path':global_host+"/audio_1.mp3", 'repeat':5};
	global_audio_data[2] = {'path':global_host+"/audio_2.mp3", 'repeat':10};
	
	
	for (var key in global_audio_data) {
		//if (key == 0) {
			LoadAudio (key);
		//}
	}
	*/
	
}



function TemplatesListPage () {
	
	$.ui.showMask();
	
	StopAudio();
	global_audio_data = new Array();
	global_audio_loop = new Array();
	global_audio_setInterval = new Array();
	
	jQuery.ajax({
		url: global_host + '/action_mobile.php',
		dataType: 'jsonp',
		data: {page: 'TemplatesList', lang: global_lang},
		timeout: global_ajax_timeout,
		success: function(dataReceived) {
			
			$.ui.hideMask();
			
			var html = '';
			
			if (dataReceived[0].length > 0) {
				for (var key in dataReceived[0]) {
					
					html += TemplatesList_html (dataReceived[0][key]);
					
				}
			}

			
			if (dataReceived[0].length == 0) html += '<li>No Templates</li>';
			
			$('#WelcomePage .search_results_hold').html(html);
			
		},
		error : function() {
			$.ui.hideMask();
			custom_alert ("Cannot connect to server, please try again.", "NoNetAlert");
		}
	});
	
}



function TemplatesList_html (data) {
	
	var html = '';
	var html_hold = '';
	var br = 0;
	var img_style = '';
	
	html_hold += '<div class="hold">';
		if (data['description']) {
			html_hold += '<div class="subtext icon fa-tag">'+data['description']+'</div>';
			br++;
		} else {
			html_hold += '<div class="subtext">&nbsp;</div>';
			br++;
		}
	html_hold += '</div>';
	
	if (br > 4) img_style = 'margin-bottom: '+((br - 4) * 22)+'px';
	
	html += '<li class="content join_button">';
			html += '<a href="javascript: void(0);" onClick="TemplatesPage('+data['ID_templates']+');">';
			html += '<div class="join"></div>';
			html += '<div class="title">'+data['title']+'</div>';
			html += '<img src="'+data['photo']+'" style="height: 80px; width: 80px; '+img_style+'" />';
			html += html_hold;
		html += '</a>';
	html += '</li>';
	
	return html;
	
}



function TemplatesPage (ID_templates) {

	$.ui.showMask();
	
	jQuery.ajax({
		url: global_host + '/action_mobile.php',
		dataType: 'jsonp',
		data: {page: 'TemplatesPage', lang: global_lang, ID_templates: ID_templates},
		timeout: global_ajax_timeout,
		success: function(dataReceived) {
			
			global_audio_data[0] = dataReceived[0];
			for (var key in dataReceived[1]) {
				global_audio_data.push(dataReceived[1][key]);		
			}
			
			var html = '';
			for (var key in global_audio_data) {
				
				LoadAudio (key);
				
				html += '<a href="javascript: void(0);" onClick="PlayAudio('+key+');" class="button_regular">'+global_audio_data[key]['title']+'</a><br />';
				
			}
			
			$('#TemplatesPage .buttons_hold').html(html);
			$('#TemplatesPage h1').html(dataReceived[0]['templates_title']);

			$.ui.hideMask();
			nextPage('TemplatesPage');
			$.ui.clearHistory();
			
		},
		error : function() {
			$.ui.hideMask();
			custom_alert ("Cannot connect to server, please try again.", "NoNetAlert");
		}
	});
	
	
}


















































