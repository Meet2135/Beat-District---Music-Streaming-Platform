import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";

function AdminHome() {
  const [selectedSongForEdit, setSelectedSongForEdit] = React.useState(null);
  const { allSongs, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user)
    {
      if ((user?.isAdmin && !user.isAdmin) || !user?.isAdmin) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div className="p-5 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-gray-700 dark:text-gray-200">All Songs</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="btn-primary"
            onClick={() => {
              navigate("/admin/add-edit-song");
            }}
          >
            Add Song
          </button>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">Title</th>
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">Artist</th>
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">Album</th>
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">Year</th>
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">Duration</th>
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allSongs.map((song) => (
              <tr key={song.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 text-gray-700 dark:text-gray-200">{song.title}</td>
                <td className="p-3 text-gray-700 dark:text-gray-200">{song.artist}</td>
                <td className="p-3 text-gray-700 dark:text-gray-200">{song.album}</td>
                <td className="p-3 text-gray-700 dark:text-gray-200">{song.year}</td>
                <td className="p-3 text-gray-700 dark:text-gray-200">{song.duration}</td>
                <td className="p-3">
                  <i
                    className="ri-pencil-line text-2xl text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark cursor-pointer"
                    onClick={() => {
                      navigate("/admin/add-edit-song/?id=" + song._id);
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
