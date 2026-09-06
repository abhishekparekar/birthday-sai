import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, Sparkles, Heart } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function BirthdayReveal({ onNext, audioEngine }) {
  const { name, celebration } = birthdayData

  useEffect(() => {
    // Play fanfare melody and blast celebration confetti
    audioEngine.playFanfare()

    const count = 200
    const defaults = { origin: { y: 0.7 } }

    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#EC4899', '#7C3AED'] })
    fire(0.2, { spread: 60, colors: ['#FBBF24', '#22D3EE'] })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FFFFFF', '#F43F5E'] })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#FBBF24', '#7C3AED'] })
  }, [audioEngine])

  const nameLetters = Array.from(name)

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Radiant Light Rays Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-amber-500/20 blur-[140px] animate-pulse-glow" />
      </div>

      <div className="relative z-20 max-w-3xl space-y-6">
        {/* Floating Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel text-xs sm:text-sm font-semibold tracking-widest text-amber-300 border border-amber-500/30 text-glow-gold"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{celebration.tagline}</span>
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>

        {/* Happy Birthday Title */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-5xl font-black font-cinzel tracking-widest text-zinc-300"
          >
            HAPPY BIRTHDAY
          </motion.div>

          {/* Large Hero Name Character by Character */}
          <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-3 py-2">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                onClick={() => {
                  audioEngine.playFunnySmile()
                  audioEngine.playPop()
                }}
                onMouseEnter={() => audioEngine.playFunnyBoing()}
                whileHover={{ scale: 1.25, rotate: (index % 2 === 0 ? 8 : -8) }}
                whileTap={{ scale: 0.85 }}
                initial={{ opacity: 0, y: 50, rotate: -15, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.9 + index * 0.12,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="text-5xl sm:text-8xl md:text-9xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 text-glow-gold drop-shadow-2xl cursor-pointer select-none"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="text-base sm:text-xl text-zinc-300 max-w-xl mx-auto font-light leading-relaxed"
        >
          {celebration.subtitle}
        </motion.p>

        {/* Start Journey CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.6, type: 'spring' }}
          className="pt-6"
        >
          <button
            onClick={() => {
              audioEngine.playFunnyClick()
              audioEngine.playMagic()
              onNext()
            }}
            onMouseEnter={() => audioEngine.playFunnyClick()}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-2xl btn-luxury-gold font-black text-white text-lg sm:text-xl shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 text-glow-gold">
              <span>{celebration.cta}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
