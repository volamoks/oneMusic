import { Link } from 'react-router-dom';
import { I_activeSong, I_artists, I_track } from './types/types';
import React from 'react';

interface I_DetailsHeader {
    artistId: string;
    artistData: I_artists;
    songData: I_activeSong;
}

const DetailsHeader = ({
    artistId,
    artistData,
    songData,
}: I_DetailsHeader): React.ReactNode => {
    const artist = artistData?.artists[artistId].attributes;

    console.log(artistId, artistData, songData);

    return (
        <div className="relative w-full flex flex-col">
            <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
                <div className="absolute inset-0 flex items-center">
                    <img
                        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
                        src={
                            artistId
                                ? artist?.artwork?.url
                                      .replace('{w}', '500')
                                      .replace('{h}', '500')
                                : songData?.images?.coverart
                        }
                        alt="artist"
                    />
                    <div className="ml-5">
                        <p className="text-white text-xl sm:text-3xl font-bold">
                            {artistId ? artist.name : songData?.title}
                        </p>
                        {!artistId && (
                            <Link
                                to={`/artists/${songData?.artists[0].adamid}`}
                            >
                                <p className="text-gray-400 sm:text-2xl text-base mt-2">
                                    {songData?.subtitle}
                                </p>
                            </Link>
                        )}
                        <p className="text-gray-400 sm:text-lg text-small mt-2">
                            {artistId
                                ? artist.genreNames[0]
                                : songData?.genres?.primary}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsHeader;
