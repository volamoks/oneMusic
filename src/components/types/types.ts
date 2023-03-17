interface I_baseData {
    id: string;
    name: string;
}

interface I_images {
    height: number;
    url: string;
    width: number;
}

export interface I_artists extends I_baseData {}

export interface I_album extends I_baseData {
    artists: I_artists[];
    images: I_images[];
    release_date: string;
}

export interface I_playlistResponse extends I_baseData {
    images: I_images[];
    tracks: { items: I_trackInItems[] };
}

interface I_trackInItems {
    track: I_tracks;
}

export interface I_tracks extends I_baseData {
    album: I_album;
    artists: I_artists[];
    preview_url: string;
}

export interface I_activeSong extends I_tracks {
    album: I_album;
    atists: I_artists;
}

export interface I_albumResponse extends I_baseData {
    items: I_album[];
}

export interface I_artist_response extends I_baseData {
    atists: I_artists[];
    tracks: { items: I_activeSong[] };
    album: I_album;
    images: I_images[];
}
