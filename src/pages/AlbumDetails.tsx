import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SongCard } from '../components';

import {
    I_activeSong,
    I_artist_response,
    I_tracks,
} from './../components/types/types';

import {
    useGetAlbumQuery,
    useGetTracksQuery,
} from '../redux/services/spotifyApi';

const AlbumDetails = () => {
    const id = useParams();
    console.log(id);

    interface I_albumQuery {
        data: I_artist_response;
        isSuccess: boolean;
    }

    const { data, isSuccess }: I_albumQuery = useGetAlbumQuery<I_albumQuery>(
        id?.albumid,
    );

    isSuccess && console.log(data);

    const tracksData: { tracks: I_tracks[] } = {
        tracks: data?.tracks?.items?.map(track => ({
            ...track,
            album: { images: data?.images },
        })),
    };

    console.log(tracksData);

    if (tracksData?.tracks?.length)
        return (
            <>
                <h2 className="font-bold text-4xl text-white text-left m-6 uppercase">
                    {tracksData?.tracks[0]?.name}
                </h2>
                <h2 className="font-bold text-2xl text-white text-left  m-6">
                    by {tracksData?.tracks[0]?.artists[0]?.name}
                </h2>
                <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
                    {tracksData?.tracks?.map((track, i: number) => (
                        <div key={nanoid()}>
                            <SongCard
                                track={track}
                                id={track?.id}
                                i={i}
                                data={tracksData?.tracks}
                                imgUrl={data?.images[1].url}
                                title={track?.name}
                                subtitle={track?.name}
                                isAlbum={false}
                                titleid={track?.artists[0]?.id}
                            />
                        </div>
                    ))}
                </div>
            </>
        );
};

export default AlbumDetails;
