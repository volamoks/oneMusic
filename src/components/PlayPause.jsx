import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice_';
import { useAppSelector } from '../redux/hooks/redux';
import { useAppDispatch } from './../redux/hooks/redux';

const PlayPause = ({ track, data, i }) => {
    const dispatch = useDispatch();

    const { isPlaying, activeSong } = useAppSelector(state => state.player);

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };
    const handlePlayClick = () => {
        dispatch(setActiveSong({ track, data, i }));
        dispatch(playPause(true));
    };

    // console.log(track);

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
