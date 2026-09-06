import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Heart,
  Crown,
  RotateCcw,
  X,
  Music,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import saiImg from '../../assets/sai3.jpeg'

export function GrandFinale({ onRestart, audioEngine }) {
  const [showLastModal, setShowLastModal] = useState(false)
  const [isPlayingMusic, setIsPlayingMusic] = useState(true)
  const { grandFinale, name } = birthdayData

  useEffect(() => {
    // Fanfare sound effect
    audioEngine.playFanfare()

    // Continuous celebration bursts
    const interval = setInterval(() => {
      confetti({
        particleCount: 60,
        spread: 120,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.4 + 0.3,
        },
        colors: ['#FBBF24', '#EC4899', '#7C3AED', '#22D3EE', '#FFFFFF', '#10B981'],
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [audioEngine])

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 py-16 text-center select-none overflow-hidden">
      {/* Radiant Aura background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-pink-600/25 via-purple-600/25 to-amber-400/25 blur-[160px] animate-pulse-glow" />
      </div>

      <div className="max-w-3xl w-full z-20 space-y-6 sm:space-y-8 flex flex-col items-center">
        {/* Crown Badge */}
        <div>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full glass-panel text-xs sm:text-sm font-bold tracking-widest text-amber-300 border border-amber-400/40 glow-gold"
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
            <span>CELEBRATING OUR HERO</span>
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
          </motion.div>
        </div>

        {/* 🌟 Royal Hero Portrait of Sai */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          className="relative"
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full blur-xl opacity-75 animate-pulse-glow" />
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-pink-500 to-sky-400 shadow-2xl glow-gold">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border-2 border-white/20">
              <img
                src={saiImg}
                alt="Birthday Star Sai"
                className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black/90 border border-amber-400 text-amber-300 text-[11px] font-black tracking-widest flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>SAI 7TH SEPT</span>
            </div>
          </div>
        </motion.div>

        {/* Grand Title & Name */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200"
          >
            {grandFinale.title}
          </motion.h1>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            className="text-6xl sm:text-8xl md:text-9xl font-black font-cinzel-decor text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 text-glow-gold drop-shadow-2xl"
          >
            {grandFinale.name} ❤️
          </motion.div>
        </div>

        {/* Embedded YouTube Birthday Song Auto-player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="p-4 sm:p-5 rounded-3xl glass-panel border border-pink-500/40 shadow-2xl max-w-lg mx-auto space-y-3 glow-pink"
        >
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-pink-300 font-bold text-sm">
              <Music className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Special Birthday Song Playing 🎵</span>
            </div>
            <a
              href="https://youtu.be/F4_La1CbFv0?si=8KVgdo0fFxNd0oze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* YouTube Iframe Player with autoplay */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10">
            {isPlayingMusic ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/F4_La1CbFv0?autoplay=1&loop=1&playlist=F4_La1CbFv0&enablejsapi=1"
                title="Birthday Song"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900/90 text-zinc-400 text-sm">
                Music Paused
              </div>
            )}
          </div>
        </motion.div>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {/* One Last Message CTA */}
          <button
            onClick={() => {
              audioEngine.playFunnyClick()
              audioEngine.playEmotionalChord()
              setShowLastModal(true)
            }}
            onMouseEnter={() => audioEngine.playFunnyClick()}
            className="group px-9 py-4 rounded-2xl btn-luxury-gold font-black text-white text-base sm:text-lg shadow-2xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <Heart className="w-5 h-5 text-white fill-white group-hover:scale-120 transition-transform" />
            <span>{grandFinale.lastMessage.title}</span>
          </button>

          {/* Toggle Music */}
          <button
            onClick={() => {
              audioEngine.playFunnyClick()
              setIsPlayingMusic((prev) => !prev)
            }}
            onMouseEnter={() => audioEngine.playPop()}
            className="px-6 py-4 rounded-2xl glass-panel hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-base hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shadow-lg glow-gold"
          >
            <Music className="w-5 h-5 animate-pulse" />
            <span>{isPlayingMusic ? 'Pause Song ⏸️' : 'Play Song 🎵'}</span>
          </button>

          {/* Replay Entire Experience */}
          <button
            onClick={() => {
              audioEngine.playFunnyClick()
              onRestart()
            }}
            onMouseEnter={() => audioEngine.playPop()}
            className="px-6 py-4 rounded-2xl glass-panel hover:bg-white/15 border border-white/20 text-zinc-200 hover:text-white font-bold text-base transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Surprise</span>
          </button>
        </motion.div>
      </div>

      {/* One Last Message Modal */}
      <AnimatePresence>
        {showLastModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={() => setShowLastModal(false)} />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-md w-full glass-panel border border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center space-y-6 glow-pink"
            >
              <button
                onClick={() => setShowLastModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel text-zinc-400 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-pink-500/20 border-2 border-pink-400 text-pink-300 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 fill-pink-400 animate-pulse" />
              </div>

              <h3 className="text-2xl font-black font-cinzel text-white">
                {grandFinale.lastMessage.title}
              </h3>

              <p className="text-base text-zinc-200 font-light leading-relaxed p-4 rounded-2xl bg-white/5 border border-white/10">
                {grandFinale.lastMessage.body}
              </p>

              <button
                onClick={() => setShowLastModal(false)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm shadow-lg cursor-pointer"
              >
                Close & Celebrate 🎂❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
