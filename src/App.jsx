import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import {
    ArtistDetails,
    TopArtists,
    Discover,
    TopCharts,
    AlbumDetails,
    Favorites,
    Callback,
} from './pages';

import FeaturedPlaylists from './pages/FeaturedPlaylists';

const App = () => {
    const { activeSong, currentSongs, discoverPage } = useSelector(
        state => state.player,
    );

    return (
        <div className="relative flex">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
                <Searchbar />

                <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                    <div className="flex-1 h-fit pb-40">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate
                                        to="/featured-playlists"
                                        replace
                                    />
                                }
                            />
                            <Route
                                path="/callback"
                                element={<Callback />}
                            />
                            <Route
                                path="/featured-playlists"
                                element={<FeaturedPlaylists />}
                            />
                            <Route
                                path="/discover/:id"
                                element={<Discover />}
                            />
                            <Route
                                path="/top-artists"
                                element={<TopArtists />}
                            />
                            <Route
                                path="/top-charts"
                                element={<TopCharts />}
                            />
                            <Route
                                path="/around-you"
                                element={<Favorites />}
                            />
                            <Route
                                path="/artists/:id"
                                element={<ArtistDetails />}
                            />
                            <Route
                                path="/artists/:id/albums/:albumid"
                                element={<AlbumDetails />}
                            />
                        </Routes>
                    </div>
                    <div className="xl:sticky relative top-0 h-fit">
                        <TopPlay />
                    </div>
                </div>
            </div>
            {activeSong?.id && (
                <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
                    <MusicPlayer />
                </div>
            )}
        </div>
    );
};

export default App;
