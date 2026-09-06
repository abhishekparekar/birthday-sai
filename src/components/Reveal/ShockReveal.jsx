import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Sparkles } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function ShockReveal({ onNext, audioEngine }) {
  const [phase, setPhase] = useState(0)
  const shock = birthdayData.shock

  useEffect(() => {
    // Phase progression
    const t1 = setTimeout(() => {
      setPhase(1)
      audioEngine.playBoom()
    }, 500)

    const t2 = setTimeout(() => {
      setPhase(2)
      audioEngine.playFunnyBoing()
    }, 1800)

    const t3 = setTimeout(() => {
      setPhase(3)
      audioEngine.playGlitchShock()
      audioEngine.playBoom()
    }, 3500)

    const t4 = setTimeout(() => {
      onNext()
    }, 5600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [audioEngine, onNext])

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center overflow-hidden select-none">
      {/* Luxury Nebula Backdrop */}
      <div className="absolute inset-0 bg-radial from-purple-900/30 via-[#0d061a] to-[#06020c]" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-pink-600/15 blur-[160px] pointer-events-none top-1/4 left-1/2 -translate-x-1/2 animate-pulse-glow" />

      <div className="max-w-3xl z-20 space-y-8 px-4">
        {phase >= 1 && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, type: 'spring', damping: 12 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-400/40">
              <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>CONFIDENTIAL ALERT</span>
            </div>
            <h1 className="text-6xl sm:text-9xl font-black font-cinzel text-glow-gold text-amber-300 tracking-widest drop-shadow-2xl">
              {shock.firstWord}
            </h1>
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-amber-100 tracking-wide leading-snug drop-shadow"
          >
            {shock.subText}
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div
            initial={{ scale: 1.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-4xl sm:text-7xl font-black font-cinzel tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 text-glow-pink">
              {shock.punchline}
            </h2>
            <p className="text-amber-200/90 text-lg sm:text-xl font-bold tracking-wider">
              {shock.subtitle}
            </p>
          </motion.div>
        )}
      </div>

      {/* Skip button with funny sound */}
      <button
        onClick={() => {
          audioEngine.playFunnyClick()
          onNext()
        }}
        onMouseEnter={() => audioEngine.playPop()}
        className="absolute bottom-12 px-5 py-2.5 rounded-full text-xs font-bold text-amber-300/80 hover:text-white transition-all glass-panel border border-amber-400/30 hover:border-amber-400 shadow-lg cursor-pointer"
      >
        Skip to Reveal ➔
      </button>
    </div>
  )
}
