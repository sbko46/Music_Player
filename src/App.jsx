import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";

import ForYou from "./pages/ForYou";
import TopTracks from "./pages/TopTracks";
import Favourites from "./pages/Favourites";
import RecentlyPlayed from "./pages/RecentlyPlayed";

import { songsData } from "./data/songs";
import "./index.css";

export default function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Favourites saved in localStorage
  const [favourites, setFavourites] = useState(() => {
    const storedFavs = localStorage.getItem("favourites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // ✅ Recently Played - session only (not saved in localStorage)
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const currentSong = songsData[currentSongIndex];

  // ✅ Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // ✅ Add current song to recently played on change
  useEffect(() => {
    const song = songsData[currentSongIndex];
    setRecentlyPlayed((prev) => {
      const exists = prev.find((s) => s.title === song.title);
      if (exists) return prev;
      return [song, ...prev].slice(0, 10); // Keep last 10
    });
  }, [currentSongIndex]);

  // ✅ Toggle favourite
  const toggleFavourite = (song) => {
    const isFav = favourites.some((s) => s.title === song.title);
    if (isFav) {
      setFavourites(favourites.filter((s) => s.title !== song.title));
    } else {
      setFavourites([...favourites, song]);
    }
  };

  return (
    <Router>
      <div
        className="flex min-h-screen w-full flex-col md:flex-row text-white transition-all duration-500 ease-in-out"
        style={{
          background: `linear-gradient(to bottom right, ${currentSong.themeColor || "#000"}, #000)`,
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Page Content */}
          <div className="w-full md:w-[38%] md:h-screen overflow-y-auto border-r border-white/10">
            <Routes>
              <Route
                path="/"
                element={
                  <ForYou
                    songs={songsData}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setCurrentSongIndex={setCurrentSongIndex}
                    setIsPlaying={setIsPlaying}
                  />
                }
              />
              <Route
                path="/top-tracks"
                element={
                  <TopTracks
                    songs={songsData.slice(0, 6)}
                    setCurrentSongIndex={setCurrentSongIndex}
                    setIsPlaying={setIsPlaying}
                  />
                }
              />
              <Route
                path="/favourites"
                element={
                  <Favourites
                    songs={favourites}
                    setCurrentSongIndex={setCurrentSongIndex}
                    setIsPlaying={setIsPlaying}
                  />
                }
              />
              <Route
                path="/recently-played"
                element={
                  <RecentlyPlayed
                    songs={recentlyPlayed}
                    setCurrentSongIndex={setCurrentSongIndex}
                    setIsPlaying={setIsPlaying}
                  />
                }
              />
            </Routes>
          </div>

          {/* Music Player */}
          <div className="w-full md:w-[62%] md:h-screen overflow-y-auto">
            <MusicPlayer
              song={currentSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setCurrentSongIndex={setCurrentSongIndex}
              currentSongIndex={currentSongIndex}
              totalSongs={songsData.length}
              toggleFavourite={toggleFavourite}
              favourites={favourites}
            />
          </div>
        </div>
      </div>
    </Router>
  );
}
