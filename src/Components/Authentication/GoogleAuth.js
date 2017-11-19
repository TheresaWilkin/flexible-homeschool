import hello from 'hellojs';
import React from 'react';
import { authenticateGoogle } from '../../Actions';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

hello.init({
    google: GOOGLE_CLIENT_ID
}, {
    redirect_uri: '/',
    scope: 'basic, email'
});

var socialToken;
var serverToken;

hello.on('auth.login', function (auth) {
    // Save the social token
    socialToken = auth.authResponse.access_token;

    // Auth with our own server using the social token
    authenticateGoogle('google', socialToken);
});

export default () => <button onClick={() => hello('google').login()}>Google</button>;
