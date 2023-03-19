import React, { FC, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useGetFeaturedPlaylistsQuery } from '../redux/services/spotifyApi';

import { useActions } from '../redux/hooks/useActions';
import Loader from '../components/Helpers/Loader';

const FeaturedPlaylists: FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const { data, isLoading } = useGetFeaturedPlaylistsQuery('');
    const { setPlaylist } = useActions();

    const navigate = useNavigate();

    const setFeatPlaylist = (id: string) => {
        setPlaylist(id);
        navigate(`/discover/${id}`);
        localStorage.setItem('playlist', id);
    };

    return (
        <>
            {isLoading && <Loader text={'loading...'} />}
            <div className="flex flex-col">
                <div className="w-full flex justify-center items-center sm:flex-row flex-col mt-4 mb-10">
                    <h2 className="font-bold text-3xl text-white text-left self-center">
                        Featured Playlists
                    </h2>
                </div>
                <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
                    {data?.playlists?.items.map((playlist, i) => (
                        <div
                            ref={divRef}
                            key={playlist.id}
                            onClick={() => setFeatPlaylist(playlist.id)}
                            className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
                        >
                            <div className="realtive w-full h-56 group">
                                <div
                                    className={
                                        'absolute inset-0 justify-center items-center group-hover:bg-black/70'
                                    }
                                ></div>
                                <img
                                    src={playlist?.images[0].url}
                                    alt="song_img"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold text-lg text-white truncate">
                                    {playlist?.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FeaturedPlaylists;
