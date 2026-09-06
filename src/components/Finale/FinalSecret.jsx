import { motion } from 'framer-motion'
import { ArrowRight, KeyRound } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function FinalSecret({ onNext, audioEngine }) {
  const { finalSecret } = birthdayData

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none bg-black overflow-hidden">
      {/* Deep atmospheric pulsing circle */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-xl z-20 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-pink-300 border border-pink-500/20"
        >
          <KeyRound className="w-3.5 h-3.5 text-pink-400" />
          <span>Chapter 07: The Climax</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-6xl font-black font-cinzel text-white leading-tight"
        >
          {finalSecret.question}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg sm:text-2xl text-zinc-300 font-light max-w-md mx-auto leading-relaxed"
        >
          {finalSecret.suspense}
        </motion.p>

        {/* Big Launch Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.6, type: 'spring' }}
          className="pt-4"
        >
          <button
            onClick={() => {
              audioEngine.playBoom()
              onNext()
            }}
            onMouseEnter={() => audioEngine.playPop()}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 font-extrabold text-white text-lg sm:text-xl shadow-2xl shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden glow-pink"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>{finalSecret.btnText}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
