import React, { FC, useRef } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { useGetArtistAlbumsQuery } from '../redux/services/spotifyApi';
import { useActions } from './../redux/hooks/useActions';

import SongCard from '../components/SongCard';
import Loader from '../components/Helpers/Loader';

import { I_albumResponse } from '../components/types/types';

const ArtistDetails: FC = () => {
    const artistUrl = useParams();
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement | null>(null);
    // const { setAlbum } = useActions();

    const LINKS = {
        album: '/albums',
        topTracks: '/top-tracks',
        relatedArtists: '/related-artists',
    };

    const {
        data: albumsData,
        isLoading,
        isError,
    } = useGetArtistAlbumsQuery(artistUrl.id + LINKS.album);

    const setAlbums = (id: string) => {
        navigate(`/artists/${artistUrl.id}/albums/${id}`);
        // setAlbum(id);
    };

    if (isLoading) return <Loader text={'loading'} />;

    if (!albumsData) {
        return <div />;
    }

    return (
        <>
            {isLoading && <Loader text={'loading...'} />};
            <h2 className="font-bold text-3xl text-white text-left xl:mb-8 mb-2">
                Albums by {albumsData && albumsData?.items[0].artists[0].name}
            </h2>
            <div className="flex flex-col">
                <div
                    ref={divRef}
                    className="flex flex-wrap  sm:justify-start justify-center gap-8"
                >
                    {albumsData?.items?.map((album, i) => (
                        <div
                            onClick={() => setAlbums(album.id)}
                            key={album.id}
                        >
                            <SongCard
                                id={album.id}
                                i={i}
                                imgUrl={album.images[1].url}
                                title={album.name}
                                subtitle={''}
                                titleid={album?.artists[0].id}
                                isAlbum={true}
                                date={album.release_date.slice(0, 4)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ArtistDetails;
