import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, Sparkles, Heart, Crown } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import saiImg from '../../assets/sai3.jpeg'

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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 py-12 text-center select-none overflow-hidden">
      {/* Radiant Light Rays Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-amber-500/20 blur-[140px] animate-pulse-glow" />
      </div>

      <div className="relative z-20 max-w-3xl space-y-6 flex flex-col items-center">
        {/* Floating Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full glass-panel text-xs sm:text-sm font-semibold tracking-widest text-amber-300 border border-amber-500/30 text-glow-gold"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{celebration.tagline}</span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>

        {/* 🌟 Radiant Royal Portrait of Birthday Boy Sai */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, type: 'spring' }}
          className="relative my-1"
        >
          {/* Pulsing Aura Rings */}
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full blur-xl opacity-70 animate-pulse-glow" />
          
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-400 to-sky-400 shadow-2xl glow-gold">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border-2 border-white/20">
              <img
                src={saiImg}
                alt="Birthday Star Sai"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating Crown Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/90 border border-amber-400 text-amber-300 text-[10px] font-black flex items-center gap-1 shadow-lg">
              <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>SAI</span>
            </div>
          </div>
        </motion.div>

        {/* Happy Birthday Title */}
        <div className="space-y-1 sm:space-y-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black font-cinzel tracking-widest text-zinc-200"
          >
            HAPPY BIRTHDAY
          </motion.div>

          {/* Large Hero Name Character by Character */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-4 py-1">
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
                  delay: 0.8 + index * 0.12,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="text-6xl sm:text-8xl md:text-9xl font-black font-cinzel-decor text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 text-glow-gold drop-shadow-2xl cursor-pointer select-none"
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
