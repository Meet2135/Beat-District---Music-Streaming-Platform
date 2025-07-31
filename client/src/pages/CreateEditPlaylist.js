import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetUser,
} from "../redux/userSlice";
import ThemeToggle from "../components/ThemeToggle";

function CreateEditPlaylist() {
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [selectedSongs, setSelectedSongs] = React.useState([]);
  const { allSongs, selectedPlaylistForEdit } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const selectUnselectSong = (song) => {
    if (selectedSongs.find((s) => s._id === song._id)) {
      setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
    } else {
      setSelectedSongs([...selectedSongs, { ...song }]);
    }
  };

  const onAdd = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please fill all fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          "/api/songs/add-playlist",
          {
            name,
            songs: selectedSongs.map(song => ({
              ...song,
              _id: song._id,
              title: song.title,
              artist: song.artist,
              album: song.album,
              year: song.year,
              duration: song.duration,
              file: song.file,
              albumPhoto: song.albumPhoto
            })),
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success("Playlist created successfully");
          dispatch(SetUser(response.data.data));
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        console.error("Error creating playlist:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const onEdit = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please fill all fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          "/api/songs/update-playlist",
          {
            name,
            songs: selectedSongs.map(song => ({
              ...song,
              _id: song._id,
              title: song.title,
              artist: song.artist,
              album: song.album,
              year: song.year,
              duration: song.duration,
              file: song.file,
              albumPhoto: song.albumPhoto
            })),
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success("Playlist updated successfully");
          dispatch(SetUser(response.data.data));
          dispatch(SetSelectedPlaylistForEdit(null));
          dispatch(
            SetSelectedPlaylist({
              name: "All Songs",
              songs: allSongs,
            })
          );
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        console.error("Error updating playlist:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (selectedPlaylistForEdit) {
      setName(selectedPlaylistForEdit.name);
      setSelectedSongs(selectedPlaylistForEdit.songs.map(song => ({ ...song })));
    }
  }, [selectedPlaylistForEdit]);

  return (
    <div className="p-5 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <i
            className="ri-arrow-left-line text-3xl text-gray-700 dark:text-gray-200 cursor-pointer hover:text-primary-light dark:hover:text-primary-dark"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <h1 className="text-3xl text-gray-700 dark:text-gray-200">
            {selectedPlaylistForEdit ? "Edit" : "Add"} Playlist
          </h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex justify-between gap-3 mt-5">
        <input
          className="input-field w-96"
          type="text"
          placeholder="name"
          value={name}
          disabled={selectedPlaylistForEdit}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          className="btn-primary"
          onClick={() => {
            if (selectedPlaylistForEdit) {
              onEdit();
            } else {
              onAdd();
            }
          }}
        >
          SAVE
        </button>
      </div>

      <h1 className="my-5 text-2xl text-gray-700 dark:text-gray-200">
        Selected Songs - {selectedSongs.length}
      </h1>

      <div className="grid grid-cols-3 gap-3">
        {allSongs.map((song, index) => {
          const isSelected = selectedSongs.find((s) => s._id === song._id);
          return (
            <div
              key={song._id}
              className={`p-2 flex items-center shadow justify-between border cursor-pointer rounded ${
                isSelected
                  ? "border-active border-2 bg-gray-100 dark:bg-gray-800"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              onClick={() => selectUnselectSong(song)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={song.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg";
                  }}
                />
                <div>
                  <h1 className="text-gray-700 dark:text-gray-200">{song.title}</h1>
                  <h1 className="text-gray-500 dark:text-gray-400">
                    {song.artist} - {song.album} - {song.year}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Player />
    </div>
  );
}

export default CreateEditPlaylist;
