import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetCurrentTime,
  SetIsPlaying,
} from "../redux/userSlice";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

function Player() {
  const [volume, setVolume] = useState(1);
  const [shuffleOn, setShuffleOn] = useState(false);
  const dispatch = useDispatch();
  const audioRef = React.createRef();
  const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } =
    useSelector((state) => state.user);
  const [duration, setDuration] = useState(0);

  const onPlay = () => {
    audioRef.current.play();
    dispatch(SetIsPlaying(true));
  };

  const onPause = () => {
    audioRef.current.pause();
    dispatch(SetIsPlaying(false));
  };

  const onPrev = () => {
    if (currentSongIndex !== 0 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };

  const onNext = () => {
    if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(SetCurrentSong(allSongs[0]));
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTime) {
      audioRef.current.currentTime = currentTime;
    }
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg transition-colors duration-200">
      <div className="flex justify-between items-center border p-5 border-green-500 rounded-lg shadow-xl bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        
        {/* Song Details */}
        <div className="flex items-center gap-4 w-96">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <motion.img
              src={currentSong?.albumPhoto || "/default-album.png"}
              alt="Album"
              className="w-full h-full object-cover"
              animate={{
                rotate: isPlaying ? 360 : 0,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gray-300/20"
              animate={{
                scale: isPlaying ? [1, 1.1, 1] : 1,
                opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.3,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <div>
            <h1 className="text-gray-900 dark:text-white text-xl font-semibold">{currentSong?.title}</h1>
            <h1 className="text-gray-500 dark:text-gray-400 text-sm">
              {currentSong?.artist} • {currentSong?.album} • {currentSong?.year}
            </h1>
          </div>
        </div>

        {/* Controls & Progress Bar */}
        <div className="w-96 flex flex-col items-center">
          <audio
            src={currentSong?.src}
            ref={audioRef}
            onTimeUpdate={(e) => {
              dispatch(SetCurrentTime(e.target.currentTime));
            }}
          ></audio>
          
          <div className="flex gap-6 items-center">
            <i className="ri-skip-back-line text-3xl text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition" onClick={onPrev}></i>

            {isPlaying ? (
              <i className="ri-pause-line text-4xl text-white bg-gray-600 dark:bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 transition" onClick={onPause}></i>
            ) : (
              <i className="ri-play-line text-4xl text-white bg-gray-600 dark:bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 transition" onClick={onPlay}></i>
            )}

            <i className="ri-skip-forward-line text-3xl text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition" onClick={onNext}></i>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-3 items-center w-full mt-2">
            <h1 className="text-sm text-gray-500 dark:text-gray-400">{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</h1>
            <input
              type="range"
              className="w-full cursor-pointer accent-green-500"
              min={0}
              max={Number(currentSong?.duration) * 60}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                dispatch(SetCurrentTime(e.target.value));
              }}
            />
            <h1 className="text-sm text-gray-500 dark:text-gray-400">{currentSong?.duration}</h1>
          </div>
        </div>

        {/* Volume & Shuffle */}
        <div className="flex gap-4 items-center">
          <i className={`ri-shuffle-line text-2xl cursor-pointer transition ${shuffleOn ? "text-green-500 dark:text-green-400 font-semibold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`} 
            onClick={() => setShuffleOn(!shuffleOn)}
          ></i>

          <i
            className="ri-volume-mute-line text-3xl text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition"
            onClick={() => {
              setVolume(0);
              audioRef.current.volume = 0;
            }}
          ></i>

          <input
            type="range"
            className="cursor-pointer accent-green-500"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
              setVolume(e.target.value);
            }}
          />

          <i
            className="ri-volume-up-line text-3xl text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition"
            onClick={() => {
              setVolume(1);
              audioRef.current.volume = 1;
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Player;