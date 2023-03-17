import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSongs: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: {},
    genreListId: '',
    relatedSongs: [],
    access_token: '',
    playlistId: '',
    artistsQuery: [],
    discoverPage: false,
    searchQuery: {
        queryList: '',
        dataQuery: {},
    },
    artistData: {
        atristSelectedAlbum: '',
        artistsQuery: [],
    },
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActiveSong: (state, action) => {
            state.activeSong = action.payload.song
                ? action.payload.song
                : action.payload;

            if (action.payload?.data?.tracks?.hits) {
                state.currentSongs = action.payload.tracks;
            } else if (action.payload?.data?.tracks?.hits) {
                state.currentSongs = action.payload.data.tracks.hits;
            } else if (action.payload?.data?.tracks?.hits) {
                state.currentSongs = action.payload.data.tracks.hits;
            } else if (action.payload?.data?.properties) {
                state.currentSongs = action.payload?.data?.tracks;
            } else {
                state.currentSongs = action.payload.data;
            }
            state.currentIndex = action.payload.i;
            state.isActive = true;
        },

        nextSong: (state, action) => {
            if (state.currentSongs[action.payload]) {
                state.activeSong =
                    state.currentSongs.tracks?.items[action.payload].track;
            } else {
                state.activeSong =
                    state.currentSongs.tracks?.items[action.payload].track;
            }

            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = true;
        },

        prevSong: (state, action) => {
            if (state.currentSongs[action.payload]?.track) {
                state.activeSong =
                    state.currentSongs.tracks?.items[action.payload].track;
            } else {
                state.activeSong =
                    state.currentSongs.tracks?.items[action.payload].track;
            }

            state.currentIndex = action.payload;
            state.isActive = true;
        },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },

        selectGenreListId: (state, action) => {
            state.genreListId = action.payload;
        },

        setPlaylist: (state, action) => {
            state.playlistId = action.payload;
        },

        setArtistsQuery: (state, action) => {
            state.artistsQuery = action.payload;
        },

        setDiscover: state => {
            state.discoverPage = true;
        },
        setAlbum: (state, action) => {
            state.artistData.atristSelectedAlbum = action.payload;
        },
        setSearchQuery: (state, action) => {
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
    selectGenreListId,
    setPlaylist,
    setArtistsQuery,
    setDiscover,
    setAlbum,
    setSearchQuery,
    setSearchData,
} = playerSlice.actions;

export default playerSlice.reducer;
