import React from "react";
export default function TopTracks({
  songs,
  setCurrentSongIndex,
  setIsPlaying,
}) {
  return (
    <div className="p-4 text-white bg-gradient-to-br from-[#3a1c0e] to-[#2a0900] min-h-screen">
      <h2 className="text-2xl font-bold mb-10"> Top Trends</h2>

      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li
            key={index}
            onClick={() => {
              setCurrentSongIndex(index);
              setIsPlaying(true);
            }}
            className="flex items-center justify-between hover:bg-white/10 p-2 rounded cursor-pointer transition-all"
          >
            {/* Left: Thumbnail & Song Info */}
            <div className="flex items-center gap-4">
              <img
                src={song.cover || song.thumbnail}
                alt={song.title}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{song.title}</div>
                <div className="text-sm text-gray-300">{song.artist}</div>
              </div>
            </div>

            {/* Right: Song Time */}
            <div>{song.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
