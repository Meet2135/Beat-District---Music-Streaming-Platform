import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    allSongs: [],
    tempAllSongs: [],
    currentSong: null,
    currentSongIndex: 0,
    selectedPlaylist: null,
    selectedPlaylistForEdit: null,
    isPlaying: false,
    currentTime: 0,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
      // Ensure playlists have complete song data
      if (action.payload?.playlists) {
        state.user.playlists = action.payload.playlists.map(playlist => ({
          ...playlist,
          songs: playlist.songs.map(song => ({
            ...song,
            albumPhoto: song.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"
          }))
        }));
      }
    },
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload.map(song => ({
        ...song,
        albumPhoto: song.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"
      }));
    },
    SetCurrentSong: (state, action) => {
      state.currentSong = action.payload ? {
        ...action.payload,
        albumPhoto: action.payload.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"
      } : null;
    },
    SetCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    SetSelectedPlaylist: (state, action) => {
      if (action.payload) {
        state.selectedPlaylist = {
          ...action.payload,
          songs: action.payload.songs.map(song => ({
            ...song,
            albumPhoto: song.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"
          }))
        };
      } else {
        state.selectedPlaylist = null;
      }
    },
    SetSelectedPlaylistForEdit: (state, action) => {
      if (action.payload) {
        state.selectedPlaylistForEdit = {
          ...action.payload,
          songs: action.payload.songs.map(song => ({
            ...song,
            albumPhoto: song.albumPhoto || "https://cdn.pixabay.com/photo/2020/09/07/13/32/music-5551865_1280.jpg"
          }))
        };
      } else {
        state.selectedPlaylistForEdit = null;
      }
    },
    SetIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    SetCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    }
  },
});

export const {
  SetUser,
  SetAllSongs,
  SetCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetIsPlaying,
  SetCurrentTime
} = userSlice.actions;

export default userSlice.reducer;
