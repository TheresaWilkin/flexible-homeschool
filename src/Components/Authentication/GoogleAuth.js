import hello from 'hellojs';
import React from 'react';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

hello.init({
    google: GOOGLE_CLIENT_ID
}, {
    redirect_uri: '/'
});

hello.on('auth.login', function(auth) {

	// Call user information, for the given network
	hello(auth.network).api('calendar').then(function(r) {
		// Inject it into the container
    console.log(r)
	// 	var label = document.getElementById('profile_' + auth.network);
	// 	if (!label) {
	// 		label = document.createElement('div');
	// 		label.id = 'profile_' + auth.network;
	// 		document.getElementById('profile').appendChild(label);
	// 	}
	// 	label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
	});
});

export default () => <button onClick={() => hello('google').login()}>Google</button>;
