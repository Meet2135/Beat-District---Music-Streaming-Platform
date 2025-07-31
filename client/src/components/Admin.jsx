import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SetAllSongs } from '../redux/userSlice';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    duration: '',
    file: null,
    albumPhoto: null
  });
  const [albumPhotoPreview, setAlbumPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    setSongData({
      ...songData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (e.target.name === 'file' && !file.type.startsWith('audio/')) {
        toast.error('Please select a valid audio file');
        return;
      }
      if (e.target.name === 'albumPhoto' && !file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      setSongData({
        ...songData,
        [e.target.name]: file
      });
      
      if (e.target.name === 'albumPhoto') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAlbumPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
      
      toast.success(`${e.target.name === 'file' ? 'Song' : 'Album photo'} selected`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', songData.title);
      formData.append('artist', songData.artist);
      formData.append('album', songData.album);
      formData.append('year', songData.year);
      formData.append('duration', songData.duration);
      
      if (songData.file) {
        formData.append('file', songData.file);
      }
      if (songData.albumPhoto) {
        formData.append('albumPhoto', songData.albumPhoto);
      }

      const response = await axios.post('/api/admin/add-song', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        toast.success('Song added successfully');
        dispatch(SetAllSongs(response.data.data));
        setSongData({
          title: '',
          artist: '',
          album: '',
          year: '',
          duration: '',
          file: null,
          albumPhoto: null
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding song');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`max-w-2xl mx-auto rounded-lg shadow-md p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Add New Song</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Title</label>
              <input
                type="text"
                name="title"
                value={songData.title}
                onChange={handleInputChange}
                required
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Artist</label>
              <input
                type="text"
                name="artist"
                value={songData.artist}
                onChange={handleInputChange}
                required
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Album</label>
              <input
                type="text"
                name="album"
                value={songData.album}
                onChange={handleInputChange}
                required
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Year</label>
              <input
                type="number"
                name="year"
                value={songData.year}
                onChange={handleInputChange}
                required
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Duration</label>
              <input
                type="text"
                name="duration"
                value={songData.duration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 3:45"
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Song File</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="audio/*"
                required
                className={`mt-1 block w-full text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-500 file:text-white
                  hover:file:bg-green-600`}
              />
              {songData.file && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected: {songData.file.name}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Album Photo</label>
              <div className="mt-1">
                {albumPhotoPreview ? (
                  <div className="relative group mb-4">
                    <img
                      src={albumPhotoPreview}
                      alt="Album preview"
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm">Change photo</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-40 h-40 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <i className="ri-image-add-line text-4xl text-gray-400 dark:text-gray-500"></i>
                  </div>
                )}
                <input
                  type="file"
                  name="albumPhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className={`block w-full text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-500 file:text-white
                    hover:file:bg-green-600`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: Square image, JPG or PNG, max 5MB
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : 'Add Song'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin; 