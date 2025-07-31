import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { SetAllSongs } from "../../redux/userSlice";

function AddEditSong() {
  const { allSongs, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileTypes = ["MP3"];
  const imageTypes = ["JPG", "JPEG", "PNG"];
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");

  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: "",
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

  const handleSongFileChange = (file) => {
    setSong((prev) => ({ ...prev, file }));
  };

  const handleAlbumPhotoChange = (file) => {
    setSong((prev) => ({ ...prev, albumPhoto: file }));
  };

  const handleSubmit = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        if (key === "file" && song[key]) {
          formData.append("file", song[key], song[key].name);
        } else if (key === "albumPhoto" && song[key]) {
          formData.append("albumPhoto", song[key], song[key].name);
        } else {
          formData.append(key, song[key]);
        }
      });
      if (songId) {
        formData.append("_id", songId);
      }

      const endpoint = songId ? "/api/admin/edit-song" : "/api/admin/add-song";
      const response = await axios.post(endpoint, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      toast.error("Something went wrong");
    }
  };

  const isFormValid = song.title && song.artist && song.album && song.year && song.duration && song.albumPhoto;

  return (
    <div>
      <div className="flex items-center gap-5">
        <i
          className="ri-arrow-left-line text-3xl cursor-pointer"
          onClick={() => navigate("/admin")}
        ></i>
        <h1 className="text-3xl">{songId ? "Edit" : "Add"} Song</h1>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex flex-col gap-3 w-1/3 mt-5">
          {["title", "artist", "album", "year", "duration"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={song[field]}
              onChange={(e) => setSong((prev) => ({ ...prev, [field]: e.target.value }))}
              className="p-2 border rounded"
            />
          ))}
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Song File</label>
            <FileUploader handleChange={handleSongFileChange} name="file" types={fileTypes} />
            {song.file && <p className="text-gray-500 text-sm mt-2">Selected File: {song.file.name}</p>}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Album Photo</label>
            <FileUploader handleChange={handleAlbumPhotoChange} name="albumPhoto" types={imageTypes} />
            {song.albumPhoto && <p className="text-gray-500 text-sm mt-2">Selected Photo: {song.albumPhoto.name}</p>}
          </div>

          <div className="flex justify-end mt-4">
            <button
              className={`text-white bg-orange-500 py-2 px-10 w-full ${!isFormValid && "opacity-50 cursor-not-allowed"}`}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              {songId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div>
          <img
            className="h-[500px]"
            src="https://2.bp.blogspot.com/-Nc9YO_-F8yI/TcSIAB-nR-I/AAAAAAAAAGI/hPkuxqkqVcU/s1600/music-clipartMUSIC1.jpg"
            alt="Music Illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default AddEditSong; 