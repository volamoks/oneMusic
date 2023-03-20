import React, { FC } from 'react';

const { VITE_CLIENT_ID, VITE_REDIRECT_URI, VITE_SCOPES } = import.meta.env;

console.log(VITE_CLIENT_ID, VITE_REDIRECT_URI, VITE_SCOPES);

const handleLogin = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${VITE_CLIENT_ID}&response_type=token&redirect_uri=${VITE_REDIRECT_URI}&scope=${VITE_SCOPES}`;
    console.log(url);

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
