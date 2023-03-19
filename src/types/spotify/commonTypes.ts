import { Item as albumItem } from './albumsTypes';
import { Item as searchItem } from './searchTypes';
import { Track as playlistItem } from './playlistsTypes';

export type commonIitem = albumItem | playlistItem | searchItem;

export type commonIitems = albumItem[] | playlistItem[] | searchItem[];
