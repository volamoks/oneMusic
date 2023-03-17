import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I_activeSong } from '../../components/types/types';

interface I_initState {
    currentSongs: I_currentSongs;
    currentIndex: number;
    isActive: boolean;
    isPlaying: boolean;
    activeSong: I_activeSong;
    genreListId: string;

    access_token: string;
    playlistId: string;

    discoverPage: boolean;
    searchQuery: {
        queryList: string;
        dataQuery: {};
    };
    artistData: {
        atristSelectedAlbum: string;
        artistsQuery: { artists: I_artists[] };
    };
}
const initialState: I_initState = {
    currentSongs: {
        tracks: {
            items: [],
            i: 0,
        },
        i: 0,
    },
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: {
        id: '',
        preview_url: '',
        name: '',
        album: [],
        artists: [],
    },
    genreListId: '',
    access_token: '',
    playlistId: '',

    discoverPage: false,
    searchQuery: {
        queryList: '',
        dataQuery: {},
    },
    artistData: {
        atristSelectedAlbum: '',
        artistsQuery: { artists: [] },
    },
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActiveSong: (
            state,
            action: PayloadAction<{ track: I_activeSong; i: number }>,
        ) => {
            state.activeSong = action.payload.track;
            state.currentIndex = action.payload.i;
            state.currentSongs = action.payload.data;
        },

        nextSong: (state, action: PayloadAction<number>) => {
            if (state.currentSongs[action.payload]) {
                state.activeSong = state.currentSongs[action.payload];
            }

            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = true;
        },

        prevSong: (state, action: PayloadAction<number>) => {
            if (state.currentSongs[action.payload]?.track) {
                state.activeSong = state.currentSongs[action.payload];
            }

            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = true;
        },

        playPause: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },

        selectGenreListId: (state, action: PayloadAction<string>) => {
            state.genreListId = action.payload;
        },

        setPlaylist: (state, action: PayloadAction<string>) => {
            state.playlistId = action.payload;
        },

        setDiscover: state => {
            state.discoverPage = true;
        },

        setArtistsQuery: (
            state,
            action: PayloadAction<{ artists: I_artists[] }>,
        ) => {
            state.artistData.artistsQuery = action.payload;
        },

        setAlbum: (state, action: PayloadAction<string>) => {
            state.artistData.atristSelectedAlbum = action.payload;
        },
        // setSearchQuery: (state, action: PayloadAction<string>) => {
        //     state.searchQuery.queryList = action.payload;
        // },
        // setSearchData: (state, action) => {
        //     state.searchQuery.dataQuery = action.payload;
        // },
    },
});

export const {
    setActiveSong,
    nextSong,
    prevSong,
    playPause,
    selectGenreListId,
    setPlaylist,
    // setArtistsQuery,
    setDiscover,
    setAlbum,
    // setSearchQuery,
    // setSearchData,
} = playerSlice.actions;

export default playerSlice.reducer;
