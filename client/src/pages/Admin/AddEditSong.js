import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { SetAllSongs } from "../../redux/userSlice";
import ThemeToggle from "../../components/ThemeToggle";

function AddEditSong() {
  const { allSongs, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileTypes = ["MP3"];
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");

  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: "",
    playlist: "",
    file: "",
    albumPhoto: "",
  });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (songId) {
      const existingSong = allSongs.find((s) => s._id === songId);
      if (existingSong) {
        setSong(existingSong);
      }
    }
  }, [songId, allSongs]);

  const handleFileChange = (file, type) => {
    setSong((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      
      // Append text fields
      Object.keys(song).forEach((key) => {
        if (key !== 'file' && key !== 'albumPhoto') {
          formData.append(key, song[key]);
        }
      });

      // Append files if they exist
      if (song.file) {
        formData.append("file", song.file, song.file.name);
      }
      if (song.albumPhoto) {
        formData.append("albumPhoto", song.albumPhoto, song.albumPhoto.name);
      }

      if (songId) {
        formData.append("_id", songId);
      }

      const endpoint = songId ? "/api/admin/edit-song" : "/api/admin/add-song";
      const response = await axios.post(endpoint, formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(`Song ${songId ? "updated" : "added"} successfully`);
        dispatch(SetAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const isFormValid = song.title && song.artist && song.album && song.year && song.duration && song.playlist;

  return (
    <div className="p-5 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <i
            className="ri-arrow-left-line text-3xl text-gray-700 dark:text-gray-200 cursor-pointer hover:text-primary-light dark:hover:text-primary-dark"
            onClick={() => {
              navigate("/admin");
            }}
          ></i>
          <h1 className="text-3xl text-gray-700 dark:text-gray-200">{songId ? "Edit" : "Add"} Song</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-10 mt-5">
        <div className="flex flex-col gap-3 w-1/3">
          {["title", "artist", "album", "duration", "playlist"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={song[field]}
              onChange={(e) => setSong((prev) => ({ ...prev, [field]: e.target.value }))}
              className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
            />
          ))}
          
          {/* Year input with dropdown */}
          <div className="relative">
            <select
              value={song.year || ''}
              onChange={(e) => setSong((prev) => ({ ...prev, year: e.target.value }))}
              className="p-2 border rounded w-full appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
            >
              <option value="">Select Year</option>
              {Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year} className="bg-white dark:bg-gray-800">
                    {year}
                  </option>
                );
              })}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <i className="ri-calendar-line text-gray-500 dark:text-gray-400"></i>
            </div>
          </div>
          
          <div className="card p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Song File</label>
            <FileUploader
              handleChange={(file) => handleFileChange(file, 'file')}
              name="file"
              types={fileTypes}
              classes="file-uploader"
            />
            {song.file && <h1 className="text-gray-500 dark:text-gray-400 mt-2">{song.file.name}</h1>}
          </div>

          <div className="card p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Album Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0], 'albumPhoto')}
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-green-500 file:text-white
                hover:file:bg-green-600"
            />
            {song.albumPhoto && <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Selected Photo: {song.albumPhoto.name}</p>}
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              className={`text-white bg-orange-500 py-2 px-10 w-full rounded-lg hover:bg-orange-600 transition-colors ${
                !isFormValid && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              {songId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div>
          <img
            className="h-[500px] rounded-lg shadow-lg"
            src="https://2.bp.blogspot.com/-Nc9YO_-F8yI/TcSIAB-nR-I/AAAAAAAAAGI/hPkuxqkqVcU/s1600/music-clipartMUSIC1.jpg"
            alt="Music illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default AddEditSong;
