import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Crown, ShieldAlert } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import saiImg from '../../assets/sai3.jpeg'

export function MysteryIntro({ onNext, audioEngine }) {
  const [isShaking, setIsShaking] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const intro = birthdayData.intro

  const handleTrigger = () => {
    // Enable audio engine immediately upon first user click
    audioEngine.enableAudio()
    audioEngine.playBoom()

    setIsShaking(true)
    setShowFlash(true)

    // Blast confetti immediately
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#EC4899', '#FBBF24', '#22D3EE'],
    })

    setTimeout(() => {
      setShowFlash(false)
    }, 450)

    setTimeout(() => {
      onNext()
    }, 1100)
  }

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center p-6 py-12 select-none overflow-hidden ${
        isShaking ? 'animate-shake-violent' : ''
      }`}
    >
      {/* White Flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Ambient background glows */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-900/30 blur-[140px] pointer-events-none -top-20 -left-20 animate-pulse-glow" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-pink-900/25 blur-[140px] pointer-events-none -bottom-20 -right-20 animate-pulse-glow" />

      {/* 2-Column Responsive Layout */}
      <div className="max-w-5xl w-full z-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* LEFT SIDE: Stylish Animated Picture of Sai */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center order-2 md:order-1"
        >
          <div className="relative group">
            {/* Animated Radiant Aura Glow behind Image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-700 animate-pulse-glow" />

            {/* Floating Glassmorphism Photo Container */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl p-3 sm:p-4 glass-panel border-2 border-pink-500/40 shadow-2xl glow-pink overflow-hidden max-w-[280px] sm:max-w-[340px]"
            >
              {/* Photo */}
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-inner">
                <img
                  src={saiImg}
                  alt="Sai"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle sheen gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Floating Tag over Image */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-lg">
                    <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Birthday Star • Sai</span>
                  </span>
                  <span className="text-xs">✨🎂</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Text content & Secret Notification Badge */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
          className="space-y-6 text-center md:text-left order-1 md:order-2"
        >
          {/* Top Secret Notification Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-purple-300 uppercase border border-purple-500/30 shadow-lg glow-purple"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>Top Secret Notification 🔐</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="text-4xl sm:text-6xl font-black font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 leading-tight"
          >
            {intro.greeting}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-2xl sm:text-3xl font-bold text-pink-400 tracking-wide text-glow-pink"
          >
            {intro.subGreeting}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-md mx-auto md:mx-0"
          >
            {intro.message}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-lg sm:text-xl font-semibold text-zinc-200 italic"
          >
            {intro.question}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.6, type: 'spring' }}
            className="pt-3"
          >
            <button
              onClick={handleTrigger}
              onMouseEnter={() => audioEngine.playPop()}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 rounded-2xl cursor-pointer overflow-hidden shadow-2xl hover:scale-105 active:scale-95"
            >
              {/* Animated glowing border background */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-2xl animate-pulse" />
              <span className="absolute inset-[2px] bg-zinc-950 rounded-[14px] transition-all group-hover:bg-opacity-80" />

              <span className="relative flex items-center gap-3 z-10 text-glow-pink">
                <span>{intro.buttonText}</span>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
