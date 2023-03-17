import React, { useEffect, useId, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import PlayPause from './PlayPause';
import { nanoid } from '@reduxjs/toolkit';

import {
    useGetAlbumQuery,
    useGetPlaylistQuery,
    useGetTracksQuery,
} from '../redux/services/spotifyApi';

// import RelatedSongs from './RelatedSongs';
import TopArtistsSlider from './TopArtistsSlider';
import SongsLongCard from './SongsLongCard';

const TopPlay = () => {
    const divRef = useRef(null);

    const [numTracks, setNumTracks] = useState(5);
    const links = useParams();
    // console.log(links);

    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const { playlistId, activeSong } = useSelector(state => state.player);

    const { data: playListData } = useGetPlaylistQuery(playlistId);

    const increaseTracks = () => {
        setNumTracks(numTracks + 5);
    };

    const topPlays = playListData?.tracks?.items.map(item => item.track);

    // console.log(topPlays);

    if (playlistId) {
        return (
            <div
                ref={divRef}
                className="xl:ml-6 ml-0 xl:mb-0 mb-6 mt-12 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
            >
                <div className="w-full flex flex-col mt-14">
                    <TopArtistsSlider playListData={playListData} />
                    <div className="flex flex-row justify-between items-center mt-8">
                        <h2 className="text-white font-bold text-2xl">
                            Top Songs
                        </h2>
                        {/* <Link to="/top-charts">
                            <p className="text-gray-300 text-base cursor-pointer">
                                See more
                            </p>
                        </Link> */}
                    </div>

                    <div className="mt-4 flex flex-col gap-1 mb-32">
                        {topPlays?.slice(0, numTracks).map((track, i) => (
                            <div
                                key={nanoid()}
                                className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
                                    activeSong?.id === track?.id
                                        ? 'bg-[#4c426e]'
                                        : 'bg-transparent'
                                } py-2 p-4 rounded-lg cursor-pointer mb-2`}
                            >
                                <h3 className="font-bold text-base text-white mr-3">
                                    {i + 1}.
                                </h3>
                                <SongsLongCard
                                    imgUrl={track?.album?.images[0]?.url}
                                    title={track?.artists[0]?.name}
                                    subtitile={track?.name}
                                    i={i}
                                    id={track?.id}
                                />
                                <PlayPause
                                    track={track}
                                    data={topPlays}
                                    i={i}
                                />
                            </div>
                        ))}
                        <div className="text-gray-300 text-base cursor-pointer flex justify-center">
                            <button onClick={increaseTracks}>
                                Load more...
                            </button>
                        </div>
                    </div>
                </div>

                {/* <RelatedSongs /> */}
            </div>
        );
    }
};

export default TopPlay;
