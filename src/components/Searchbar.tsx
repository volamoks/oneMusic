import { useState, useEffect } from 'react';
import {
    setSearchQuery,
    setSearchData,
    setArtistsQuery,
    setActiveSong,
    playPause,
} from '../redux/features/playerSlice';
import { useNavigate } from 'react-router-dom';

import { useGetSearchForItemQuery } from '../redux/services/spotifyApi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useAppSelector } from '../redux/hooks/redux';

const SearchResults = ({ onClose }): React.ReactElement => {
    // const { searchQuery } = useSelector(state => state.player);
    const navigate = useNavigate();
    const { searchQuery } = useAppSelector(state => state.player);

    const dispatch = useDispatch();
    const { data, isSuccess } = useGetSearchForItemQuery(searchQuery.queryList);

    isSuccess && console.log(data);

    const editedData = data?.tracks?.items?.map(item => {
        track: {
            item;
        }
    });

    console.log(editedData);

    const goToPage = (id: string, url: string, song) => {
        // dispatch(setArtistsQuery(id));
        console.log(`${url}${id}`);
        navigate(`${url}${id}`);
        onClose();
    };

    return (
        <div className="ml-4 flex backdrop-blur-3xl rounded-b-sm min-h-[910px] min-w-[300px] flex-row">
            <ul>
                <div className="uppercase text-2xl font-bold m-4 mt-2  w-full  ml-4 block">
                    Tracks
                </div>
                {data?.tracks?.items?.slice(0, 3).map(result => (
                    <div
                        key={nanoid()}
                        onClick={() =>
                            goToPage(
                                result?.album?.id,
                                `/artists/${result.artists[0].id}/albums/`,
                                result,
                            )
                        }
                        className="min-w-[400px] hover:bg-black/30 cursor-pointer rounded-lg"
                    >
                        <li
                            className="w-full inline-block"
                            key={result.id}
                        >
                            <div className="flex flex-row gap-2 align-middle">
                                <img
                                    className="w-16 m-2"
                                    src={result.album?.images[2]?.url}
                                    alt={result.album?.name}
                                />
                                <div className="text-white text-2xl mr-8 flex self-center">
                                    <div className="text-white text-2xl mr-8 flex self-center">
                                        {result.artists[0].name} -
                                    </div>
                                    <div className="text-white text-2xl mr-8">
                                        {result.name}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
                <div className="uppercase text-2xl font-bold  m-4">Albums</div>
                {data?.albums?.items?.slice(0, 3).map(result => (
                    <div
                        key={nanoid()}
                        onClick={() =>
                            goToPage(
                                result?.id,
                                `/artists/${result.artists[0].id}/albums/`,
                            )
                        }
                        className="min-w-[400px] hover:bg-black/30 cursor-pointer rounded-lg"
                    >
                        <li key={result.id}>
                            <div className="flex flex-row gap-2 align-middle">
                                <img
                                    className="w-16 m-2"
                                    src={result?.images[2]?.url}
                                    alt={result?.name}
                                />
                                <div className="text-white text-2xl mr-8 flex self-center">
                                    {' '}
                                    <div className="text-white text-2xl mr-8">
                                        {result.name}
                                    </div>
                                    <div className="text-white text-2xl mr-8 flex self-center">
                                        by {result.artists[0].name}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
                <div className="uppercase text-2xl font-bold  m-4">Artists</div>
                {data?.artists?.items?.slice(0, 3).map(result => (
                    <div
                        key={nanoid()}
                        onClick={() => goToPage(result?.id, '/artists/')}
                        className="w-full min-w-[400px] hover:bg-black/30 cursor-pointer rounded-lg "
                    >
                        <li key={result.id}>
                            <div className="flex flex-row gap-2 align-middle">
                                <img
                                    className="w-16 h-16 m-2"
                                    src={result?.images[2]?.url}
                                    alt={result.album?.name}
                                />
                                <div className="text-white text-2xl mr-8 flex self-center">
                                    {result?.name}
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

// Modal component
const SearchModal = ({ children, isOpen, onClose }) => {
    return isOpen ? (
        <div className="modal-content absolute z-10  left-[317px]  w-[750px]">
            <button
                className="modal-close absolute right-6 top-4 z-20"
                onClick={onClose}
                onKeyDown={onClose}
            >
                Close
            </button>
            {children}
        </div>
    ) : null;
};

const Searchbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setShowModal(false);
        setValue('');
    };

    let inputTimeOut;
    useEffect(() => {
        dispatch(setSearchQuery(searchValue));
    }, [value]);

    const setSearch = e => {
        console.log(e);
        setValue(e);
        clearTimeout(inputTimeOut);
        inputTimeOut = setTimeout(() => {
            setSearchValue(value);
        }, 500);

        setShowModal(true);
    };

    return (
        <div className="text-white text-xl bg-transparent mt-5 w-3/4">
            <input
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent border rounded-md hover:border border-transparent hover:border-white p-2 w-3/5 ml-24"
                value={value}
                type="text"
                placeholder="Search"
            />
            <SearchModal
                isOpen={showModal}
                onClose={handleCloseModal}
            >
                <SearchResults onClose={handleCloseModal} />
            </SearchModal>
        </div>
    );
};

export default Searchbar;
