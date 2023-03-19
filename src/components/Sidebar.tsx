import React, { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    HiOutlineHashtag,
    HiOutlineHome,
    HiOutlineMenu,
    HiOutlinePhotograph,
    HiOutlineUserGroup,
} from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import Login from './Helpers/Login';

const links = [
    {
        name: 'Featured Playlists',
        to: '/featured-playlists',
        icon: HiOutlineHome,
    },
    // { name: 'Discover', to: '/discover', icon: HiOutlineHome },
    { name: 'Favorite tracks', to: '/around-you', icon: HiOutlinePhotograph },
    { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
    { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];

interface IHandleClick {
    handleClick?: () => void;
}

const NavLinks: FC<IHandleClick> = ({ handleClick }) => (
    <div className="mt-10">
        {links.map(item => (
            <NavLink
                key={item.name}
                to={item.to}
                className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 uppercase"
                onClick={() => handleClick && handleClick()}
            >
                <item.icon className="w-6 h-6 mr-2" />
                {item.name}
            </NavLink>
        ))}
    </div>
);

const Sidebar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleGoto = (): void => {
        navigate('/featured-playlists');
    };

    return (
        <div className="flex flex-col bg-[#191624]">
            <div className="md:flex hidden flex-col w-[240px] py-10 px-4  backdrop-blur-xl">
                <img
                    onClick={handleGoto}
                    src={logo}
                    alt="logo"
                    className="w-full h-28 object-contain my-4"
                />
                <Login />
                <NavLinks />
            </div>

            {/* Mobile sidebar */}
            <div className="absolute md:hidden block top-6 right-3">
                {!mobileMenuOpen ? (
                    <HiOutlineMenu
                        className="w-6 h-6 mr-2 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    />
                ) : (
                    <RiCloseLine
                        className="w-6 h-6 mr-2 text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </div>

            <div
                className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
                    mobileMenuOpen ? 'left-0' : '-left-full'
                }`}
            >
                <img
                    src={logo}
                    alt="logo"
                    className="w-full h-14 object-contain"
                />
                <Login />
                <NavLinks handleClick={() => setMobileMenuOpen(false)} />
            </div>
        </div>
    );
};

export default Sidebar;
