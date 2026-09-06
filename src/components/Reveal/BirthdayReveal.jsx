import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, Crown } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import sai3Img from '../../assets/sai3.jpeg'

export function BirthdayReveal({ onNext, audioEngine }) {
  const { name } = birthdayData

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
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 py-10 select-none overflow-hidden">
      {/* Radiant Light Rays Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-amber-500/20 blur-[140px] animate-pulse-glow" />
      </div>

      <div className="relative z-20 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* 🌟 LEFT SIDE: Single sai3.jpeg Photo */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-1"
        >
          <div className="relative group w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
            {/* Glowing Aura Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

            {/* Borderless Photo Container */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl overflow-hidden shadow-2xl w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-h-[72vh] sm:max-h-[78vh] lg:max-h-[82vh]"
            >
              <img
                src={sai3Img}
                alt="Sai"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* 🌟 RIGHT SIDE: Marathi Birthday Wishes & Character Reveal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-7 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start justify-center order-2 lg:order-2"
        >
          {/* Marathi Birthday Wishes Heading */}
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-pink-200 to-amber-300 tracking-wide drop-shadow-md leading-tight"
            >
              वाढदिवसाच्या हार्दिक शुभेच्छा!
            </motion.h2>

            {/* Large Hero Name Character by Character */}
            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 sm:gap-3 py-1">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.25, rotate: index % 2 === 0 ? 8 : -8 }}
                  whileTap={{ scale: 0.85 }}
                  initial={{ opacity: 0, y: 35, rotate: -10, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.12,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="text-6xl sm:text-8xl lg:text-9xl font-black font-cinzel-decor text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 text-glow-gold drop-shadow-2xl cursor-pointer select-none"
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
            transition={{ duration: 0.8, delay: 0.9 }}
            className="space-y-2.5 max-w-xl"
          >
            <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
              तुझ्या आयुष्यातील प्रत्येक दिवस नव्या यशाची, सुखाची आणि समाधानाची नवी पहाट घेऊन येवो! 🌸✨
            </p>
          </motion.div>

          {/* Start Journey CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, type: 'spring' }}
            className="pt-3"
          >
            <button
              onClick={onNext}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-2xl btn-luxury-gold font-black text-white text-sm sm:text-base md:text-lg shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
            >
              <span className="relative z-10 flex items-center gap-2.5 text-glow-gold">
                <span>Happy Birthday See Msg</span>
                <span className="text-base sm:text-lg">📜✨</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
