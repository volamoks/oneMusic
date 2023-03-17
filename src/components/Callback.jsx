import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import React from 'react';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;

        if (url.includes('#access_token')) {
            const links = new URLSearchParams(
                window.location.hash.substring(1),
            );

            const access_token = links.get('access_token');

            localStorage.setItem('access_token', access_token);

            navigate('/featured-playlists');
        }
    }, [navigate]);

    return <div className="text-white text-3xl mx-auto mt-120">Loggen in</div>;
};

export default Callback;
