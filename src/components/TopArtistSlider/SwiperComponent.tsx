import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FreeMode } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useActions } from '../../redux/hooks/useActions';
import { useGetSeveralArtistsQuery } from '../../redux/services/spotifyApi';
import { IPlaylist } from '../../types/spotify/playlistsTypes';
import Loader from '../Helpers/Loader';

interface IPlaylistdata {
    playListData: IPlaylist | undefined;
}
const SwiperComponent: FC<IPlaylistdata> = ({ playListData }) => {
    const artistsList = playListData?.tracks?.items
        ?.map(item => item?.track?.artists[0]?.id)
        .slice(0, 10)
        .join(',');

    const { setDiscover } = useActions();

    const { data, isLoading, isError } = useGetSeveralArtistsQuery(artistsList);

    const setDiscoverPage = () => {
        setDiscover();
        // setArtistsQuery(data);
    };

    isLoading && <Loader text={'Loading'} />;
    isError && <Loader text={'error'} />;

    if (!data) {
        return <div />;
    }
    return (
        <>
            <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                freeMode
                centeredSlides
                centeredSlidesBounds
                modules={[FreeMode]}
                className="mt-4"
            >
                {data?.artists.map(artist => (
                    <div key={artist.id}>
                        <SwiperSlide
                            key={artist.id + 'swiper'}
                            style={{
                                width: '25%',
                                height: '125px',
                                // objectFit: 'cover',
                            }}
                            className="shadow-lg rounded-md animate-slideright "
                        >
                            <Link to={`/artists/${artist.id}`}>
                                <img
                                    onClick={setDiscoverPage}
                                    src={artist.images[2].url}
                                    alt="Name"
                                    className="rounded-lg w-full object-cover"
                                />
                            </Link>
                        </SwiperSlide>
                        //{' '}
                    </div>
                ))}
            </Swiper>
        </>
    );
};

export default SwiperComponent;
