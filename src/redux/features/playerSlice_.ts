import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../types/spotify/albumsTypes';
import { commonIitem, commonIitems } from '../../types/spotify/commonTypes';

interface I_initState {
    currentSongs: Item[];
    currentIndex: number;
    isActive: boolean;
    isPlaying: boolean;
    activeSong: Item | null;
    playlistId: string;
    discoverPage: boolean;
    favorites: string[] | null;
    searchQuery: {
        queryList: string;
        dataQuery: {};
    };
}
const initialState: I_initState = {
    currentSongs: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: null,
    playlistId: '',
    discoverPage: false,
    favorites: JSON.parse(localStorage.getItem('favtracks') || '[]'),
    searchQuery: {
        queryList: '',
        dataQuery: {},
    },
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActiveSong: (
            state,
            action: PayloadAction<{
                track: commonIitem;
                data: commonIitems;
                i: number;
            }>,
        ) => {
            if (action.payload) {
                state.activeSong = action.payload.track;
                state.currentIndex = action.payload.i;
                state.currentSongs = action.payload.data;
                state.isActive = true;
            } else return state;
        },

        nextSong: (state, action: PayloadAction<number>) => {
            if (state.currentSongs[action.payload]) {
                state.activeSong = state.currentSongs[action.payload];
            }

            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = true;
        },

        prevSong: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload) {
                if (state.currentSongs[action.payload]) {
                    state.activeSong = state.currentSongs[action.payload];
                }

                state.currentIndex = action.payload;
                state.isActive = true;
                state.isPlaying = true;
            } else return state;
        },

        playPause: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },

        // selectGenreListId: (state, action: PayloadAction<string>) => {
        //     state.genreListId = action.payload;
        // },

        setPlaylist: (state, action: PayloadAction<string>) => {
            state.playlistId = action.payload;
        },

        setDiscover: state => {
            state.discoverPage = true;
        },

        setFavorites: (state, action: PayloadAction<string>) => {
            if (state.favorites) {
                state.favorites = state.favorites.includes(action.payload)
                    ? state.favorites.filter(id => id !== action.payload)
                    : [...state.favorites, action.payload];
            }
            return state;
        },

        // setArtistsQuery: (
        //     state,
        //     action: PayloadAction<IArtists | undefined>,
        // ) => {
        //     if (action.payload) state.artistData.artistsQuery = action.payload;
        // },

        // setAlbum: (state, action: PayloadAction<string>) => {
        //     state.artistData.atristSelectedAlbum = action.payload;
        // },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery.queryList = action.payload;
        },
        setSearchData: (state, action) => {
            state.searchQuery.dataQuery = action.payload;
        },
    },
});

export const {
    setActiveSong,
    nextSong,
    prevSong,
    playPause,
    // selectGenreListId,
    setPlaylist,
    // setArtistsQuery,
    setDiscover,
    // setAlbum,
    setSearchQuery,
    setSearchData,
    setFavorites,
} = playerSlice.actions;

export const userActions = playerSlice.actions;

export default playerSlice.reducer;
