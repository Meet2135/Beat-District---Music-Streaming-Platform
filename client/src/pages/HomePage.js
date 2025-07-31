import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function HomePage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <div className={`h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-black' : 'from-gray-100 to-gray-300'} text-${isDarkMode ? 'white' : 'gray-900'} overflow-hidden`}>
      {/* Navigation Bar */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <img src="/4.png" alt="Beat District Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Beat District</h1>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full transition-colors duration-300 text-sm"
        >
          Login / Sign Up
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 h-[calc(100vh-4rem)]">
        <div className="flex flex-col md:flex-row items-center justify-between h-full gap-4">
          {/* Left Side - Text Content */}
          <div className="md:w-1/2 space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold leading-tight"
            >
              Welcome to Beat District
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              "Ride the Beat: Your Sound, Your Vibe, Your Way!"
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Are you ready to dive into a world of limitless music possibilities? 
              Beat District is your passport to a universe of sounds, rhythms, and melodies. 
              Whether you're a passionate music lover, an avid collector, or just looking for 
              your next favorite song, Beat District has you covered.
            </motion.p>

            {/* Music Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`relative p-4 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} rounded-xl border-l-4 border-green-500`}
            >
              <motion.p
                className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                "Music is the divine way to tell beautiful, poetic things to the heart."
              </motion.p>
              <motion.p
                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                - Pablo Casals
              </motion.p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onClick={() => navigate("/login")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300"
            >
              Start Listening Now
            </motion.button>

            {/* Features Section - Moved inside left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-xl`}>
                <div className="text-2xl mb-2">🎵</div>
                <h3 className="text-sm font-semibold mb-1">Unlimited Music</h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Access millions of songs across all genres and eras</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-xl`}>
                <div className="text-2xl mb-2">🎧</div>
                <h3 className="text-sm font-semibold mb-1">High Quality</h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Experience crystal clear audio with premium sound</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-xl`}>
                <div className="text-2xl mb-2">📱</div>
                <h3 className="text-sm font-semibold mb-1">Cross Platform</h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Listen anywhere on any device, anytime</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Advanced Music Visualization */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
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

              {/* Spectrum Analyzer Bars */}
              <div className="absolute w-full h-full flex items-center justify-center gap-0.5">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-green-500 to-purple-500 rounded-t-full"
                    animate={{
                      height: [10, Math.random() * 60 + 30, 10],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                    style={{
                      height: "20px",
                    }}
                  />
                ))}
              </div>

              {/* Floating Particles System */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  animate={{
                    x: [0, Math.random() * 120 - 60],
                    y: [0, Math.random() * 120 - 60],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    background: `radial-gradient(circle, ${
                      ["#10B981", "#8B5CF6", "#3B82F6"][i % 3]
                    } 0%, transparent 70%)`,
                  }}
                />
              ))}

              {/* Animated Music Notes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 60 - 30, 0],
                    rotate: [0, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${20 + i * 7}%`,
                    top: "30%",
                  }}
                >
                  {["🎵", "🎶", "🎼", "🎹", "🎸", "🎷"][i % 6]}
                </motion.div>
              ))}

              {/* Central Core */}
              <motion.div
                className="absolute w-20 h-20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 via-purple-500 to-blue-500" />
                <motion.div
                  className="absolute inset-1 rounded-full bg-black/20"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Outer Rings */}
              {[1.5, 1.8, 2.1].map((scale, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full border"
                  style={{
                    width: `${scale * 100}%`,
                    height: `${scale * 100}%`,
                    borderColor: `rgba(${
                      index === 0 ? "16, 185, 129" : index === 1 ? "139, 92, 246" : "59, 130, 246"
                    }, 0.3)`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 