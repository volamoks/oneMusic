import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

import { useGetAlbumsQuery } from '../redux/services/spotifyApi';

import SongCard from '../components/SongCard';
import Loader from '../components/Helpers/Loader';

const AlbumDetails = () => {
    const id = useParams();
    const { data, isError, isLoading } = useGetAlbumsQuery(
        id?.albumid as string,
    );

    if (!data) {
        return <div />;
    }

    return (
        <>
            {isLoading && <Loader text={'loading...'} />};
            <h2 className="font-bold text-4xl text-white text-left m-6 uppercase">
                {data.albums[0].name}
            </h2>
            <h2 className="font-bold text-2xl text-white text-left  m-6">
                by {data.albums[0].artists[0].name}
            </h2>
            <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
                {data.albums[0].tracks.items.map((track, i: number) => (
                    <div key={track.id}>
                        <SongCard
                            track={track}
                            id={track?.id}
                            i={i}
                            data={data.albums[0].tracks.items}
                            imgUrl={data.albums[0].images[0].url}
                            title={track?.name}
                            subtitle={track?.name}
                            isAlbum={false}
                            titleid={track?.artists[0]?.id}
                            date={data.albums[0].release_date.slice(0, 4)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default AlbumDetails;
