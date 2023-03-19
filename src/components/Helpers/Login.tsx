import React, { FC } from 'react';

const CLIENT_ID = '7d728f699502436a87df8a7630fd4fdf';
const REDIRECT_URI = 'https://onemusic.netlify.app/callback';
const SCOPES = 'user-read-private user-read-email';

const handleLogin = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;

    (window as any).location = url;
};

const Login: FC = () => {
    return (
        <>
            <button
                onClick={handleLogin}
                className="text-white text-base rounded-lg bg-green-600 py-2 m-4 "
            >
                Login with Spotify
            </button>
        </>
    );
};

export default Login;
