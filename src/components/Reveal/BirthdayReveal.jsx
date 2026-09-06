import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, Sparkles, Heart, Crown, Star } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import sai4Img from '../../assets/sai4.jpeg'
import sai5Img from '../../assets/sai5.jpeg'

export function BirthdayReveal({ onNext, audioEngine }) {
  const { name, celebration } = birthdayData

  useEffect(() => {
    // Confetti celebration on mount
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
  }, [])

  const nameLetters = Array.from(name)

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 py-12 select-none overflow-hidden">
      {/* Radiant Light Rays Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-amber-500/20 blur-[140px] animate-pulse-glow" />
      </div>

      <div className="relative z-20 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* 🌟 LEFT SIDE: sai4.jpeg Portrait Photo */}
        <motion.div
          initial={{ opacity: 0, x: -35, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-3 flex flex-col items-center justify-center order-2 lg:order-1"
        >
          <div className="relative group w-full max-w-[260px] sm:max-w-[290px] lg:max-w-[280px]">
            {/* Glowing Aura Ring */}
            <div className="absolute -inset-3.5 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

            {/* Photo Container */}
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [-0.6, 0.6, -0.6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl p-3 sm:p-3.5 glass-panel border-2 border-amber-400/50 shadow-2xl glow-gold overflow-hidden w-full"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-amber-400/40 shadow-inner">
                <img
                  src={sai4Img}
                  alt="Sai Portrait 1"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/50 flex items-center gap-1.5 shadow-md">
                    <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>Birthday Star</span>
                  </span>
                  <span className="text-sm">👑</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 🌟 MIDDLE SIDE: Marathi Birthday Wishes & Character Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-6 space-y-5 text-center flex flex-col items-center justify-center order-1 lg:order-2 px-2"
        >
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full glass-panel text-xs sm:text-sm font-semibold tracking-widest text-amber-300 border border-amber-500/30 text-glow-gold shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>७ सप्टेंबर • वाढदिवसाचा महाउत्सव ✨</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          </motion.div>

          {/* Marathi Birthday Wishes Heading */}
          <div className="space-y-1 sm:space-y-2">
            <motion.h2
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-pink-200 to-amber-300 tracking-wide drop-shadow-md"
            >
              वाढदिवसाच्या हार्दिक शुभेच्छा!
            </motion.h2>

            {/* Large Hero Name Character by Character */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-3 py-1">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.25, rotate: (index % 2 === 0 ? 8 : -8) }}
                  whileTap={{ scale: 0.85 }}
                  initial={{ opacity: 0, y: 40, rotate: -12, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + index * 0.12,
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

          {/* Marathi Subtitle Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="space-y-2 max-w-lg mx-auto"
          >
            <p className="text-base sm:text-lg text-pink-300 font-medium text-glow-pink">
              आजचा हा दिवस संपूर्ण विश्व आनंदाने साजरा करत आहे! 🚀
            </p>
            <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
              तुझ्या आयुष्यातील प्रत्येक दिवस नव्या यशाची, सुखाची आणि समाधानाची नवी पहाट घेऊन येवो! 🌸✨
            </p>
          </motion.div>

          {/* Start Journey CTA Button - TEXT UNCHANGED */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5, type: 'spring' }}
            className="pt-3"
          >
            <button
              onClick={onNext}
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-2xl btn-luxury-gold font-black text-white text-base sm:text-lg shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
            >
              <span className="relative z-10 flex items-center gap-3 text-glow-gold">
                <span>{celebration.cta}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* 🌟 RIGHT SIDE: sai5.jpeg Portrait Photo */}
        <motion.div
          initial={{ opacity: 0, x: 35, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-3 flex flex-col items-center justify-center order-3 lg:order-3"
        >
          <div className="relative group w-full max-w-[260px] sm:max-w-[290px] lg:max-w-[280px]">
            {/* Glowing Aura Ring */}
            <div className="absolute -inset-3.5 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

            {/* Photo Container */}
            <motion.div
              animate={{ y: [5, -5, 5], rotate: [0.6, -0.6, 0.6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl p-3 sm:p-3.5 glass-panel border-2 border-pink-400/50 shadow-2xl glow-pink overflow-hidden w-full"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-pink-400/40 shadow-inner">
                <img
                  src={sai5Img}
                  alt="Sai Portrait 2"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-[11px] font-bold text-pink-300 border border-pink-400/50 flex items-center gap-1.5 shadow-md">
                    <Star className="w-3 h-3 text-pink-400 fill-pink-400" />
                    <span>Sai Forever</span>
                  </span>
                  <span className="text-sm">✨</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
