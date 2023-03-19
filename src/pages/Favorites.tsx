import React, { useState, useEffect } from 'react';
import Loader from '../components/Helpers/Loader';
import SongCard from '../components/SongCard';
import { useAppSelector } from '../redux/hooks/redux';
import { useGetTracksQuery } from '../redux/services/spotifyApi';

const Favorites = () => {
    const { favorites } = useAppSelector(state => state.player);

    const favSong =
        favorites?.length === 1 ? favorites.join() : favorites?.join(',');

    const { data, isError, isLoading } = useGetTracksQuery(favSong);

    console.log(isError);

    if (isLoading) return <Loader text={'loading'} />;

    if (!data) {
        return (
            <div className="text-white text-2xl text-center">
                No Favorite song yet
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-center items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left self-center">
                    Featured Playlists
                </h2>
            </div>
            <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
                {data?.tracks.map((track, i) => (
                    <SongCard
                        key={track.id}
                        i={i}
                        data={data.tracks}
                        track={track}
                        subtitle={track?.name}
                        title={track.artists[0]?.name}
                        imgUrl={track.album.images[0]?.url}
                        id={track.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
