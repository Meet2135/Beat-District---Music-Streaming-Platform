import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const register = async () => {
    try {
      // Validate input
      if (!user.name || !user.email || !user.password) {
        setError("Please fill in all fields");
        return;
      }

      // Log the request data
      console.log('Sending registration request:', {
        url: "http://localhost:5000/api/users/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user
      });

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Log the response
      console.log('Registration response:', response);

      // Check if the response is OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();

      if (data.success) {
        // If registration is successful, navigate to login
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Unable to connect to server. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen flex items-center justify-center gap-10 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      {/* Left Side - Logo and Animation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block relative w-[500px] h-[500px]"
      >
        {/* Clear Logo Area */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src="/4.png"
            alt="Beat District Logo"
            className="h-[300px]"
          />
        </div>

        {/* Musical Wave Animation - Top */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-20 rounded-full"
              style={{
                left: `${i * 5}%`,
                background: `linear-gradient(to bottom, transparent, ${
                  ["#10B981", "#8B5CF6", "#3B82F6"][i % 3]
                })`,
              }}
              animate={{
                height: [20, 80, 20],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Musical Notes Animation - Left Side */}
        <div className="absolute left-0 top-1/4 h-1/2 w-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: "10%",
                top: `${i * 12}%`,
              }}
              animate={{
                x: [0, 50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            >
              {["🎵", "🎶", "🎼", "🎹"][i % 4]}
            </motion.div>
          ))}
        </div>

        {/* Musical Notes Animation - Right Side */}
        <div className="absolute right-0 top-1/4 h-1/2 w-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                right: "10%",
                top: `${i * 12}%`,
              }}
              animate={{
                x: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            >
              {["🎸", "🎷", "🎺", "🎻"][i % 4]}
            </motion.div>
          ))}
        </div>

        {/* Spectrum Analyzer Bars - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-center gap-1">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-t-full"
              style={{
                background: `linear-gradient(to top, ${
                  ["#10B981", "#8B5CF6", "#3B82F6"][i % 3]
                }, transparent)`,
              }}
              animate={{
                height: [10, Math.random() * 60 + 30, 10],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Background Glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />
        </motion.div>
      </motion.div>

      {/* Right Side - Register Form */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-xl shadow-lg w-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Create Your Account
        </motion.h1>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Name
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Password
          </label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={register}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Sign Up
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Already have an account?{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-green-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </motion.span>
        </motion.p>
      </motion.div>
      <ThemeToggle />
    </motion.div>
  );
}

export default Register;
