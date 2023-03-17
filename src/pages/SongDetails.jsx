// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
// import { setActiveSong, playPause } from '../redux/features/playerSlice';
// import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
// import { useId } from 'react';

// const SongDetails = () => {
//     const songid = useParams();
//     const dispatch = useDispatch();
//     const { activeSong, isPlaying } = useSelector(state => state.player);
//     const {
//         data: songData,
//         isFething: isFetchingSongDetails,
//         isSuccess,
//     } = useGetSongDetailsQuery(songid);

//     isSuccess && console.log(songData, songid.songid);

//     const lyrics = songData?.sections[1]?.text.map(line => {
//         return line === '' ? (
//             <p className="text-gray-400 text-base ">...</p>
//         ) : (
//             <p className="text-gray-400  text-base my-1">{line}</p>
//         );
//     });

//     const artistId = songData?.artists[0]?.adamid;

//     return (
//         <div className="flex flex-col">
//             <DetailsHeader
//                 // artistId={artistId}
//                 songData={songData}
//             />
//             <div className="mb-10">
//                 <h2 className="text-white text-3xl font-bold mt-12">Lyrics:</h2>
//                 <div className="mt-5">
//                     {songData?.sections[1]?.type === 'LYRICS' ? (
//                         lyrics
//                     ) : (
//                         <p className="text-white text-base ">...</p>
//                     )}
//                 </div>
//             </div>
//             <RelatedSongs
//                 key={useId()}
//                 songid={songid}
//             />
//         </div>
//     );
// };

// export default SongDetails;
