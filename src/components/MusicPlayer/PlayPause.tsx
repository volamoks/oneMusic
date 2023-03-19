import React, { FC } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { useAppSelector } from '../../redux/hooks/redux';

import { useActions } from '../../redux/hooks/useActions';

import { commonIitems } from '../../types/spotify/commonTypes';
import { commonIitem } from '../../types/spotify/commonTypes';

interface I_response {
    track: commonIitem;
    data: commonIitems;
    i: number | undefined;
}
const PlayPause: FC<I_response> = ({ track, data, i = 0 }) => {
    const { isPlaying, activeSong } = useAppSelector(state => state.player);

    const { setActiveSong, playPause } = useActions();

    const handlePauseClick = () => {
        playPause(false);
    };

    let handlePlayClick;

    if (track && data) {
        handlePlayClick = () => {
            setActiveSong({ track, data, i });
            playPause(true);
        };
    }

    return isPlaying && activeSong?.id === track?.id ? (
        <FaPauseCircle
            size={35}
            className="text-gray-300"
            onClick={handlePauseClick}
        />
    ) : (
        <FaPlayCircle
            size={35}
            className="text-gray-300"
            onClick={handlePlayClick}
        />
    );
};

export default PlayPause;
