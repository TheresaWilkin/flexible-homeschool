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
	hello('google').api('me').then(function(r) {
    console.log(r)
	}, function(e) {
    console.log(e);
  });
});

export default () => <button onClick={() => hello('google').login()}>Google</button>;
