import React, { useId } from 'react';
import { useGetSeveralArtistsQuery } from '../redux/services/spotifyApi';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { setArtistsQuery, setDiscover } from '../redux/features/playerSlice';

import 'swiper/css';
import 'swiper/css/free-mode';
import { nanoid } from '@reduxjs/toolkit';

const TopArtistsSlider = ({ playListData }) => {
    const artistsListArr = playListData?.tracks?.items?.map(
        item => item.track.artists[0].id,
    );
    const artistsList = artistsListArr?.slice(0, 10).join(',');

    const dispatch = useDispatch();

    const setDiscoverPage = () => {
        dispatch(setDiscover);
        dispatch(setArtistsQuery(data));
    };

    // let link = artistsList ? artistsList : '';

    const { data } = useGetSeveralArtistsQuery(artistsList);

    return (
        <div className="w-full flex flex-col mt-8">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-white font-bold text-2xl mb-2">
                    Top Artists
                </h2>
                <Link to="/top-artists">
                    <p className="text-gray-300 text-base cursor-pointer">
                        See more
                    </p>
                </Link>
            </div>

            <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                freeMode
                centeredSlides
                centeredSlidesBounds
                modules={[FreeMode]}
                className="mt-4"
            >
                {data?.artists?.map(artist => (
                    <SwiperSlide
                        key={nanoid()}
                        style={{
                            width: '25%',
                            height: '125px',
                            // objectFit: 'cover',
                        }}
                        className="shadow-lg rounded-md animate-slideright "
                    >
                        <Link to={`/artists/${artist?.id}`}>
                            <img
                                onClick={setDiscoverPage}
                                src={artist?.images[0].url}
                                alt="Name"
                                className="rounded-lg w-full object-cover"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopArtistsSlider;
