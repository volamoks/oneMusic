import React, { useState, useEffect } from 'react';

import { useActions } from '../../redux/hooks/useActions';

import SearchModal from './SearchModal';
import SearchResults from './SearchResults';

const Searchbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const { setSearchQuery } = useActions();

    const handleCloseModal = () => {
        setShowModal(false);
        setValue('');
    };

    let inputTimeOut: number;
    useEffect(() => {
        setSearchQuery(searchValue);
    }, [value]);

    const handeleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        clearTimeout(inputTimeOut);
        inputTimeOut = setTimeout(() => {
            setSearchValue(value);
        }, 500);

        setShowModal(true);
    };

    return (
        <div className="text-white text-xl bg-transparent mt-5 w-3/4">
            <input
                onChange={handeleSearch}
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
