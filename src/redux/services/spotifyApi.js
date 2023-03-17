import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SPOTIFY_BASE_URL = 'https://api.spotify.com';

export const spotifyApi = createApi({
    reducerPath: 'spotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SPOTIFY_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('access_token');
            // 'BQCG2XffVw6yYEXStN-El8MtiWpY0KDqMR8AbcmiLj62o14lMQZlNyyFv4qKLCCvJO_-t_qfQb_wD-s0rME-I3cXfXh5NXTw_7mkUS2AaHcrhgn5lAPOwcFp7ti18qsYgVQAlxYCmdGWEd0MVfZ_-XFLZ6BYi88OmebCrW2UFqO1Ah_-JyNhqSyr_bGWABRqdiNRcKt7HLRnjSuvejb2UiWq';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        getPlaylist: builder.query({
            query: playlistId => ({
                url: `/v1/playlists/${playlistId}`,
            }),
            // query: playlistId => `/v1/playlists/37i9dQZF1DWTwnEm1IYyoj`,
        }),
        getArtist: builder.query({
            query: artistId => `/v1/artists/3vvLuXEEf7sl3izJcw0GIn`,
        }),
        getAlbum: builder.query({
            query: albumId => ({
                url: `/v1/albums/${albumId}`,
                // url: `/v1/albums/4aawyAB9vmqN3uQ7FjRGTy`,
            }),
        }),
        getSeveralArtists: builder.query({
            query: artistsList => ({
                url: `/v1/artists`,
                params: { ids: artistsList },
            }),
        }),
        getTracks: builder.query({
            query: trackid => ({
                url: `/v1/tracks`,
                params: { ids: trackid },
            }),
        }),
        getTrack: builder.query({
            query: () =>
                `https://api.spotify.com/v1/tracks/2qxmye6gAegTMjLKEBoR3d`,
        }),
        getFeaturedPlaylists: builder.query({
            query: () => '/v1/browse/featured-playlists?limit=20&offset=0',
        }),

        getArtistData: builder.query({
            query: artistID => ({
                url: `/v1/artists/${artistID}`,
                // url: `/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks`,
            }),
        }),
        getSearchForItem: builder.query({
            query: searchQuery => ({
                url: `/v1/search?q=${searchQuery}&type=album,artist,track`,
            }),
        }),
    }),
});
export const {
    useGetArtistQuery,
    useGetTrackQuery,
    useGetTracksQuery,
    useGetPlaylistQuery,
    useGetFeaturedPlaylistsQuery,
    useGetSeveralArtistsQuery,
    useGetArtistDataQuery,
    useGetAlbumQuery,
    useGetSearchForItemQuery,
} = spotifyApi;
