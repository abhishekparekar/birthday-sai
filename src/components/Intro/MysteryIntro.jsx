import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Crown, ArrowRight, Heart } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import saiImg from '../../assets/sai3.jpeg'

export function MysteryIntro({ onNext, audioEngine }) {
  const intro = birthdayData.intro

  const handleContinue = () => {
    if (audioEngine) {
      audioEngine.enableAudio()
      audioEngine.playFunnyClick()
      audioEngine.playMagic()
    }

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#FBBF24', '#EC4899', '#38BDF8', '#C084FC', '#FFFFFF'],
    })

    onNext()
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 py-12 select-none overflow-hidden">
      {/* Ambient Celestial Nebula Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-700/25 blur-[150px] pointer-events-none -top-24 -left-24 animate-pulse-glow" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[150px] pointer-events-none -bottom-24 -right-24 animate-pulse-glow" />

      {/* 2-Column Responsive Layout */}
      <div className="max-w-5xl w-full z-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* LEFT SIDE: Stylish Animated Picture of Sai */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center order-1 md:order-1"
        >
          <div className="relative group">
            {/* Animated Radiant Aura Glow behind Image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

            {/* Floating Glassmorphism Photo Container */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-0.6, 0.6, -0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl p-3.5 sm:p-4 glass-panel border-2 border-amber-400/50 shadow-2xl glow-gold overflow-hidden max-w-[280px] sm:max-w-[340px]"
            >
              {/* Photo */}
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-zinc-950 border border-amber-400/30 shadow-inner">
                <img
                  src={saiImg}
                  alt="Sai"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Rich Gradient Sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Tag over Image */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/50 flex items-center gap-1.5 shadow-lg">
                    <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Birthday Star • Sai</span>
                  </span>
                  <span className="text-sm">👑✨</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Text content & Clean Continue Button */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
          className="space-y-6 text-center md:text-left order-2 md:order-2"
        >
          {/* Chapter Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Chapter 01: The Cosmic Invitation</span>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="text-4xl sm:text-6xl font-black font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 leading-tight drop-shadow-md"
          >
            {intro.greeting}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl sm:text-3xl font-bold text-pink-400 tracking-wide text-glow-pink"
          >
            {intro.subGreeting}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base sm:text-lg text-zinc-200 font-normal leading-relaxed max-w-md mx-auto md:mx-0"
          >
            {intro.message}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-lg sm:text-xl font-semibold text-amber-200/90 italic"
          >
            {intro.question}
          </motion.p>

          {/* 🌟 SIMPLE, PROPER & LUXURY CONTINUE BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
            className="pt-2 flex justify-center md:justify-start"
          >
            <button
              onClick={handleContinue}
              onMouseEnter={() => audioEngine && audioEngine.playPop()}
              className="group relative inline-flex items-center gap-3.5 px-9 py-4 rounded-2xl btn-luxury-gold font-black text-white text-base sm:text-lg shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
            >
              <span className="relative z-10 flex items-center gap-3 text-glow-gold">
                <span>CONTINUE TO CELEBRATION</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
