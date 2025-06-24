import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaHeart,
} from "react-icons/fa";

export default function MusicPlayer({
  song,
  isPlaying,
  setIsPlaying,
  setCurrentSongIndex,
  currentSongIndex,
  totalSongs,
  favourites,
  toggleFavourite,
}) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const isFav = favourites?.some((fav) => fav.title === song.title);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback error:", error);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, song]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    setCurrentSongIndex((prev) =>
      prev + 1 < totalSongs ? prev + 1 : 0
    );
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentSongIndex((prev) =>
      prev > 0 ? prev - 1 : totalSongs - 1
    );
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="w-full h-full p-6 flex flex-col justify-center items-center text-white bg-gradient-to-br from-[#321405] to-[#2a0900]"
    >
      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src={song.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Song thumbnail */}
      <img
        src={song.thumbnail}
        alt={song.title}
        className="w-110 h-110 rounded-lg object-cover mb-4 shadow-md"
      />

      {/* Song info */}
      <h2 className="text-xl md:text-2xl font-bold">{song.title}</h2>
      <p className="text-sm md:text-base text-white/70 mb-4">{song.artist}</p>

      {/* Progress bar */}
      <div className="flex items-center gap-2 w-full md:w-120 mb-4">
        <span className="text-xs">{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="flex-1 appearance-none h-1 bg-white/50 rounded accent-white"
        />
        <span className="text-xs">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-10 text-2xl md:text-3xl mt-2">
        <button onClick={playPrevious}>
          <FaBackward />
        </button>
        <button
          onClick={togglePlay}
          className="bg-white text-black p-3 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={playNext}>
          <FaForward />
        </button>
        <button
          onClick={() => toggleFavourite(song)}
          className={`text-xl transition ${
            isFav ? "text-red-500 scale-110" : "text-white/70"
          }`}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
}
