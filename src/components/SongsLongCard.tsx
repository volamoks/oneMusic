import React, { FC } from 'react';

import { Link } from 'react-router-dom';

interface ISongLogcard {
    imgUrl: string;
    title: string;
    subtitile: string;
    id: string;
    i: number;
}
const SongsLongCard: FC<ISongLogcard> = ({
    imgUrl,
    title,
    subtitile,
    id,
    i,
}) => {
    console.log('SongsLongCard');
    return (
        <div className="flex-1 flex flex-row justify-between items-center ">
            <img
                className="w-20 h-20 rounded-lg"
                src={imgUrl}
                alt={subtitile}
            />
            <div className="flex-1 flex flex-col justify-center mx-3">
                <Link to={`/songs/${title}`}>
                    <p className="text-xl font-bold text-white">{title}</p>
                </Link>
                <Link to={`/artists/${id}`}>
                    <p className="text-base text-gray-300 mt-1">{subtitile}</p>
                </Link>
            </div>
        </div>
    );
};

export default SongsLongCard;
