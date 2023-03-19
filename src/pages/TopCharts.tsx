import React, { FC } from 'react';
import { useGetPlaylistQuery } from '../redux/services/spotifyApi';
import SongCard from '../components/SongCard';
import { IPlaylist } from '../types/spotify/playlistsTypes';
import Loader from '../components/Helpers/Loader';

const TopCharts: FC<IPlaylist> = () => {
    const Top50Playlist = '37i9dQZEVXbMDoHDwVN2tF';
    const { data, isLoading, isError } = useGetPlaylistQuery(Top50Playlist);

    const dataforDataProps = {
        tracks: data?.tracks?.items?.map(item => item.track),
    };

    return (
        <>
            {isLoading && <Loader text={'loading...'} />}
            <div className="flex flex-col">
                <div className="w-full flex flex-row justify-center items-center sm:flex-row mt-4 mb-10">
                    <h2 className="text-white font-bold text-2xl mb-8">
                        GLobal Top 50 Songs
                    </h2>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8 ]">
                    {data?.tracks.items.map((item, i) => (
                        <div>
                            <SongCard
                                id={item.track.id}
                                track={item.track}
                                isAlbum={false}
                                title={item.track.name}
                                imgUrl={item.track.album.images[1].url}
                                i={i}
                                data={dataforDataProps.tracks}
                                subtitle={item.track.name}
                            />
                        </div>
                    ))}
                    {/* <TopArtists /> */}
                </div>
            </div>
        </>
    );
};

export default TopCharts;
