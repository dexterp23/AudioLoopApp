function WelcomePage () {
	
	$.ui.launch();
	nextPage('WelcomePage');
	$.ui.clearHistory();
	
	/*
	global_audio_data[0] = "audio_loop.mp3";
	global_audio_data[1] = "audio_1.mp3";
	global_audio_data[2] = "audio_2.mp3";
	*/
	
	global_audio_data[0] = global_host+"/audio_loop.mp3";
	global_audio_data[1] = global_host+"/audio_1.mp3";
	global_audio_data[2] = global_host+"/audio_2.mp3";
	
	
	for (var key in global_audio_data) {
		LoadAudio (key);
	}
	
}


















































