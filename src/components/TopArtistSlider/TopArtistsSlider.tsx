import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import SwiperComponent from './SwiperComponent';

import { IPlaylist } from '../../types/spotify/playlistsTypes';

import 'swiper/css/free-mode';
import 'swiper/css';

interface IPlaylistdata {
    playListData: IPlaylist | undefined;
}

const TopArtistsSlider: FC<IPlaylistdata> = ({ playListData }) => {
    return (
        <div className="w-full flex flex-col xl:mt-8 mt-2">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-white font-bold text-2xl mb-2">
                    Top Artists
                </h2>
                <Link to="/top-artists">
                    <p className="text-gray-300 text-base cursor-pointer">
                        See more
                    </p>
                </Link>
            </div>

            <SwiperComponent playListData={playListData} />
        </div>
    );
};

export default TopArtistsSlider;
