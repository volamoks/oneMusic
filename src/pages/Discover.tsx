import React from 'react';
import { SongCard } from '../components';

import { useGetPlaylistQuery } from '../redux/services/spotifyApi';
import { I_playlistResponse } from '../components/types/types';
import { useAppSelector } from '../redux/hooks/redux';

const Discover = (): React.ReactElement => {
    const { playlistId } = useAppSelector(state => state.player);

    interface response {
        data: I_playlistResponse;
    }
    const { data }: response = useGetPlaylistQuery<response>(playlistId);
    console.log(data);

    const arr = data?.tracks?.items?.map(item => item.track);

    const newarr = { tracks: arr };

    console.log(newarr);

    console.log('render');

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-center items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                    Discover
                </h2>
                <select className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                    {/* {genres.map(genre => (
                        <option
                            key={genre.value}
                            value={genre.value}
                        >
                            {genre.title}
                        </option>
                    ))} */}
                </select>
            </div>
            <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
                {newarr?.tracks?.slice(0, 24).map((track, i) => (
                    <div key={track?.id}>
                        <SongCard
                            id={track.id}
                            track={track}
                            i={i}
                            data={newarr?.tracks}
                            imgUrl={track?.album.images[0]?.url}
                            title={track?.artists[0]?.name}
                            pageLink={`/artists/${track?.artists[0]?.id}`}
                            subtitle={track?.name}
                            isAlbum={false}
                            date={track?.album?.release_date.slice(0, 4)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Discover;
