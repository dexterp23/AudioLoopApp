function WelcomePage () {
	
	$.ui.launch();
	nextPage('WelcomePage');
	$.ui.clearHistory();
	

	
	global_audio_data[0] = {'path':global_host+"/audio_loop.mp3", 'repeat':0};
	global_audio_data[1] = {'path':global_host+"/audio_1.mp3", 'repeat':5};
	global_audio_data[2] = {'path':global_host+"/audio_2.mp3", 'repeat':10};
	
	
	for (var key in global_audio_data) {
		//if (key == 0) {
			LoadAudio (key);
		//}
	}
	
}


















































