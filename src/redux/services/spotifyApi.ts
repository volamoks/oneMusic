import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFeaturedPlaylist } from '../../types/spotify/featuredPlaylistTypes';
import { IPlaylist } from '../../types/spotify/playlistsTypes';
import { ISearch } from '../../types/spotify/searchTypes';
import { ITracks } from '../../types/spotify/tracks';
import { IArtists } from './../../types/spotify/atristsTypes';
import { IALbum } from './../../types/spotify/albumsTypes';
import { IArtistAlbum } from '../../types/spotify/artistAlbums';

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
        getPlaylist: builder.query<IPlaylist, string>({
            query: playlistId => ({
                url: `/v1/playlists/${playlistId}`,
            }),
            // query: playlistId => `/v1/playlists/37i9dQZF1DWTwnEm1IYyoj`,
        }),
        getArtist: builder.query({
            query: artistId => `/v1/artists/3vvLuXEEf7sl3izJcw0GIn`,
        }),

        getAlbums: builder.query<IALbum, string>({
            query: albumId => ({
                url: `/v1/albums`,
                params: { ids: albumId },
            }),
        }),
        getSeveralArtists: builder.query<IArtists, string | undefined>({
            query: artistsList => ({
                url: `/v1/artists`,
                params: { ids: artistsList },
            }),
        }),
        getTracks: builder.query<ITracks, string | undefined>({
            query: trackids => ({
                url: `/v1/tracks`,
                params: { ids: trackids },
            }),
        }),

        getFeaturedPlaylists: builder.query<IFeaturedPlaylist, any>({
            query: () => '/v1/browse/featured-playlists?limit=20&offset=0',
        }),

        getArtistAlbums: builder.query<IArtistAlbum, string>({
            query: artistID => ({
                url: `/v1/artists/${artistID}`,
            }),
        }),
        getSearchForItem: builder.query<ISearch, string>({
            query: searchQuery => ({
                url: `/v1/search?q=${searchQuery}&type=album,artist,track`,
            }),
        }),
    }),
});
export const {
    // useGetTrackQuery,
    useGetTracksQuery,
    useGetPlaylistQuery,
    useGetFeaturedPlaylistsQuery,
    useGetSeveralArtistsQuery,
    useGetArtistAlbumsQuery,
    useGetAlbumsQuery,
    useGetSearchForItemQuery,
} = spotifyApi;
