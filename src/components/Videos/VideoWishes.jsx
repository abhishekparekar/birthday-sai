import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Video,
  Play,
  X,
  Maximize,
  Sparkles,
  ArrowRight,
  Heart,
  FolderOpen,
} from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import abhi1Video from '../../assets/abhi1.mp4'

export function VideoWishes({ onNext, audioEngine }) {
  const [activeVideo, setActiveVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(abhi1Video)
  const [customFileLoaded, setCustomFileLoaded] = useState(false)
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const { videoWishes } = birthdayData

  const handleOpenVideo = (item) => {
    audioEngine.playPop()
    setActiveVideo(item)
    // Primary video for Laxman and other friends is abhi1.mp4
    setCurrentSrc(abhi1Video)
    setIsPlaying(true)
    setCustomFileLoaded(false)
  }

  const handleCloseModal = () => {
    audioEngine.playPop()
    if (videoRef.current) {
      try {
        videoRef.current.pause()
      } catch (e) {}
    }
    setActiveVideo(null)
    setCustomFileLoaded(false)
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      try {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen()
        }
      } catch (e) {}
    }
  }

  // Allow user to select another local video file if desired
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const blobUrl = URL.createObjectURL(file)
      setCurrentSrc(blobUrl)
      setCustomFileLoaded(true)
      setIsPlaying(true)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {})
        }
      }, 100)
    }
  }

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      try {
        videoRef.current.load()
        const promise = videoRef.current.play()
        if (promise !== undefined) {
          promise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
        }
      } catch (e) {}
    }
  }, [activeVideo, currentSrc])

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none">
      <div className="max-w-4xl w-full z-20 space-y-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-cyan-300 border border-cyan-500/20">
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chapter 04: Birthday Wishes Videos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-pink">
            Special Video Messages 🎥
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Heartfelt recorded wishes from Laxman, Reshma, Shriya, and Riya. Tap any video to watch in full screen!
          </p>
        </motion.div>

        {/* 4 Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {videoWishes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleOpenVideo(item)}
              className="group relative p-4 rounded-3xl glass-panel border border-white/10 hover:border-cyan-400/50 shadow-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Thumbnail with overlay Play button */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src={item.thumbnail}
                  alt={item.sender}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform group-hover:shadow-pink-500/50 glow-pink">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Sender badge pill */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-lg">
                    <img
                      src={item.avatar}
                      alt={item.sender}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>From {item.sender}</span>
                  </div>
                </div>

                {/* Duration tag */}
                <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold bg-black/80 px-2 py-0.5 rounded-md text-zinc-300 border border-white/10">
                  {item.duration}
                </span>
              </div>

              {/* Text info */}
              <div className="pt-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs text-pink-400 font-script text-lg">❤️</span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {item.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <button
            onClick={() => {
              audioEngine.playEmotionalChord()
              onNext()
            }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-purple-500/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>READ THE HEARTFELT LETTER 💌</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Hidden local file picker */}
      <input
        type="file"
        ref={fileInputRef}
        accept="video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Full-Screen Cinema Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl">
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={handleCloseModal} />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, type: 'spring' }}
              className="relative max-w-3xl w-full glass-panel border border-cyan-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl z-10 space-y-4 glow-purple overflow-hidden"
            >
              {/* Header with Sender info & Close */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeVideo.avatar}
                    alt={activeVideo.sender}
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Video from {activeVideo.sender}</span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-xs text-cyan-300">{activeVideo.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Choose other video file"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Choose File</span>
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-full glass-panel text-zinc-400 hover:text-white border border-white/10 hover:border-pink-500/50 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 group">
                <video
                  ref={videoRef}
                  src={currentSrc}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  playsInline
                  controls
                  autoPlay
                  preload="auto"
                  className="w-full h-full object-contain"
                />

                {/* Custom Fullscreen button */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2 z-20 pointer-events-auto">
                  <button
                    onClick={handleFullscreen}
                    title="Full Screen"
                    className="p-2 rounded-xl bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Personal message subtitle banner */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-left">
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs text-pink-300 font-semibold uppercase tracking-wider">
                    Personal Message from {activeVideo.sender}:
                  </p>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    {activeVideo.message}
                  </p>
                  <p className="text-[11px] text-cyan-400 font-mono">
                    ✓ Playing: abhi1.mp4
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
