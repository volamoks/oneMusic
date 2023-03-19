import React, { FC, useEffect } from 'react';
import SongCard from '../components/SongCard';

import { useGetPlaylistQuery } from '../redux/services/spotifyApi';

import { useAppSelector } from '../redux/hooks/redux';
import Loader from '../components/Helpers/Loader';

const Discover: FC = () => {
    const { playlistId } = useAppSelector(state => state.player);

    const isLocalStorage = localStorage.getItem('playlist');
    const selectedPlaylist = isLocalStorage ? isLocalStorage : playlistId;
    const { data, isLoading, isError } = useGetPlaylistQuery(selectedPlaylist);

    const dataforDataProps = {
        tracks: data?.tracks?.items?.map(item => item.track),
    };

    console.log(dataforDataProps);

    if (isLoading) return <Loader text={'loading'} />;

    if (!data) {
        return <div />;
    }

    return (
        <>
            {isLoading && <Loader text={'loading...'} />};
            <div className="flex flex-col">
                <div className="w-full flex justify-center items-center sm:flex-row flex-col mt-4 mb-10">
                    <h2 className="font-bold text-3xl text-white text-left">
                        Discover "{data.name}" Playlist
                    </h2>
                    {/* <select className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                    {genres.map(genre => (
                        <option
                            key={genre.value}
                            value={genre.value}
                        >
                            {genre.title}
                        </option>
                    ))}
                </select> */}
                </div>
                <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
                    {data?.tracks?.items?.slice(0, 24).map((track, i) => (
                        <div key={track.track.id + 'discover'}>
                            <SongCard
                                id={track.track.id}
                                track={track.track}
                                i={i}
                                data={dataforDataProps.tracks}
                                imgUrl={track.track.album.images[0]?.url}
                                title={track.track.artists[0]?.name}
                                pageLink={`/artists/${track.track.artists[0]?.id}`}
                                subtitle={track.track.name}
                                isAlbum={false}
                                date={track?.track.album?.release_date.slice(
                                    0,
                                    4,
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Discover;
