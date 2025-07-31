import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlaylist,
} from "../redux/userSlice";

function SongsList() {
  const { currentSong, selectedPlaylist, allSongs } = useSelector(
    (state) => state.user
  );
  const [songsToPlay, setSongsToPlay] = React.useState([]);

  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = React.useState("");

  useEffect(() => {
    if (selectedPlaylist) {
      if (
        selectedPlaylist &&
        selectedPlaylist.name === "All Songs" &&
        searchKey !== ""
      ) {
        const tempSongs = [];

        selectedPlaylist.songs.forEach((song) => {
          if (JSON.stringify(song).toLowerCase().includes(searchKey)) {
            tempSongs.push(song);
          }
        });
        setSongsToPlay(tempSongs);
      } else {
        setSongsToPlay(selectedPlaylist?.songs);
      }
    }
  }, [selectedPlaylist, searchKey]);

  return (
    <div className="flex flex-col gap-3">
      <div className="pl-3 pr-6">
        <input
          type="text"
          placeholder="Song , Artist , Album"
          className="input-field w-full"
          onFocus={() =>
            dispatch(
              SetSelectedPlaylist({
                name: "All Songs",
                songs: allSongs,
              })
            )
          }
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div className="overflow-y-scroll h-[54vh] p-3">
        {songsToPlay.map((song, index) => {
          const isPlaying = currentSong?._id === song._id;
          return (
            <div
              key={song._id}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                currentSong?._id === song._id
                  ? "bg-green-500 bg-opacity-20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                dispatch(SetCurrentSong(song));
                dispatch(SetCurrentSongIndex(index));
              }}
            >
              <img
                src={song.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"}
                alt={song.title}
                className="w-12 h-12 rounded object-cover"
                onError={(e) => {
                  e.target.src = "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg";
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-gray-900 dark:text-white font-semibold">
                  {song.title}
                </h1>
                <h1 className="text-gray-500 dark:text-gray-400 text-sm">
                  {song.artist} • {song.album} • {song.year}
                </h1>
              </div>
              <div className="ml-auto">
                <h1 className="text-gray-500 dark:text-gray-400 text-sm">
                  {song.duration}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongsList;
