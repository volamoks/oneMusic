import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';

const TopChartCard = ({ track, i, data, imgUrl, title, subtitile, id }) => {
    const { activeSong } = useSelector(state => state.player);

    return (
        <div
            className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
                activeSong?.track?.id === track?.track?.id
                    ? 'bg-[#4c426e]'
                    : 'bg-transparent'
            } py-2 p-4 rounded-lg cursor-pointer mb-2`}
        >
            <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
            <SongsLongCard
                key={track.id}
                imgUrl={track.track.album.images[0].url}
                title={track?.track.artists[0].name}
                subtitile={track?.track.name}
                i={i}
                id={track.id}
            />
            <PlayPause
                key={track.id}
                track={track}
                data={playListData}
            />
        </div>
    );
};

export default TopChartCard;
