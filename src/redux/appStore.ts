import { combineReducers, configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice_';
import { spotifyApi } from './services/spotifyApi';

const rootReducer = combineReducers({
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    player: playerReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(spotifyApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
