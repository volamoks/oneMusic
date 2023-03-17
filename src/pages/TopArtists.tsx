import React from 'react';
import {
    useGetSeveralArtistsQuery,
    useGetPlaylistQuery,
} from '../redux/services/spotifyApi';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { setArtistsQuery, setDiscover } from '../redux/features/playerSlice';

import 'swiper/css';
import 'swiper/css/free-mode';
import { SongCard } from '../components';
import { useAppSelector } from '../redux/hooks/redux';
import { I_artist_response } from './../components/types/types';

const TopArtists = () => {
    const { playlistId } = useAppSelector(state => state.player);

    interface response {
        data: I_artist_response;
    }

    const { data: playListData } = useGetPlaylistQuery<response>(playlistId);

    const artistsListArr = playListData?.tracks?.items?.map(
        item => item.track.artists[0].id,
    );

    console.log(playListData);
    const artistsList = artistsListArr?.slice(0, 30).join(',');

    const { data } = useGetSeveralArtistsQuery(artistsList);

    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-row justify-center items-center sm:flex-row mt-4 mb-10">
                <h2 className="text-white font-bold text-2xl mb-8">
                    Top Artists
                </h2>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8 ]">
                {data?.artists?.map(artist => (
                    <div
                        key={artist?.id}
                        className="shadow-lg rounded-md animate-slideright "
                    >
                        <Link to={`/artists/${artist?.id}`}>
                            <SongCard
                                imgUrl={artist?.images[0].url}
                                title={artist?.name}
                                isAlbum={true}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopArtists;
