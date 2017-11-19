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

var socialToken;
var serverToken;

hello.on('auth.login', function (auth) {
    // Save the social token
    socialToken = auth.authResponse.access_token;

    // Auth with our own server using the social token
    authenticate(auth.network, socialToken).then(function (token) {
        serverToken = token;
    });
});

function authenticate(network, socialToken) {
    return new Promise(function (resolve, reject) {
        request
            .post('/api/auth')
            .send({
                network: network,
                socialToken: socialToken
            })
            .set('Accept', 'application/json')
            .end(function(err, res){
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
}

export default () => <button onClick={() => hello('google').login()}>Google</button>;
