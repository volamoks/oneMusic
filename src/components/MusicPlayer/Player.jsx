/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Player = ({
    volume,
    seekTime,
    onEnded,
    onTimeUpdate,
    onLoadedData,
    repeat,
}) => {
    const { isPlaying, activeSong } = useSelector(state => state.player);

    const ref = useRef(null);
    // eslint-disable-next-line no-unused-expressions
    if (ref.current) {
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }

    useEffect(() => {
        ref.current.volume = volume;
    }, [volume]);
    // updates audio element only on seekTime change (and not on each rerender):
    useEffect(() => {
        ref.current.currentTime = seekTime;
    }, [seekTime]);

    return (
        <audio
            src={activeSong?.preview_url}
            ref={ref}
            loop={repeat}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
        />
    );
};

export default Player;
