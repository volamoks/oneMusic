import { Link, useNavigate } from 'react-router-dom';

import PlayPause from './MusicPlayer/PlayPause';

import { useAppSelector } from '../redux/hooks/redux';
import React, { FC } from 'react';

import { commonIitems } from '../types/spotify/commonTypes';
import { commonIitem } from '../types/spotify/commonTypes';

import { AiOutlineHeart } from 'react-icons/ai';
import { useActions } from './../redux/hooks/useActions';

interface IsongCard {
    id: string;
    track?: commonIitem;
    i?: number | undefined;
    data?: commonIitems;
    imgUrl: string;
    title: string;
    pageLink?: string | undefined;
    titleid?: string;
    isAlbum?: boolean;
    subtitle?: string;
    date?: string;
    isHeart?: boolean;
}

const SongCard: FC<IsongCard> = ({
    track,
    i = 0,
    isHeart = true,
    data,
    imgUrl,
    title,
    pageLink,
    titleid,
    isAlbum = false,
    subtitle,
    date,
}) => {
    const { activeSong, favorites } = useAppSelector(state => state.player);
    const { setFavorites } = useActions();
    const navigate = useNavigate();

    const linkToPage = (id: string | undefined) => {
        navigate(`${id}`);
    };

    const handleAddFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        const trackId = e.currentTarget.value;
        setFavorites(trackId);
    };
    localStorage.setItem('favtracks', JSON.stringify(favorites));

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
                    {!isAlbum && track && data ? (
                        <PlayPause
                            track={track}
                            data={data}
                            i={i}
                        />
                    ) : null}
                </div>
                <img
                    className="object-cover"
                    src={imgUrl}
                    alt="song_img"
                />
            </div>
            <div className="flex flex-row justify-between  w-[216px]">
                <div
                    onClick={() => linkToPage(pageLink)}
                    className="flex flex-col w-5/6"
                >
                    <p className="font-semibold text-xl text-white truncate ">
                        {title}
                    </p>
                    <p className="font-semibold text-base text-white truncate">
                        {subtitle}
                    </p>

                    <p className="font-sm  text-gray-300 truncate mt-1">
                        <Link
                            to={titleid ? `/artist/${titleid}` : 'top/atrist'}
                        >
                            {date}
                        </Link>
                    </p>
                </div>
                {isHeart ? (
                    <div className="flex items-center w-1/6 z-10">
                        <button
                            value={track?.id}
                            onClick={handleAddFavorites}
                        >
                            <AiOutlineHeart
                                size={30}
                                color={
                                    track?.id && favorites?.includes(track?.id)
                                        ? 'red'
                                        : '#FFF'
                                }
                                className="cursor-pointer "
                            />
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SongCard;
