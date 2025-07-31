import React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import CreateEditPlaylist from "./pages/CreateEditPlaylist";
import AdminHome from "./pages/Admin/AdminHome";
import AddEditSong from "./pages/Admin/AddEditSong";
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {loading && <Spinner />}
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/home" /> : <HomePage />} />
            <Route
              path="/login"
              element={token ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/home" /> : <Register />}
            />
            <Route
              path="/home"
              element={token ? <ProtectedRoute><Home /></ProtectedRoute> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={token ? <ProtectedRoute><Admin /></ProtectedRoute> : <Navigate to="/login" />}
            />
            <Route
              path="/create-edit-playlist"
              element={token ? <ProtectedRoute><CreateEditPlaylist /></ProtectedRoute> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/add-edit-song"
              element={token ? <ProtectedRoute><AddEditSong /></ProtectedRoute> : <Navigate to="/login" />}
            />
          </Routes>
        </BrowserRouter>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
