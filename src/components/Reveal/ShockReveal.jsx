import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { birthdayData } from '../../data/birthdayData'

export function ShockReveal({ onNext, audioEngine }) {
  const [phase, setPhase] = useState(0)
  const shock = birthdayData.shock

  useEffect(() => {
    // Phase progression
    const t1 = setTimeout(() => {
      setPhase(1)
      audioEngine.playBoom()
    }, 600)

    const t2 = setTimeout(() => {
      setPhase(2)
      audioEngine.playPop()
    }, 2000)

    const t3 = setTimeout(() => {
      setPhase(3)
      audioEngine.playBoom()
    }, 3800)

    const t4 = setTimeout(() => {
      onNext()
    }, 5800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [audioEngine, onNext])

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden select-none">
      {/* Dynamic Strobe background line */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/40 via-black to-black" />

      <div className="max-w-2xl z-20 space-y-8">
        {phase >= 1 && (
          <motion.h1
            initial={{ scale: 0.2, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, type: 'spring', damping: 12 }}
            className="text-6xl sm:text-8xl font-black font-cinzel text-glow-gold text-amber-400 tracking-wider"
          >
            {shock.firstWord}
          </motion.h1>
        )}

        {phase >= 2 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-wide leading-snug"
          >
            {shock.subText}
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div
            initial={{ scale: 2.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-4xl sm:text-7xl font-black font-cinzel tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-glow-pink">
              {shock.punchline}
            </h2>
            <p className="text-zinc-400 text-lg font-medium tracking-wider">
              {shock.subtitle}
            </p>
          </motion.div>
        )}
      </div>

      {/* Skip button for user control */}
      <button
        onClick={onNext}
        className="absolute bottom-16 px-4 py-1.5 rounded-full text-xs text-zinc-600 hover:text-zinc-400 transition-colors border border-white/5 hover:border-white/10"
      >
        Skip intro →
      </button>
    </div>
  )
}
