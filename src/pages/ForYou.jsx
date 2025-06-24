import React from "react";
export default function ForYou({
  songs,
  setCurrentSongIndex,
  setIsPlaying,
  searchTerm,
  setSearchTerm,
}) {
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 text-white bg-gradient-to-br from-[#3a1c0e] to-[#2a0900] min-h-screen">
      <h2 className="text-2xl font-bold mb-">For You</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search Song, Artist"
        className="w-full p-3 mb-4 rounded bg-[#5b2c18] text-white placeholder-gray-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🎧 Song List */}
      <ul className="space-y-2">
        {filteredSongs.map((song, index) => (
          <li
            key={index}
            onClick={() => {
              setCurrentSongIndex(index);
              setIsPlaying(true);
            }}
            className="flex items-center justify-between hover:bg-white/10 p-2 rounded cursor-pointer transition-all"
          >
            {/* Left: Thumbnail & Title */}
            <div className="flex items-center gap-4">
              <img
                src={song.cover}
                alt={song.title}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{song.title}</div>
                <div className="text-sm text-gray-300">{song.artist}</div>
              </div>
            </div>

            {/* Right: Time */}
            <div>{song.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}




