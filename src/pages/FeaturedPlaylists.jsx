import React from 'react';
import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SongCard } from '../components';
import { useGetFeaturedPlaylistsQuery } from '../redux/services/spotifyApi';
import { setPlaylist } from '../redux/features/playerSlice';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../components/Login';

const FeaturedPlaylists = () => {
    const { data } = useGetFeaturedPlaylistsQuery();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const setFeatPlaylist = (id, playlistName) => {
        dispatch(setPlaylist(id));
        navigate(`/discover/${playlistName.replaceAll(' ', '_')}`);
    };

    console.log(data);

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-center items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left self-center">
                    Featured Playlists
                </h2>
            </div>
            <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
                {data?.playlists?.items.map((playlist, i) => (
                    <div
                        key={playlist.id}
                        onClick={() =>
                            setFeatPlaylist(playlist.id, playlist.name)
                        }
                        className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
                    >
                        <div className="realtive w-full h-56 group">
                            <div
                            // className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
                            //     activeSong?.title === song.title
                            //         ? 'flex bg-black bg-opacity-70'
                            //         : 'hidden'
                            // }`}
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
                            {/* <p className="font-sm  text-gray-300 truncate mt-1">
                            <Link to={''}>{song.track.name}</Link>
                        </p> */}
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleLogin}
                className="text-white text-lg"
            >
                Login
                {/* <Link to={'/login'}>Login</Link> */}
            </button>
        </div>
    );
};

export default FeaturedPlaylists;
