import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';
import { I_tracks } from './types/types';
import { useAppSelector } from '../redux/hooks/redux';
import React from 'react';

interface I_SongCard {
    id: string;
    track?: I_tracks;
    i: number;
    data?: I_tracks[];
    imgUrl: string;
    title?: string;
    subtitle?: string;
    titleid?: string;
    isAlbum: boolean;
    date?: string;
    pageLink?: string;
    onClick?: any;
}

const SongCard = ({
    id,
    track,
    i,
    data,
    imgUrl,
    title,
    pageLink,
    titleid,
    isAlbum = false,
    subtitle,
    date,
}: I_SongCard): React.ReactElement => {
    const { activeSong } = useAppSelector(state => state.player);

    const navigate = useNavigate();

    const linkToPage = (id: string | undefined) => {
        navigate(`${id}`);
    };

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="realtive w-full h-56 group">
                <div
                    className={`absolute inset-0 justify-center items-center bg-black bg-opacity-30 group-hover:flex ${
                        activeSong?.id === track?.id
                            ? 'flex bg-black bg-opacity-80'
                            : 'hidden'
                    }`}
                >
                    {!isAlbum ? (
                        <PlayPause
                            track={track}
                            data={data}
                            i={i}
                        />
                    ) : null}
                </div>
                <img
                    className=""
                    src={imgUrl}
                    alt="song_img"
                />
            </div>
            <div
                onClick={() => linkToPage(pageLink)}
                className="flex flex-col"
            >
                <p className="font-semibold text-2xl text-white truncate">
                    {title}
                </p>
                <p className="font-semibold text-lg text-white truncate">
                    {subtitle}
                </p>

                <p className="font-sm  text-gray-300 truncate mt-1">
                    <Link to={titleid ? `/artist/${titleid}` : 'top/atrist'}>
                        {date}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SongCard;
