import { nanoid } from '@reduxjs/toolkit';
import React, { FC } from 'react';

interface ISearchComponent {
    goToPage: (arg1: string, arg2: string) => void;
    imgUrl: string;
    artistName?: string;
    name: string;
    resultId: string;
    link: string;
    isTrack?: boolean;
}

const SearchresultComponent: FC<ISearchComponent> = ({
    goToPage,
    resultId,
    link,
    imgUrl,
    artistName,
    name,
    isTrack = false,
}) => {
    return (
        <div
            onClick={() => goToPage(link, resultId)}
            className="w-full min-w-[400px] hover:bg-black/30 cursor-pointer rounded-lg "
        >
            <li key={nanoid()}>
                <div className="flex flex-row gap-2 align-middle">
                    <img
                        className="w-16 h-16 m-2"
                        src={imgUrl}
                        alt={name}
                    />
                    <div className="text-white xl:text-xl mr-8 flex self-center">
                        {!artistName && (
                            <div className="text-white xl:text-2xl mr-8">
                                {name}
                            </div>
                        )}
                        {!isTrack && artistName && (
                            <div className="text-white xl:text-2xl mr-8">
                                {name} by {artistName}
                            </div>
                        )}

                        {isTrack && artistName && (
                            <div className="text-white xl:text-2xl mr-8">
                                {name} - {artistName}
                            </div>
                        )}
                    </div>
                </div>
            </li>
        </div>
    );
};

export default SearchresultComponent;
