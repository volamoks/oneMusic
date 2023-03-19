import React, { FC } from 'react';

interface IsearchModal {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: FC<IsearchModal> = ({ children, isOpen, onClose }) => {
    return isOpen ? (
        <div className="modal-content absolute z-10  xl:left-[317px]  xl:w-[750px]">
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

export default SearchModal;
