import { useDispatch, useSelector } from 'react-redux';
import { SongCard } from '../components';

import { TopPlay } from '../components';

const TopCharts = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector(state => state.player);

    return (
        <>
            <TopPlay />
        </>
    );
};

export default TopCharts;
