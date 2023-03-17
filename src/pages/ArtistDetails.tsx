import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import TopChartCard from '../components/TopChartCard';
import { useGetArtistDataQuery } from '../redux/services/spotifyApi';
import { setAlbum } from '../redux/features/playerSlice_';

import SongsLongCard from '../components/SongsLongCard';
import SongCard from '../components/SongCard';
import { useAppDispatch } from '../redux/hooks/redux';
import { I_albumResponse } from '../components/types/types';

const ArtistDetails = (): React.ReactNode | null => {
    const artistUrl = useParams();

    const LINKS = {
        album: '/albums',
        topTracks: '/top-tracks',
        relatedArtists: '/related-artists',
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    interface I_album_response {
        data: I_albumResponse;
    }
    const { data: albumsData }: I_album_response =
        useGetArtistDataQuery<I_album_response>(artistUrl.id + LINKS.album);

    const setAlbums = (id: string) => {
        navigate(`/artists/${artistUrl.id}/albums/${id}`);
        dispatch(setAlbum(id));
    };

    console.log(albumsData);
    if (albumsData)
        return (
            <>
                <h2 className="font-bold text-3xl text-white text-left mb-8">
                    Albums by
                    {albumsData && albumsData?.items[0].artists[0].name}
                </h2>
                <div className="flex flex-col">
                    <div className="flex flex-wrap  sm:justify-start justify-center gap-8">
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
