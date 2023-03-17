import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CLIENT_ID = '7d728f699502436a87df8a7630fd4fdf';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = 'user-read-private user-read-email';

export const handleLogin = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
    window.location = url;
};
