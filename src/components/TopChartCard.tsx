// import React, { FC } from 'react';
// import { useSelector } from 'react-redux';

// import PlayPause from './PlayPause';

// import { Item } from '../types/spotify/albumsTypes';
// import { Track } from '../types/spotify/playlistsTypes';
// import { useAppSelector } from '../redux/hooks/redux';
// import SongsLongCard from './SongsLongCard';

// interface IResponse {
//     track: Item;
//     i: number;
//     data: Track[];
//     imgUrl: string;
//     title: string;
//     subtitile: string;
//     id: string;
// }
// const TopChartCard: FC<IResponse> = ({
//     track,
//     i,
//     data,
//     imgUrl,
//     title,
//     subtitile,
//     id,
// }) => {
//     const { activeSong } = useAppSelector(state => state.player);

//     return (
//         <div
//             className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
//                 activeSong?.track?.id === track?.track?.id
//                     ? 'bg-[#4c426e]'
//                     : 'bg-transparent'
//             } py-2 p-4 rounded-lg cursor-pointer mb-2`}
//         >
//             <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
//             <SongsLongCard
//                 key={track.id}
//                 imgUrl={track.track.album.images[0].url}
//                 title={track?.track.artists[0].name}
//                 subtitile={track?.track.name}
//                 id={track.id}
//             />
//             <PlayPause
//                 key={track.id}
//                 track={track}
//                 i={i}
//                 data={playListData}
//             />
//         </div>
//     );
// };

// export default TopChartCard;
