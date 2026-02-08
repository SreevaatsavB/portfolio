import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Hobbies = () => {
  const { darkMode } = useTheme();
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="py-16 relative overflow-hidden min-h-screen">
      {/* Content begins here */}

      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Clean title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Creative Pursuits & Interests
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-700'} font-medium`}>
            Exploring my personal side beyond the professional realm
          </p>
        </div>

        {/* Modern dropout style layout */}
        <div className="space-y-16">
          {/* Featured interest - Gaming with PlayStation effect */}
          <motion.div 
            className={`relative overflow-hidden rounded-2xl ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-lg shadow-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 overflow-hidden opacity-20 transition-opacity duration-500">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/30 to-indigo-800/30"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute top-20 -left-10 w-48 h-48 bg-indigo-600/20 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 p-10 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110">
                <span className="text-5xl">🎮</span>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  PS5 Gaming Collection
                </motion.h3>
                
                <div className={`space-y-4 mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <p className="leading-relaxed">My passion for PlayStation gaming spans years, with a growing collection of PS5 titles across multiple genres. From immersive RPGs to competitive shooters, I'm always seeking the next gaming adventure.</p>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}">
                    🏆 Trophy Hunter
                  </span>
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}">
                    🎯 FPS Master
                  </span>
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}">
                    🌟 RPG Explorer
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Two-column interests */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Digital Art & Design */}
            <motion.div 
              className={`relative overflow-hidden rounded-xl ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm shadow-lg`}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-600/30 to-purple-800/30"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-xl"></div>
              </div>

              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">🎨</span>
                  <h3 className="text-xl font-bold text-pink-500">Digital Art & Design</h3>
                </div>
                
                <div className={`space-y-2 mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-800'} flex-1`}>
                  <p className="text-sm font-medium">✨ Photoshop exploration and creative image manipulation</p>
                  <p className="text-sm font-medium">🖌️ Digital illustrations and character design concepts</p>
                  <p className="text-sm font-medium">🎭 UI/UX design experiments for personal projects</p>
                </div>
                
                <div className="mt-auto">
                  <div className="inline-flex items-center gap-1 text-pink-500 group cursor-pointer">
                    <span className="text-sm font-semibold">Creating Magic</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Music & Audio */}
            <motion.div 
              className={`relative overflow-hidden rounded-xl ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm shadow-lg`}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/30 to-teal-800/30"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-xl"></div>
              </div>

              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">🎵</span>
                  <h3 className="text-xl font-bold text-green-500">Music & Beats</h3>
                </div>
                
                <div className={`space-y-2 mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-800'} flex-1`}>
                  <p className="text-sm font-medium">🎧 Music production and beat making experiments</p>
                  <p className="text-sm font-medium">🎹 Sound design and electronic music exploration</p>
                  <p className="text-sm font-medium">🎤 Audio mixing and podcast editing for friends</p>
                </div>
                
                <div className="mt-auto">
                  <div className="inline-flex items-center gap-1 text-green-500 group cursor-pointer">
                    <span className="text-sm font-semibold">Vibing 24/7</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Three-column mini interests */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Photography */}
            <motion.div 
              className={`${darkMode ? 'bg-indigo-900/30' : 'bg-white/40'} rounded-xl p-6 backdrop-blur-md shadow-lg transition-all duration-300 border ${darkMode ? 'border-blue-500/20' : 'border-blue-300/30'}`}
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-2xl">📸</span>
                <h3 className="text-lg font-medium text-blue-400">Photography</h3>
              </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} text-sm font-medium`}>
                Landscapes, urban scenes, and night photography adventures
              </div>
            </motion.div>

            {/* Coding */}
            <motion.div 
              className={`${darkMode ? 'bg-indigo-900/30' : 'bg-white/40'} rounded-xl p-6 backdrop-blur-md shadow-lg transition-all duration-300 border ${darkMode ? 'border-blue-500/20' : 'border-blue-300/30'}`}
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-2xl">💻</span>
                <h3 className="text-lg font-medium text-blue-400">Coding Projects</h3>
              </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} text-sm font-medium`}>
                Fun experiments with creative animations and small games
              </div>
            </motion.div>

            {/* Other Interests */}
            <motion.div 
              className={`${darkMode ? 'bg-indigo-900/30' : 'bg-white/40'} rounded-xl p-6 backdrop-blur-md shadow-lg transition-all duration-300 border ${darkMode ? 'border-blue-500/20' : 'border-blue-300/30'}`}
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-2xl">🌟</span>
                <h3 className="text-lg font-medium text-blue-400">Explorations</h3>
              </div>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} text-sm font-medium`}>
                Food adventures, sci-fi novels, and weekend getaways
              </div>
            </motion.div>
          </div>

          {/* Photography */}
          <div className="group transition-all duration-300 hover:-translate-y-2">
              <motion.div 
                className={`${darkMode ? 'bg-indigo-900/30' : 'bg-white/40'} rounded-xl p-6 backdrop-blur-md shadow-lg transition-all duration-300 border ${darkMode ? 'border-blue-500/20' : 'border-blue-300/30'}`}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-4xl">📸</span>
                    <h3 className="text-xl font-bold text-blue-400">
                      Photography Adventures
                    </h3>
                  </div>
                </div>
                <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <p className="text-sm font-medium">🌅 Landscape Shots</p>
                  <p className="text-sm font-medium">🏙️ Urban Photography</p>
                  <p className="text-sm font-medium">🌙 Night Photography</p>
                  <p className="text-sm font-medium">📱 Mobile Photography</p>
                </div>
                <div className="mt-6">
                  <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-md text-sm font-medium">
                    Visual Storytelling
                  </span>
                </div>
              </motion.div>
          </div>

          {/* Coding for Fun */}
          <div className="group transition-all duration-300 hover:-translate-y-2">
              <motion.div 
                className={`${darkMode ? 'bg-indigo-900/30' : 'bg-white/40'} rounded-xl p-6 backdrop-blur-md shadow-lg transition-all duration-300 border ${darkMode ? 'border-blue-500/20' : 'border-blue-300/30'}`}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-4xl">💻</span>
                    <h3 className="text-xl font-bold text-blue-400">
                      Fun Code Projects
                    </h3>
                  </div>
                </div>
                <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <p className="text-sm font-medium">🎲 Random Generators</p>
                  <p className="text-sm font-medium">🎨 Creative Animations</p>
                  <p className="text-sm font-medium">🤖 Silly Bots</p>
                  <p className="text-sm font-medium">🎪 Experimental Apps</p>
                </div>
                <div className="mt-6">
                  <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-md text-sm font-medium">
                    Creative Coding
                  </span>
                </div>
              </motion.div>
          </div>

          {/* Random Interests */}
          <div className="group transition-all duration-300 hover:-translate-y-2">
              <motion.div 
                className={`${darkMode ? 'bg-indigo-900/30' : 'bg-white/40'} rounded-xl p-6 backdrop-blur-md shadow-lg transition-all duration-300 border ${darkMode ? 'border-blue-500/20' : 'border-blue-300/30'}`}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-4xl">✨</span>
                    <h3 className="text-xl font-bold text-blue-400">
                      Other Interests
                    </h3>
                  </div>
                </div>
                <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <p className="text-sm font-medium">🍕 Food Adventures</p>
                  <p className="text-sm font-medium">📚 Sci-Fi Novels</p>
                  <p className="text-sm font-medium">🎬 Movie Marathons</p>
                  <p className="text-sm font-medium">🧩 Puzzle Solving</p>
                </div>
                <div className="mt-6">
                  <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-md text-sm font-medium">
                    Weekend Explorer
                  </span>
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
