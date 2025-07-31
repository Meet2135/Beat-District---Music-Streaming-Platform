import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddEditSong from "./Admin/AddEditSong";
import ThemeToggle from "../components/ThemeToggle";

function Admin() {
  const navigate = useNavigate();
  const { allSongs } = useSelector((state) => state.user);

  return (
    <div className="p-5 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <i
            className="ri-arrow-left-line text-3xl text-gray-700 dark:text-gray-200 cursor-pointer hover:text-primary-light dark:hover:text-primary-dark"
            onClick={() => {
              navigate("/home");
            }}
          ></i>
          <h1 className="text-3xl text-gray-700 dark:text-gray-200">Admin Panel</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex justify-end mt-5">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors duration-300"
          onClick={() => {
            navigate("/admin/add-edit-song");
          }}
        >
          Add New Song
        </button>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl text-gray-700 dark:text-gray-200 mb-4">All Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allSongs.map((song) => (
            <div
              key={song._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={song.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"}
                  alt={song.title}
                  className="w-16 h-16 rounded object-cover"
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg";
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {song.artist} • {song.album}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => {
                    navigate(`/admin/add-edit-song?id=${song._id}`);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin; 