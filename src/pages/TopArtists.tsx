import React, { FC, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks/redux';
import {
    useGetSeveralArtistsQuery,
    useGetPlaylistQuery,
} from '../redux/services/spotifyApi';

import SongCard from '../components/SongCard';

import 'swiper/css';
import 'swiper/css/free-mode';
import Loader from '../components/Helpers/Loader';

const TopArtists: FC = () => {
    const { playlistId } = useAppSelector(state => state.player);
    const divRef = useRef<HTMLDivElement | null>(null);
    const {
        data: playListData,
        isLoading,
        isError,
    } = useGetPlaylistQuery(playlistId);

    const artistsListArr = playListData?.tracks?.items?.map(
        item => item?.track?.artists[0].id,
    );

    const artistsList = artistsListArr?.slice(0, 30).join(',');

    const { data } = useGetSeveralArtistsQuery(artistsList);

    if (!data) {
        return <div />;
    }
    return (
        <>
            {isLoading && <Loader text={'loading...'} />}
            <div className="flex flex-col">
                <div
                    ref={divRef}
                    className="w-full flex flex-row justify-center items-center sm:flex-row mt-4 mb-10"
                >
                    <h2 className="text-white font-bold text-2xl xl:mb-8">
                        Top Artists
                    </h2>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8 ]">
                    {data?.artists?.map((artist, i) => (
                        <div
                            key={artist.id + 'topArtist'}
                            className="shadow-lg rounded-md animate-slideright "
                        >
                            <Link to={`/artists/${artist?.id}`}>
                                <SongCard
                                    imgUrl={artist?.images[1].url}
                                    title={artist?.name}
                                    isAlbum={true}
                                    id={artist?.id}
                                    isHeart={false}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TopArtists;
