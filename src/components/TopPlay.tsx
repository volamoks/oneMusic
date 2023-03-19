import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../redux/hooks/redux';

import { useGetPlaylistQuery } from '../redux/services/spotifyApi';

import TopArtistsSlider from './TopArtistSlider/TopArtistsSlider';
import SongsLongCard from './SongsLongCard';
import PlayPause from './MusicPlayer/PlayPause';
import Loader from './Helpers/Loader';

const TopPlay = () => {
    const divRef = useRef<HTMLDivElement | null>(null);

    const [numTracks, setNumTracks] = useState(5);

    useEffect(() => {
        (divRef?.current as HTMLDivElement)?.scrollIntoView({
            behavior: 'smooth',
        });
    }, []);

    const { playlistId, activeSong } = useAppSelector(state => state.player);

    const {
        data: playListData,
        isLoading,
        isError,
    } = useGetPlaylistQuery(playlistId);

    const increaseTracks = () => {
        setNumTracks(numTracks + 5);
    };

    const topPlays = playListData?.tracks?.items.map(item => item.track);

    if (!playlistId) {
        return;
    }

    isLoading && <Loader text={'Loading'} />;
    isError && <Loader text={'error'} />;

    return (
        <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 mt-2 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
            <div className="w-full flex flex-col xl:mt-14 mt-4">
                <TopArtistsSlider playListData={playListData} />
                <div className="flex flex-row justify-between items-center mt-8">
                    <h2
                        ref={divRef}
                        className="text-white font-bold text-2xl"
                    >
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
                            key={track.id + 'topPlays'}
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
                        <button onClick={increaseTracks}>Load more...</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopPlay;
