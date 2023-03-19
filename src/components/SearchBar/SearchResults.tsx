import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks/redux';

import { useGetSearchForItemQuery } from '../../redux/services/spotifyApi';

import SearchresultComponent from './SearchresultComponent';
import Loader from '../Helpers/Loader';

interface SearchResultsProps {
    onClose: () => void;
}

const SearchResults: FC<SearchResultsProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const { searchQuery } = useAppSelector(state => state.player);

    const { data, isLoading, isError } = useGetSearchForItemQuery(
        searchQuery.queryList,
    );

    const goToPage = (id: string, url: string) => {
        navigate(`${url}${id}`);
        onClose();
    };

    isError && <Loader text={'error'} />;

    return (
        <>
            {' '}
            {isLoading && <Loader text={'Loading'} />}
            <div className="ml-4 flex backdrop-blur-3xl rounded-b-sm min-h-[910px] min-w-[300px] flex-row">
                <ul>
                    <div className="uppercase text-2xl font-bold m-4 mt-2  w-full  ml-4 block">
                        Tracks
                    </div>
                    {data?.tracks?.items?.slice(0, 3).map(result => (
                        <SearchresultComponent
                            key={result.id}
                            goToPage={goToPage}
                            resultId={
                                (result?.id,
                                `/artists/${result.artists[0].id}/albums/`)
                            }
                            link={result.id}
                            imgUrl={result.album?.images[2]?.url}
                            name={result?.name}
                            artistName={result.artists[0].name}
                            isTrack={true}
                        />
                    ))}
                    <div className="uppercase text-2xl font-bold  m-4">
                        Albums
                    </div>
                    {data?.albums?.items?.slice(0, 3).map(result => (
                        <SearchresultComponent
                            key={result.id}
                            goToPage={goToPage}
                            resultId={
                                (result?.id,
                                `/artists/${result.artists[0].id}/albums/`)
                            }
                            link={result.id}
                            imgUrl={result?.images[2]?.url}
                            name={result?.name}
                            artistName={result.artists[0].name}
                        />
                    ))}
                    <div className="uppercase text-2xl font-bold  m-4">
                        Artists
                    </div>
                    {data?.artists?.items?.slice(0, 3).map(result => (
                        <SearchresultComponent
                            key={result.id}
                            goToPage={goToPage}
                            resultId={(result?.id, '/artists/')}
                            link={result.id}
                            imgUrl={result?.images[2]?.url}
                            name={result?.name}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SearchResults;
