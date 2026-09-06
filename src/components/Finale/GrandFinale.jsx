import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { RotateCcw } from 'lucide-react'

export function GrandFinale({ onRestart, audioEngine }) {
  useEffect(() => {
    // Continuous celebration bursts
    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 110,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.4 + 0.3,
        },
        colors: ['#FBBF24', '#EC4899', '#7C3AED', '#22D3EE', '#FFFFFF', '#10B981'],
      })
    }, 2400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 py-8 text-center select-none overflow-hidden">
      {/* Radiant Aura Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-amber-400/20 blur-[150px] animate-pulse-glow" />
      </div>

      <div className="max-w-3xl w-full z-20 space-y-4 sm:space-y-6 flex flex-col items-center">
        {/* Grand Marathi Title & Wishes */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-pink-200 to-amber-300 tracking-wide drop-shadow-md leading-tight"
          >
            परत एकदा वाढदिवसाच्या मनःपूर्वक शुभेच्छा! ❤️
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-sm sm:text-lg text-zinc-100 font-light max-w-lg mx-auto pt-1.5 leading-relaxed"
          >
            तुझे आयुष्य सदैव सुख, समृद्धी, उदंड यश आणि समाधानाने उजळून निघो! 🌸✨
          </motion.p>
        </div>

        {/* Replay Action Button (English) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-2"
        >
          <button
            onClick={onRestart}
            className="px-8 sm:px-11 py-3.5 sm:py-4 rounded-2xl btn-luxury-gold font-black text-white text-sm sm:text-base tracking-wider uppercase shadow-2xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2.5 glow-gold hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>REPLAY CELEBRATION 🔄</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
